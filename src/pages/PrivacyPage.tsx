import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo showText={true} />
          </a>
        </div>
      </header>

      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Your relationships are personal. We believe your data should be too. <br />
            Here is exactly how we protect your information.
          </p>
          <p className="text-sm text-stone-400 mt-4">Last updated: October 24, 2023</p>
        </motion.div>

        <div className="space-y-12">
          {/* Section 1 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">1. Information We Collect</h2>
            </div>
            <div className="prose prose-stone max-w-none text-stone-600">
              <p>We only collect the information absolutely necessary to provide our automated wishing service:</p>
              <ul>
                <li><strong>Account Information:</strong> Your name, email address, and password (encrypted).</li>
                <li><strong>Contact Data:</strong> The names, phone numbers, and relationship details of the people you add to WishPilot.</li>
                <li><strong>Event Data:</strong> Dates of birthdays, anniversaries, and any memory notes you provide for AI personalization.</li>
                <li><strong>Integration Data:</strong> If you connect Google Calendar or Google Contacts, we only access the specific dates and contacts you authorize.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-teal-500" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">2. How We Use Your Information</h2>
            </div>
            <div className="prose prose-stone max-w-none text-stone-600">
              <p>Your data is used strictly for the operation of the WishPilot platform:</p>
              <ul>
                <li>To generate personalized AI messages based on your provided memory notes.</li>
                <li>To schedule and deliver messages via WhatsApp at your requested times.</li>
                <li>To send you account notifications, delivery confirmations, and review requests.</li>
              </ul>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mt-6">
                <strong className="text-stone-900 block mb-2">Our Zero-Selling Promise:</strong>
                We will never sell, rent, or trade your personal information or your contacts' information to third parties, advertisers, or data brokers.
              </div>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">3. Data Retention & Deletion</h2>
            </div>
            <div className="prose prose-stone max-w-none text-stone-600">
              <p>You maintain full ownership and control over your data:</p>
              <ul>
                <li>You can edit or delete individual contacts and events at any time from your dashboard.</li>
                <li>If you choose to delete your account, all associated data (including contacts, events, and message history) is permanently erased from our active servers within 30 days.</li>
                <li>We do not retain AI-generated messages longer than necessary for delivery and your personal history log.</li>
              </ul>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
