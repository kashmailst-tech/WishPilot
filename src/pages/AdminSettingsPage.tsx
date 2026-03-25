import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, CreditCard, DollarSign, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function AdminSettingsPage() {
  const { token } = useAuth();
  const [settings, setSettings] = useState({
    stripe_secret: '',
    paypal_client: '',
    paypal_secret: '',
    razorpay_key: '',
    razorpay_secret: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Failed to fetch admin settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(settings)
      });
      
      if (res.ok) {
        setMessage('Settings saved successfully. Payments will now be routed to your accounts.');
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-water font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
              <ArrowLeft className="w-6 h-6 text-teal-900" />
            </Link>
            <h1 className="text-3xl font-bold text-teal-900 tracking-tight">Payment Gateways (Admin)</h1>
          </div>
          <Logo showText={true} />
        </div>

        <div className="glass-card rounded-3xl overflow-hidden p-8">
          <p className="text-teal-700/80 mb-8">
            Configure your payment gateways here. When users subscribe, funds will be routed directly to these connected accounts.
          </p>

          {message && (
            <div className={`p-4 rounded-xl mb-6 ${message.includes('success') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
              {message}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-teal-700/60">Loading settings...</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              {/* Stripe */}
              <div className="bg-white/50 p-6 rounded-2xl border border-teal-900/10">
                <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-500" />
                  Stripe Configuration
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-900 mb-1">Stripe Secret Key</label>
                    <input
                      type="password"
                      name="stripe_secret"
                      value={settings.stripe_secret || ''}
                      onChange={handleChange}
                      placeholder="sk_test_..."
                      className="block w-full rounded-xl border border-teal-900/20 px-4 py-3 bg-white text-teal-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* PayPal */}
              <div className="bg-white/50 p-6 rounded-2xl border border-teal-900/10">
                <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  PayPal Configuration
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-900 mb-1">PayPal Client ID</label>
                    <input
                      type="text"
                      name="paypal_client"
                      value={settings.paypal_client || ''}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-teal-900/20 px-4 py-3 bg-white text-teal-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-900 mb-1">PayPal Secret</label>
                    <input
                      type="password"
                      name="paypal_secret"
                      value={settings.paypal_secret || ''}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-teal-900/20 px-4 py-3 bg-white text-teal-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Razorpay */}
              <div className="bg-white/50 p-6 rounded-2xl border border-teal-900/10">
                <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Razorpay Configuration (India / UPI)
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-900 mb-1">Razorpay Key ID</label>
                    <input
                      type="text"
                      name="razorpay_key"
                      value={settings.razorpay_key || ''}
                      onChange={handleChange}
                      placeholder="rzp_test_..."
                      className="block w-full rounded-xl border border-teal-900/20 px-4 py-3 bg-white text-teal-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-900 mb-1">Razorpay Key Secret</label>
                    <input
                      type="password"
                      name="razorpay_secret"
                      value={settings.razorpay_secret || ''}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-teal-900/20 px-4 py-3 bg-white text-teal-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-teal-900 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-800 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {saving ? 'Saving...' : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Payment Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
