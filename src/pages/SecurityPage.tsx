import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, EyeOff, FileKey, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function SecurityPage() {
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
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Bank-level security for your <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">relationships.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              We treat your contact data with the same level of security as financial data. Your relationships are private, and we ensure they stay that way.
            </p>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Lock className="w-8 h-8 text-indigo-500" />,
                  title: "End-to-End Encryption",
                  desc: "All data transmitted between your device and our servers is encrypted using TLS 1.3. Data at rest is encrypted using AES-256."
                },
                {
                  icon: <EyeOff className="w-8 h-8 text-rose-500" />,
                  title: "Zero Data Selling",
                  desc: "We are a software company, not an advertising company. We never sell, rent, or share your contact data with third parties."
                },
                {
                  icon: <Server className="w-8 h-8 text-teal-500" />,
                  title: "Secure Infrastructure",
                  desc: "Our servers are hosted on enterprise-grade cloud infrastructure with strict physical and network security protocols."
                },
                {
                  icon: <FileKey className="w-8 h-8 text-amber-500" />,
                  title: "Strict Access Controls",
                  desc: "Only authorized systems can access your data to send messages. Our employees cannot read your generated messages."
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
                  title: "Compliance & Audits",
                  desc: "We regularly audit our systems and comply with major data protection regulations including GDPR and CCPA."
                },
                {
                  icon: <Shield className="w-8 h-8 text-blue-500" />,
                  title: "WhatsApp Security",
                  desc: "We use the official WhatsApp Cloud API. Messages are sent securely and directly to Meta's infrastructure."
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-stone-50 p-8 rounded-3xl border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Ownership */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">You own your data.</h2>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              You have complete control over your account. You can export your contact data at any time, and if you choose to delete your account, we permanently erase all your data from our active servers within 30 days.
            </p>
            <a href="/privacy" className="inline-flex items-center justify-center px-8 py-4 border border-stone-700 rounded-full text-base font-medium hover:bg-stone-800 transition-colors">
              Read our full Privacy Policy
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
