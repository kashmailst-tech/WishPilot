import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Heart, Shield, Lock, CheckCircle, MessageSquare, CreditCard, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function PricingPage() {
  const [interval, setInterval] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{id: string, priceId: string} | null>(null);
  const [loadingGateway, setLoadingGateway] = useState<string | null>(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleSubscribeClick = (planId: string, priceId: string) => {
    if (!user) {
      navigate('/register');
      return;
    }
    setSelectedPlan({ id: planId, priceId });
    setShowPaymentModal(true);
  };

  const handleCheckout = async (gateway: 'stripe' | 'paypal' | 'razorpay') => {
    if (!selectedPlan) return;
    setLoadingGateway(gateway);
    
    try {
      let endpoint = '/api/create-checkout-session';
      if (gateway === 'paypal') endpoint = '/api/checkout/paypal';
      if (gateway === 'razorpay') endpoint = '/api/checkout/razorpay';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ planId: selectedPlan.id, priceId: selectedPlan.priceId, interval })
      });
      
      const data = await res.json();
      
      if (gateway === 'stripe' && data.url) {
        window.location.href = data.url;
      } else if (gateway === 'paypal' && data.id) {
        // In a real app, you'd redirect to PayPal or open PayPal JS SDK
        alert('PayPal order created. Redirecting to PayPal...');
        window.location.href = `/dashboard?session_id=${data.id}&success=true&gateway=paypal&planId=${selectedPlan.id}`;
      } else if (gateway === 'razorpay' && data.id) {
        // In a real app, you'd open Razorpay Checkout modal here
        alert('Razorpay order created. Opening checkout...');
        window.location.href = `/dashboard?session_id=${data.id}&success=true&gateway=razorpay&planId=${selectedPlan.id}`;
      } else {
        alert('Failed to initiate checkout. Please try again later.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout.');
    } finally {
      setLoadingGateway(null);
    }
  };

  const getPrice = (baseMonthly: number) => {
    if (interval === 'monthly') return baseMonthly.toFixed(2);
    if (interval === 'quarterly') return (baseMonthly * 0.85).toFixed(2);
    return (baseMonthly * 0.70).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-water font-sans py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aqua-100/50 blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-lavender-100/50 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-teal-900 mb-8 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <div className="flex justify-center mb-6">
            <Logo showText={true} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-teal-900 sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-teal-700/80 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when you're ready.
          </p>
          
          {/* Interval Selection */}
          <div className="mt-10 flex justify-center items-center">
            <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full inline-flex shadow-sm border border-teal-900/10">
              <button 
                onClick={() => setInterval('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${interval === 'monthly' ? 'bg-teal-900 text-white shadow-md' : 'text-teal-700 hover:bg-white/50'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setInterval('quarterly')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${interval === 'quarterly' ? 'bg-teal-900 text-white shadow-md' : 'text-teal-700 hover:bg-white/50'}`}
              >
                Quarterly <span className="text-[10px] ml-1 bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full">-15%</span>
              </button>
              <button 
                onClick={() => setInterval('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${interval === 'yearly' ? 'bg-teal-900 text-white shadow-md' : 'text-teal-700 hover:bg-white/50'}`}
              >
                Yearly <span className="text-[10px] ml-1 bg-lavender-100 text-lavender-700 px-1.5 py-0.5 rounded-full">-30%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-3xl p-8 flex flex-col border border-white/60"
          >
            <h3 className="text-xl font-bold text-teal-900 mb-2">Free</h3>
            <p className="text-teal-700/70 text-sm mb-6 h-10">Perfect for trying out the service.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-teal-900">$0</span>
              <span className="text-teal-700/60 text-sm">/forever</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Up to 5 events</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Manual approval before send</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Watermarked images</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Basic AI personalization</span>
              </li>
            </ul>
            <Link to="/register" className="w-full py-3 px-4 bg-white/50 text-teal-900 font-medium rounded-full text-center hover:bg-white/80 transition-colors border border-teal-900/10">
              Start Free
            </Link>
          </motion.div>

          {/* Starter Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 flex flex-col border border-white/60"
          >
            <h3 className="text-xl font-bold text-teal-900 mb-2">Starter</h3>
            <p className="text-teal-700/70 text-sm mb-6 h-10">For individuals managing close family.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-teal-900">${getPrice(1.99)}</span>
              <span className="text-teal-700/60 text-sm">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Up to 20 events</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Full auto-send via WhatsApp</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>HD images (No watermark)</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Advanced AI personalization</span>
              </li>
            </ul>
            <button 
              onClick={() => handleSubscribeClick('starter', `price_starter_${interval}`)}
              className="w-full py-3 px-4 bg-teal-100 text-teal-900 font-medium rounded-full text-center hover:bg-teal-200 transition-colors"
            >
              Subscribe
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-b from-teal-600 to-teal-800 rounded-3xl p-8 flex flex-col shadow-xl relative transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-lavender-400 to-lavender-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <p className="text-teal-100/70 text-sm mb-6 h-10">For busy professionals & large networks.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">${getPrice(3.99)}</span>
              <span className="text-teal-100/60 text-sm">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-teal-50">
                <Check className="w-5 h-5 text-lavender-300 flex-shrink-0" />
                <span>Unlimited events</span>
              </li>
              <li className="flex items-start gap-3 text-teal-50">
                <Check className="w-5 h-5 text-lavender-300 flex-shrink-0" />
                <span>Google Calendar Sync</span>
              </li>
              <li className="flex items-start gap-3 text-teal-50">
                <Check className="w-5 h-5 text-lavender-300 flex-shrink-0" />
                <span>Memory-based messages</span>
              </li>
              <li className="flex items-start gap-3 text-teal-50">
                <Check className="w-5 h-5 text-lavender-300 flex-shrink-0" />
                <span>Global Festival Automation</span>
              </li>
            </ul>
            <button 
              onClick={() => handleSubscribeClick('pro', `price_pro_${interval}`)}
              className="w-full py-3 px-4 bg-white text-teal-900 font-bold rounded-full text-center hover:bg-teal-50 transition-colors shadow-md"
            >
              Subscribe Pro
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 flex flex-col border border-white/60"
          >
            <h3 className="text-xl font-bold text-teal-900 mb-2">Premium</h3>
            <p className="text-teal-700/70 text-sm mb-6 h-10">The ultimate relationship automation.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-teal-900">${getPrice(7.99)}</span>
              <span className="text-teal-700/60 text-sm">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-lavender-500 flex-shrink-0" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-lavender-500 flex-shrink-0" />
                <span>AI Voice & Video Wishes</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-lavender-500 flex-shrink-0" />
                <span>Relationship Analytics Dashboard</span>
              </li>
              <li className="flex items-start gap-3 text-teal-800">
                <Check className="w-5 h-5 text-lavender-500 flex-shrink-0" />
                <span>Priority Support</span>
              </li>
            </ul>
            <button 
              onClick={() => handleSubscribeClick('premium', `price_premium_${interval}`)}
              className="w-full py-3 px-4 bg-lavender-100 text-lavender-700 font-medium rounded-full text-center hover:bg-lavender-200 transition-colors"
            >
              Subscribe Premium
            </button>
          </motion.div>
        </div>

        {/* Trust Section */}
        <section className="max-w-4xl mx-auto mt-20 pt-10 border-t border-teal-900/10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm bg-white/40 px-4 py-2 rounded-full">
              <Lock className="w-4 h-4 text-teal-600" /> End-to-end encryption
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm bg-white/40 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-teal-600" /> No data selling
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm bg-white/40 px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-teal-600" /> GDPR compliant
            </div>
            <div className="flex items-center gap-2 text-teal-800/70 font-medium text-sm bg-white/40 px-4 py-2 rounded-full">
              <MessageSquare className="w-4 h-4 text-teal-600" /> Secure WhatsApp API
            </div>
          </div>
        </section>
      </div>

      {/* Payment Gateway Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6 border-b border-teal-900/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-teal-900">Select Payment Method</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-teal-700/60 hover:text-teal-900">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <button 
                  onClick={() => handleCheckout('stripe')}
                  disabled={loadingGateway !== null}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-teal-900/10 hover:border-teal-500 hover:bg-teal-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-teal-900">Credit / Debit Card</p>
                      <p className="text-xs text-teal-700/60">Powered by Stripe</p>
                    </div>
                  </div>
                  {loadingGateway === 'stripe' ? <span className="text-sm text-teal-600">Loading...</span> : <ArrowLeft className="w-4 h-4 text-teal-300 group-hover:text-teal-600 rotate-180 transition-colors" />}
                </button>

                <button 
                  onClick={() => handleCheckout('paypal')}
                  disabled={loadingGateway !== null}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-teal-900/10 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-teal-900">PayPal</p>
                      <p className="text-xs text-teal-700/60">Global payments</p>
                    </div>
                  </div>
                  {loadingGateway === 'paypal' ? <span className="text-sm text-teal-600">Loading...</span> : <ArrowLeft className="w-4 h-4 text-teal-300 group-hover:text-teal-600 rotate-180 transition-colors" />}
                </button>

                <button 
                  onClick={() => handleCheckout('razorpay')}
                  disabled={loadingGateway !== null}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-teal-900/10 hover:border-blue-600 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-teal-900">UPI / Netbanking</p>
                      <p className="text-xs text-teal-700/60">Powered by Razorpay (India)</p>
                    </div>
                  </div>
                  {loadingGateway === 'razorpay' ? <span className="text-sm text-teal-600">Loading...</span> : <ArrowLeft className="w-4 h-4 text-teal-300 group-hover:text-teal-600 rotate-180 transition-colors" />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
