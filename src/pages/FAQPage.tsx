import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const faqs = [
  {
    question: "How does the automated wishing work?",
    answer: "WishPilot connects to your calendar (or you can add dates manually). When an event approaches, our AI generates a personalized message based on your relationship and past memories. At the scheduled time, it automatically sends the message via WhatsApp."
  },
  {
    question: "Do I need to keep the app open for messages to send?",
    answer: "No! Once you set up an event, our cloud servers handle the rest. You can close the app, turn off your phone, or go on vacation—your wishes will still be delivered exactly on time."
  },
  {
    question: "Can I review the AI message before it sends?",
    answer: "Yes. By default, WishPilot can send messages fully automatically. However, you can enable 'Review Mode' for specific events, which sends you a notification 24 hours before the event to approve or edit the AI-generated message."
  },
  {
    question: "How does WishPilot connect to WhatsApp?",
    answer: "We use the official WhatsApp Cloud API to securely send messages. You can choose to use our verified WishPilot sender number, or connect your own phone number (available on Pro plans)."
  },
  {
    question: "Is my contact data safe?",
    answer: "Absolutely. We use bank-level encryption (AES-256) to store your contact data. We never sell your data, and we only use it to send the messages you explicitly authorize. You can delete your data at any time."
  },
  {
    question: "Can I sync my Google Contacts?",
    answer: "Yes! You can securely connect your Google account to import birthdays and anniversaries directly from your Google Contacts and Google Calendar."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo showText={true} />
          </a>
        </div>
      </header>

      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Everything you need to know about how WishPilot automates your relationships securely and intelligently.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold text-stone-900 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-stone-600 leading-relaxed border-t border-stone-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
