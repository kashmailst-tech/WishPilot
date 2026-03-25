import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GoogleGenAI } from '@google/genai';
import db from './server/db';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import twilio from 'twilio';
import cron from 'node-cron';

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
app.use(express.json());

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Initialize Stripe
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' as any });
}

// Initialize Twilio
let twilioClient: twilio.Twilio | null = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// Auth Middleware
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// API Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, hashedPassword);
    const token = jwt.sign({ id: info.lastInsertRowid, email }, JWT_SECRET);
    res.json({ token, user: { id: info.lastInsertRowid, name, email, plan: 'free', credits: 3 } });
  } catch (err: any) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, credits: user.credits, payment_gateway: user.payment_gateway, subscription_status: user.subscription_status } });
});

app.get('/api/auth/me', authenticate, (req: any, res) => {
  const user = db.prepare('SELECT id, name, email, plan, credits, google_access_token, payment_gateway, subscription_status FROM users WHERE id = ?').get(req.user.id) as any;
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: { ...user, hasGoogleContacts: !!user.google_access_token } });
});

// Google Contacts OAuth
app.get('/api/auth/google/url', authenticate, (req: any, res) => {
  const redirectUri = `${req.headers.origin}/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || 'mock_client_id',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state: req.user.id.toString(),
  });
  
  res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
});

app.post('/api/auth/google/callback', authenticate, async (req: any, res) => {
  const { code, redirectUri } = req.body;
  
  // If no real client ID, mock the connection
  if (!process.env.GOOGLE_CLIENT_ID) {
    const stmt = db.prepare('UPDATE users SET google_access_token = ?, google_refresh_token = ? WHERE id = ?');
    stmt.run('mock_access_token', 'mock_refresh_token', req.user.id);
    return res.json({ success: true });
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error_description || data.error);
    
    const stmt = db.prepare('UPDATE users SET google_access_token = ?, google_refresh_token = ? WHERE id = ?');
    stmt.run(data.access_token, data.refresh_token, req.user.id);
    
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch Contacts
app.get('/api/contacts', authenticate, async (req: any, res) => {
  const user = db.prepare('SELECT google_access_token FROM users WHERE id = ?').get(req.user.id) as any;
  if (!user || !user.google_access_token) {
    return res.status(400).json({ error: 'Not connected to Google' });
  }
  
  if (user.google_access_token === 'mock_access_token') {
    return res.json({
      contacts: [
        { id: 'contact/1', name: 'Alice Smith', phone: '+1234567890', photoUrl: 'https://i.pravatar.cc/150?u=1' },
        { id: 'contact/2', name: 'Bob Johnson', phone: '+1987654321', photoUrl: 'https://i.pravatar.cc/150?u=2' },
        { id: 'contact/3', name: 'Charlie Brown', phone: '+1555666777', photoUrl: 'https://i.pravatar.cc/150?u=3' }
      ]
    });
  }

  try {
    const response = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers,photos', {
      headers: { Authorization: `Bearer ${user.google_access_token}` }
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    const contacts = (data.connections || []).map((conn: any) => ({
      id: conn.resourceName,
      name: conn.names?.[0]?.displayName || 'Unknown',
      phone: conn.phoneNumbers?.[0]?.value || '',
      photoUrl: conn.photos?.[0]?.url || ''
    })).filter((c: any) => c.phone);
    
    res.json({ contacts });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Events API
app.get('/api/events', authenticate, (req: any, res) => {
  const events = db.prepare('SELECT * FROM events WHERE user_id = ?').all(req.user.id);
  res.json({ events });
});

app.post('/api/events', authenticate, (req: any, res) => {
  const { name, relationship, phone, event_type, event_date, preferred_time, tone, memory_notes, google_contact_id } = req.body;
  const stmt = db.prepare(`
    INSERT INTO events (user_id, name, relationship, phone, event_type, event_date, preferred_time, tone, memory_notes, google_contact_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(req.user.id, name, relationship, phone, event_type, event_date, preferred_time, tone, memory_notes, google_contact_id || null);
  res.json({ id: info.lastInsertRowid });
});

app.delete('/api/events/:id', authenticate, (req: any, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM events WHERE id = ? AND user_id = ?');
    const info = stmt.run(id, req.user.id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Event not found or unauthorized' });
    }
    // Also delete associated generated wishes
    const deleteWishesStmt = db.prepare('DELETE FROM generated_wishes WHERE event_id = ? AND user_id = ?');
    deleteWishesStmt.run(id, req.user.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Generate Wish (Simulated)
app.post('/api/generate-wish', authenticate, async (req: any, res) => {
  const { eventId } = req.body;
  const event = db.prepare('SELECT * FROM events WHERE id = ? AND user_id = ?').get(eventId, req.user.id) as any;
  if (!event) return res.status(404).json({ error: 'Event not found' });

  if (!ai) {
    return res.status(500).json({ error: 'Gemini API not configured' });
  }

  try {
    // Generate Text
    const prompt = `Write a heartfelt ${event.event_type} wish for my ${event.relationship} named ${event.name}. Tone: ${event.tone}. Keep it under 120 words. Make it deeply personal and warm. ${event.memory_notes ? `Include this memory: ${event.memory_notes}` : ''}`;
    
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    const message = textResponse.text;

    // Generate Image
    const imagePrompt = `A beautiful, modern, elegant ${event.event_type} greeting card background for ${event.name}. Style: ${event.tone}. High quality, social media ready, no text.`;
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: imagePrompt }] }
    });

    let imageUrl = '';
    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    // Save to DB
    const scheduledFor = `${event.event_date}T${event.preferred_time}:00`;
    const stmt = db.prepare(`
      INSERT INTO generated_wishes (event_id, user_id, message, image_url, scheduled_for, status)
      VALUES (?, ?, ?, ?, ?, 'scheduled')
    `);
    const info = stmt.run(event.id, req.user.id, message, imageUrl, scheduledFor);

    res.json({ wish: { id: info.lastInsertRowid, message, imageUrl, scheduledFor, status: 'scheduled' } });
  } catch (err: any) {
    console.error('Generation error:', err);
    res.status(500).json({ error: 'Failed to generate wish' });
  }
});

