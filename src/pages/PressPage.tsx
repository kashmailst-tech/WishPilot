import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Newspaper } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function PressPage() {
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
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100">
              <Newspaper className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to write about WishPilot. Download our brand assets, read our story, and get in touch with our PR team.
            </p>
          </motion.div>
        </section>

        {/* Brand Assets Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-stone-900 mb-12 flex items-center justify-center gap-3">
              <ImageIcon className="w-8 h-8 text-indigo-500" />
              Brand Assets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Logos & Wordmarks",
                  desc: "High-resolution SVG and PNG files of our primary logo, monochrome versions, and wordmarks.",
                  icon: <Logo showText={false} className="w-12 h-12" />
                },
                {
                  title: "Product Screenshots",
                  desc: "High-quality screenshots of the WishPilot dashboard, event creation flow, and mobile app.",
                  icon: <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-stone-400" /></div>
                }
              ].map((asset, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-stone-50 p-8 rounded-3xl border border-stone-100 flex flex-col items-center text-center"
                >
                  <div className="mb-6">
                    {asset.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{asset.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{asset.desc}</p>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Fact Sheet */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-teal-500" />
              Company Fact Sheet
            </h2>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Founded</h4>
                  <p className="text-lg text-stone-900">2023</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Headquarters</h4>
                  <p className="text-lg text-stone-900">San Francisco, CA (Remote)</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Mission</h4>
                  <p className="text-lg text-stone-900">To strengthen human relationships through intelligent automation.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Key Features</h4>
                  <ul className="list-disc list-inside text-lg text-stone-900">
                    <li>AI-generated personalized messages</li>
                    <li>Automated WhatsApp delivery</li>
                    <li>Google Calendar & Contacts sync</li>
                    <li>Bank-level data security</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-stone-600 mb-4">For press inquiries, interviews, or additional information:</p>
              <a href="mailto:press@wishpilot.com" className="text-teal-600 font-medium hover:underline text-lg">press@wishpilot.com</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
