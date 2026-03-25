import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo showText={true} />
          </a>
        </div>
      </header>

      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
              Let's start a conversation.
            </h1>
            <p className="text-lg text-stone-600 mb-12 leading-relaxed">
              Whether you have a question about how our AI works, need technical support, or just want to say hello, our team is ready to help. We usually respond within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-1">General Inquiries</h3>
                  <p className="text-stone-600 mb-2">For questions about pricing, features, or partnerships.</p>
                  <a href="mailto:hello@wishpilot.com" className="text-teal-600 font-medium hover:underline">hello@wishpilot.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-1">Technical Support</h3>
                  <p className="text-stone-600 mb-2">Having trouble with your account or automations?</p>
                  <a href="mailto:support@wishpilot.com" className="text-rose-600 font-medium hover:underline">support@wishpilot.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 z-10"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                <p className="text-stone-600">Thanks for reaching out. We'll get back to you shortly.</p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">First Name</label>
                  <input type="text" required className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Last Name</label>
                  <input type="text" required className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                <input type="email" required className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Topic</label>
                <select className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm bg-white">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                <textarea rows={4} required className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm"></textarea>
              </div>

              <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