app.get('/api/wishes', authenticate, (req: any, res) => {
  const wishes = db.prepare(`
    SELECT w.*, e.name as event_name, e.event_type 
    FROM generated_wishes w
    JOIN events e ON w.event_id = e.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).all(req.user.id);
  res.json({ wishes });
});

app.post('/api/wishes/:id/send', authenticate, async (req: any, res) => {
  const { id } = req.params;
  
  try {
    const wish = db.prepare(`
      SELECT w.*, e.phone, e.name as event_name 
      FROM generated_wishes w
      JOIN events e ON w.event_id = e.id
      WHERE w.id = ? AND w.user_id = ?
    `).get(id, req.user.id) as any;

    if (!wish) {
      return res.status(404).json({ error: 'Wish not found' });
    }

    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      await twilioClient.messages.create({
        body: wish.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: wish.phone
      });
    } else {
      console.log(`[Simulated SMS] To: ${wish.phone} - ${wish.message}`);
    }
    
    db.prepare('UPDATE generated_wishes SET status = ? WHERE id = ?').run('delivered', wish.id);
    db.prepare('INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)').run(
      wish.user_id, 
      'Wish Delivered', 
      `Your wish for ${wish.event_name} has been delivered successfully.`, 
      'success'
    );
    
    res.json({ success: true });
  } catch (err: any) {
    console.error(`Failed to send wish ${id}:`, err);
    db.prepare('UPDATE generated_wishes SET status = ? WHERE id = ?').run('failed', id);
    res.status(500).json({ error: 'Failed to send wish' });
  }
});

// Admin Settings
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.email !== 'kashmail.st@gmail.com') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

app.get('/api/admin/settings', authenticate, isAdmin, (req: any, res) => {
  const settings = db.prepare('SELECT * FROM admin_settings').all() as any[];
  const settingsMap = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
  res.json(settingsMap);
});

app.post('/api/admin/settings', authenticate, isAdmin, (req: any, res) => {
  const { stripe_secret, paypal_client, paypal_secret, razorpay_key, razorpay_secret } = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO admin_settings (key, value) VALUES (?, ?)');
  
  if (stripe_secret !== undefined) stmt.run('stripe_secret', stripe_secret);
  if (paypal_client !== undefined) stmt.run('paypal_client', paypal_client);
  if (paypal_secret !== undefined) stmt.run('paypal_secret', paypal_secret);
  if (razorpay_key !== undefined) stmt.run('razorpay_key', razorpay_key);
  if (razorpay_secret !== undefined) stmt.run('razorpay_secret', razorpay_secret);
  
  res.json({ success: true });
});

// Subscription Management
app.post('/api/subscription/cancel', authenticate, (req: any, res) => {
  db.prepare('UPDATE users SET plan = ?, subscription_status = ? WHERE id = ?').run('free', 'cancelled', req.user.id);
  res.json({ success: true, plan: 'free' });
});

// Razorpay Checkout
import Razorpay from 'razorpay';
app.post('/api/checkout/razorpay', authenticate, async (req: any, res) => {
  const { planId, interval } = req.body;
  
  const keySetting = db.prepare('SELECT value FROM admin_settings WHERE key = ?').get('razorpay_key') as any;
  const secretSetting = db.prepare('SELECT value FROM admin_settings WHERE key = ?').get('razorpay_secret') as any;
  
  const key = keySetting?.value || process.env.RAZORPAY_KEY_ID;
  const secret = secretSetting?.value || process.env.RAZORPAY_KEY_SECRET;

  if (!key || !secret) {
    // Mock checkout for preview environment
    return res.json({ 
      id: 'mock_rzp_order_id', 
      key: 'mock_key',
      amount: 19900
    });
  }

  try {
    const rzp = new Razorpay({ key_id: key, key_secret: secret });
    let amount = 199; // starter monthly
    if (planId === 'pro') amount = interval === 'yearly' ? 3990 : 399;
    else if (planId === 'premium') amount = interval === 'yearly' ? 7990 : 799;
    else if (planId === 'starter' && interval === 'yearly') amount = 1990;

    const order = await rzp.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`
    });
    res.json({ id: order.id, key, amount: amount * 100 });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PayPal Checkout
app.post('/api/checkout/paypal', authenticate, async (req: any, res) => {
  const { planId, interval } = req.body;
  
  const clientSetting = db.prepare('SELECT value FROM admin_settings WHERE key = ?').get('paypal_client') as any;
  const secretSetting = db.prepare('SELECT value FROM admin_settings WHERE key = ?').get('paypal_secret') as any;
  
  const clientId = clientSetting?.value || process.env.PAYPAL_CLIENT_ID;
  const secret = secretSetting?.value || process.env.PAYPAL_SECRET;

  if (!clientId || !secret) {
    // Mock checkout for preview environment
    return res.json({ id: 'mock_paypal_order_id' });
  }

  let amount = '1.99'; // starter monthly
  if (planId === 'pro') amount = interval === 'yearly' ? '39.90' : '3.99';
  else if (planId === 'premium') amount = interval === 'yearly' ? '79.90' : '7.99';
  else if (planId === 'starter' && interval === 'yearly') amount = '19.90';

  try {
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const { access_token } = await tokenRes.json();

    const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'USD', value: amount } }]
      })
    });
    const order = await orderRes.json();
    res.json({ id: order.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Stripe Checkout
app.post('/api/create-checkout-session', authenticate, async (req: any, res) => {
  const { priceId } = req.body;
  
  if (!stripe) {
    // Mock checkout for preview environment
    return res.json({ 
      id: 'mock_session_id', 
      url: `${req.headers.origin}/dashboard?session_id=mock_session_id&success=true` 
    });
  }
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.origin}/pricing`,
      client_reference_id: req.user.id.toString(),
    });

    res.json({ id: session.id, url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/verify-checkout', authenticate, async (req: any, res) => {
  const { sessionId, gateway, planId } = req.body;
  
  if (!sessionId) return res.status(400).json({ error: 'Session ID required' });
  
  try {
    let plan = planId || 'pro'; // Default mock plan
    let status = 'active';
    
    if (gateway === 'stripe' && stripe && sessionId !== 'mock_session_id') {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return res.status(400).json({ error: 'Payment not completed' });
      }
    } else if (gateway === 'razorpay' && sessionId !== 'mock_rzp_order_id') {
      // In a real app, verify razorpay signature here
      // For now, assume success if it reaches here with a real ID
    } else if (gateway === 'paypal' && sessionId !== 'mock_paypal_order_id') {
      // In a real app, verify paypal order capture here
    }
    
    db.prepare('UPDATE users SET plan = ?, subscription_status = ?, payment_gateway = ?, subscription_id = ? WHERE id = ?').run(plan, status, gateway || 'stripe', sessionId, req.user.id);
    
    res.json({ success: true, plan });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Cron job to send messages
cron.schedule('* * * * *', async () => {
  const now = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  
  const wishes = db.prepare(`
    SELECT w.*, e.phone, e.name as event_name 
    FROM generated_wishes w
    JOIN events e ON w.event_id = e.id
    WHERE w.status = 'scheduled' AND w.scheduled_for <= ?
  `).all(`${now}:00`);

  for (const wish of wishes as any[]) {
    try {
      if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
        await twilioClient.messages.create({
          body: wish.message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: wish.phone
        });
      } else {
        console.log(`[Simulated SMS] To: ${wish.phone} - ${wish.message}`);
      }
      
      db.prepare('UPDATE generated_wishes SET status = ? WHERE id = ?').run('delivered', wish.id);
      db.prepare('INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)').run(
        wish.user_id, 
        'Wish Delivered', 
        `Your wish for ${wish.event_name} has been delivered successfully.`, 
        'success'
      );
    } catch (err) {
      console.error(`Failed to send wish ${wish.id}:`, err);
      db.prepare('UPDATE generated_wishes SET status = ? WHERE id = ?').run('failed', wish.id);
      db.prepare('INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)').run(
        wish.user_id, 
        'Delivery Failed', 
        `Failed to deliver your wish for ${wish.event_name}.`, 
        'alert'
      );
    }
  }
});

app.get('/api/notifications', authenticate, (req: any, res) => {
  const notifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(req.user.id);
  res.json({ notifications });
});

app.post('/api/notifications/read', authenticate, (req: any, res) => {
  db.prepare('UPDATE notifications SET read = 1 WHERE user_id = ?').run(req.user.id);
  res.json({ success: true });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
