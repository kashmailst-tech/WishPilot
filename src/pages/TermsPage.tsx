import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, AlertTriangle, UserCheck, Settings } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function TermsPage() {
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
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ScrollText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            The rules for using WishPilot's automated relationship management platform.
          </p>
          <p className="text-sm text-stone-400 mt-4">Last updated: October 24, 2023</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sticky Sidebar) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Contents</h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li><a href="#acceptance" className="hover:text-teal-600 transition-colors">1. Acceptance of Terms</a></li>
                <li><a href="#usage" className="hover:text-teal-600 transition-colors">2. Acceptable Usage</a></li>
                <li><a href="#automation" className="hover:text-teal-600 transition-colors">3. Automation Rules</a></li>
                <li><a href="#liability" className="hover:text-teal-600 transition-colors">4. Limitation of Liability</a></li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Section 1 */}
            <motion.section 
              id="acceptance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6 text-teal-500" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">1. Acceptance of Terms</h2>
              </div>
              <div className="prose prose-stone max-w-none text-stone-600">
                <p>By accessing or using the WishPilot platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
                <p>You must be at least 18 years old to use WishPilot. By creating an account, you represent and warrant that you meet this age requirement.</p>
              </div>
            </motion.section>

            {/* Section 2 */}
            <motion.section 
              id="usage"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">2. Acceptable Usage Policy</h2>
              </div>
              <div className="prose prose-stone max-w-none text-stone-600">
                <p>WishPilot is designed for personal relationship management and thoughtful communication. You agree NOT to use the platform for:</p>
                <ul>
                  <li><strong>Spam or Unsolicited Messaging:</strong> Sending bulk messages, marketing materials, or promotional content to individuals who have not consented.</li>
                  <li><strong>Harassment:</strong> Sending abusive, threatening, or harassing messages.</li>
                  <li><strong>Impersonation:</strong> Pretending to be someone else or misrepresenting your identity.</li>
                  <li><strong>Illegal Content:</strong> Generating or transmitting content that violates any applicable laws or regulations.</li>
                </ul>
                <p>We reserve the right to suspend or terminate accounts that violate these usage policies without prior notice.</p>
              </div>
            </motion.section>

            {/* Section 3 */}
            <motion.section 
              id="automation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <Settings className="w-6 h-6 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">3. Automation Rules & Responsibilities</h2>
              </div>
              <div className="prose prose-stone max-w-none text-stone-600">
                <p>When using our automated messaging features, you acknowledge and agree that:</p>
                <ul>
                  <li><strong>Review Responsibility:</strong> While our AI generates high-quality messages, you are ultimately responsible for the content sent from your account. We recommend using the "Review Mode" for important relationships.</li>
                  <li><strong>Delivery Guarantees:</strong> We strive for 99.9% uptime, but we cannot guarantee delivery if third-party services (like WhatsApp or cellular networks) experience outages.</li>
                  <li><strong>Contact Accuracy:</strong> You are responsible for ensuring the phone numbers and contact details you provide are accurate and up-to-date.</li>
                </ul>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
