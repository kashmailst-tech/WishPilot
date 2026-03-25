import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Image as ImageIcon, Send, ArrowRight, Play, 
  MessageSquare, Users, Clock, Globe, BarChart, Shield, Lock, CheckCircle, X,
  Bell, Settings, Sparkles, Compass, ChevronDown, Mail
} from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function LandingPage() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    }, 2000);
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitIntent]);

  const countWishes = useMotionValue(0);
  const countUsers = useMotionValue(0);
  const countRate = useMotionValue(0);

  const roundedWishes = useTransform(countWishes, Math.round);
  const roundedUsers = useTransform(countUsers, Math.round);
  const roundedRate = useTransform(countRate, (latest) => latest.toFixed(1));

  useEffect(() => {
    const animation1 = animate(countWishes, 1000, { duration: 2, delay: 0.5 });
    const animation2 = animate(countUsers, 50, { duration: 2, delay: 0.5 });
    const animation3 = animate(countRate, 99.9, { duration: 2, delay: 0.5 });
    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-water text-teal-900 font-sans overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aqua-100/50 blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-lavender-100/50 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo showText={true} />
          <div className="hidden md:flex items-center gap-8 font-medium text-teal-800">
            <a href="#problem" className="hover:text-teal-600 transition-colors">Problem</a>
            <a href="#solution" className="hover:text-teal-600 transition-colors">Solution</a>
            <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
            <Link to="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-teal-800 hover:text-teal-600 font-medium hidden sm:block">Log in</Link>
            <Link to="/register" className="bg-teal-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-teal-800 transition-colors shadow-md">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center pt-10 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-teal-900 mb-6 leading-tight">
              Never Miss Another <br className="hidden md:block" />
              <span className="text-gradient">Important Moment.</span>
            </h1>
            <p className="text-xl text-teal-700/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              WishPilot uses AI to automatically send personalized birthday and anniversary wishes — beautifully designed and delivered at the perfect time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/register" className="flex items-center justify-center gap-2 bg-teal-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm border border-teal-900/10 text-teal-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/80 transition-all w-full sm:w-auto">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
            <p className="text-sm font-medium text-teal-700/60 uppercase tracking-widest mb-8">
              Trusted by professionals, students, and families worldwide.
            </p>
            
            {/* Integration Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                <MessageSquare className="w-6 h-6 text-green-500" /> WhatsApp
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                <Calendar className="w-6 h-6 text-blue-500" /> Google Calendar
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                <Users className="w-6 h-6 text-blue-600" /> Google Contacts
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                <Mail className="w-6 h-6 text-red-500" /> Gmail
              </div>
            </div>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 tracking-tight">
              Forgetting hurts relationships.
            </h2>
            <p className="text-xl text-teal-700/80 leading-relaxed">
              In our hyper-connected world, we are more disconnected than ever. Busy schedules and digital fatigue mean that important dates slip by unnoticed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:bg-white/60 transition-colors"
            >
              <div className="w-14 h-14 bg-rose-100/80 rounded-2xl flex items-center justify-center mb-6 text-rose-600 group-hover:scale-110 transition-transform shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-teal-900">Digital Fatigue</h3>
              <p className="text-teal-800/80 leading-relaxed">
                Between back-to-back meetings and endless notifications, remembering a birthday shouldn't feel like another overwhelming chore.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:bg-white/60 transition-colors"
            >
              <div className="w-14 h-14 bg-amber-100/80 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform shadow-sm">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-teal-900">The "HBD" Guilt</h3>
              <p className="text-teal-800/80 leading-relaxed">
                A missed birthday or a rushed, generic "HBD" text creates emotional distance. We carry the heavy guilt of forgetting the people who matter most.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:bg-white/60 transition-colors"
            >
              <div className="w-14 h-14 bg-indigo-100/80 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-teal-900">Lost Connections</h3>
              <p className="text-teal-800/80 leading-relaxed">
                Relationships are built on small, consistent moments of remembrance. When we forget to reach out, we lose a vital chance to connect.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-900">WishPilot Remembers So You Don't Have To.</h2>
            <p className="text-lg text-teal-700/80 max-w-2xl mx-auto">Three simple steps to automate your thoughtfulness.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "1. Connect Calendar", desc: "Sync your Google Calendar or add dates manually. We'll track every important moment." },
              { icon: MessageSquare, title: "2. Let AI Personalize", desc: "Our AI crafts deeply personal messages and stunning images based on your relationship." },
              { icon: Send, title: "3. Auto-Delivery", desc: "Wishes are sent automatically via WhatsApp at the perfect time. Zero manual effort." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-lavender-400 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md transform group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-teal-900">{step.title}</h3>
                <p className="text-teal-700/80 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-900">Everything You Need to Stay Connected</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: "AI Personalized Messages", desc: "Tailored to your relationship, tone, and emotional level." },
              { icon: Send, title: "Automated Delivery", desc: "Wishes sent automatically exactly when they matter most." },
              { icon: Calendar, title: "Smart Calendar Sync", desc: "Automatic import of important dates from Google Calendar." },
              { icon: ImageIcon, title: "Beautiful AI Images", desc: "Custom-generated visual greeting cards for every wish." },
              { icon: BarChart, title: "Relationship Insights", desc: "Track engagement and discover neglected connections." },
              { icon: Bell, title: "Reliable Confirmations", desc: "Instant notifications when your wishes are successfully delivered." },
              { icon: Sparkles, title: "Occasion Discovery", desc: "AI suggestions for events you might have forgotten." },
              { icon: Compass, title: "Smart Scheduling", desc: "Optimized delivery based on time zones and habits." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 rounded-2xl hover:bg-white/60 transition-colors group"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-teal-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-teal-700/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials & Stats */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6 tracking-tight">Loved by busy people everywhere.</h2>
            <p className="text-xl text-teal-700/80">Join thousands who have stopped forgetting and started connecting.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:bg-white/60 transition-colors"
            >
              <p className="italic text-teal-800/80 mb-8 leading-relaxed">"I travel constantly for work and used to miss my family's birthdays all the time. WishPilot saved my relationship with my sister. The AI messages feel so genuine."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center font-bold text-teal-800 text-lg">S</div>
                <div>
                  <p className="font-bold text-teal-900">Sarah J.</p>
                  <p className="text-sm text-teal-700/60">Startup Founder</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:bg-white/60 transition-colors"
            >
              <p className="italic text-teal-800/80 mb-8 leading-relaxed">"WishPilot is my secret weapon for client relationships. Remembering a client's work anniversary with a personalized note has literally helped me close deals."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lavender-200 rounded-full flex items-center justify-center font-bold text-lavender-800 text-lg">M</div>
                <div>
                  <p className="font-bold text-teal-900">Michael T.</p>
                  <p className="text-sm text-teal-700/60">Sales Director</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:bg-white/60 transition-colors"
            >
              <p className="italic text-teal-800/80 mb-8 leading-relaxed">"I'm terrible with dates. Syncing my Google Contacts and Calendar with WishPilot took 5 minutes, and it's saved me so much guilt. Best investment ever."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-bold text-rose-800 text-lg">D</div>
                <div>
                  <p className="font-bold text-teal-900">David K.</p>
                  <p className="text-sm text-teal-700/60">Software Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-3xl text-center">
              <div className="text-5xl font-bold text-teal-600 mb-2 flex justify-center items-center">
                <motion.span>{roundedWishes}</motion.span>k+
              </div>
              <div className="text-sm text-teal-700/70 font-medium uppercase tracking-wider">Wishes Sent</div>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center">
              <div className="text-5xl font-bold text-lavender-500 mb-2 flex justify-center items-center">
                <motion.span>{roundedUsers}</motion.span>k+
              </div>
              <div className="text-sm text-teal-700/70 font-medium uppercase tracking-wider">Active Users</div>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center">
              <div className="text-5xl font-bold text-gradient mb-2 flex justify-center items-center">
                <motion.span>{roundedRate}</motion.span>%
              </div>
              <div className="text-sm text-teal-700/70 font-medium uppercase tracking-wider">Delivery Rate</div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-5xl mx-auto px-6 py-12 border-y border-teal-900/10 my-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm">
              <Lock className="w-5 h-5 text-teal-500" /> End-to-end encryption
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm">
              <Shield className="w-5 h-5 text-teal-500" /> No data selling
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm">
              <CheckCircle className="w-5 h-5 text-teal-500" /> GDPR compliant
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm">
              <MessageSquare className="w-5 h-5 text-teal-500" /> Secure WhatsApp API
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-8">Start Building Stronger Relationships Today.</h2>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-lavender-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all mb-4">
            Start Free Now <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-teal-700/60">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> No spam</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Secure data protection</span>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-teal-700/80">Everything you need to know about WishPilot.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How do automated wishes work?", a: "WishPilot syncs with your Google Calendar to track important dates. Our AI generates a personalized message and image based on your relationship, and sends it automatically via WhatsApp at your preferred time." },
              { q: "Is my contact data secure?", a: "Absolutely. We use bank-level 256-bit encryption for all data. We are GDPR compliant and we never sell, share, or distribute your contact data to third parties." },
              { q: "Can I review messages before they are sent?", a: "Yes! On our Free and Starter plans, you can opt to manually approve every message before it goes out. Pro and Premium users can enable full auto-send for a completely hands-off experience." },
              { q: "How does the AI personalize greetings?", a: "When you add an event, you provide the relationship (e.g., Mother, Boss), preferred tone (e.g., Emotional, Professional), and optional memory notes. Our AI uses this context to craft a deeply personal, human-sounding message." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel or pause your subscription at any time from your dashboard settings. There are no hidden fees or lock-in contracts." }
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-teal-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-teal-700/80 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-teal-900/40 hover:text-teal-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-6">
              <Logo showText={true} />
            </div>
            <h3 className="text-2xl font-bold text-teal-900 mb-3">Wait! Don't miss out on stronger relationships.</h3>
            <p className="text-teal-700/80 mb-8">
              Sign up today and get your first 5 automated wishes completely free. No credit card required.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/register" 
                className="w-full bg-teal-900 text-white py-4 rounded-full font-bold text-center hover:bg-teal-800 transition-colors shadow-md"
              >
                Claim My Free Wishes
              </Link>
              <button 
                onClick={() => setShowExitIntent(false)}
                className="w-full py-4 text-teal-700/60 font-medium hover:text-teal-900 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
