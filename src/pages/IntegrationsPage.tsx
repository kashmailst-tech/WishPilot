import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Link as LinkIcon, Smartphone, Globe, Zap } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo showText={true} />
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-indigo-100">
              <LinkIcon className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Connect your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">ecosystem.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              WishPilot seamlessly integrates with the tools you already use to manage your life and relationships.
            </p>
          </motion.div>
        </section>

        {/* Integrations Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <MessageCircle className="w-8 h-8 text-emerald-500" />,
                  title: "WhatsApp",
                  desc: "Send automated, personalized messages directly via WhatsApp Business API. Your friends receive messages exactly when you schedule them.",
                  status: "Live"
                },
                {
                  icon: <Calendar className="w-8 h-8 text-blue-500" />,
                  title: "Google Calendar",
                  desc: "Automatically import birthdays, anniversaries, and custom events from your Google Calendar. Never miss a date you've already saved.",
                  status: "Live"
                },
                {
                  icon: <Smartphone className="w-8 h-8 text-rose-500" />,
                  title: "Google Contacts",
                  desc: "Sync your Google Contacts to easily pull in phone numbers and relationship details when setting up new automated wishes.",
                  status: "Live"
                },
                {
                  icon: <Globe className="w-8 h-8 text-sky-500" />,
                  title: "Apple Calendar (iCal)",
                  desc: "Import events from your iCloud calendar to keep all your important dates synchronized across devices.",
                  status: "Coming Soon"
                },
                {
                  icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
                  title: "Telegram",
                  desc: "Send automated wishes via Telegram. Perfect for international friends or groups that prefer alternative messaging apps.",
                  status: "Coming Soon"
                },
                {
                  icon: <Zap className="w-8 h-8 text-amber-500" />,
                  title: "Zapier",
                  desc: "Connect WishPilot to over 5,000+ apps. Trigger automated wishes from CRM updates, form submissions, or custom workflows.",
                  status: "Coming Soon"
                }
              ].map((integration, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-stone-50 p-8 rounded-3xl border border-stone-100 hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-6 right-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      integration.status === 'Live' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-stone-200 text-stone-600'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    {integration.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{integration.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{integration.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer API */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Building something custom?</h2>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              Our REST API allows developers to programmatically create events, generate AI messages, and schedule deliveries. Perfect for CRM integrations and enterprise use cases.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-stone-700 rounded-full text-base font-medium hover:bg-stone-800 transition-colors">
              Read API Documentation
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
