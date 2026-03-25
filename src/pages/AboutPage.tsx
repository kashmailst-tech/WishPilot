import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Clock } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
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
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Strengthening relationships in a <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-violet-600">busy world.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              We built WishPilot because we believe technology shouldn't replace human connection—it should protect it. Our mission is to ensure you never miss a moment that matters to the people you love.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-stone mx-auto">
              <h2 className="text-3xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-rose-500" />
                Our Story
              </h2>
              <p>
                It started with a missed birthday. Not just any birthday, but a mother's birthday. In the chaos of back-to-back meetings and endless to-do lists, the day slipped by. The guilt was heavy, but the realization was heavier: we are more connected than ever, yet we are forgetting the moments that actually matter.
              </p>
              <p>
                We realized that calendar reminders weren't enough. A notification pops up, we swipe it away, promising to "do it later," and then life gets in the way.
              </p>
              <p>
                That's why we created WishPilot. We wanted to build a system that doesn't just remind you, but actually helps you take action. By combining the emotional intelligence of AI with the reliability of automation, we've created a platform that acts as your personal relationship assistant.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="w-8 h-8 text-rose-500" />,
                  title: "Emotion First",
                  desc: "Automation should enhance emotion, not replace it. Our AI is trained to sound like you, using your memories and tone."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                  title: "Invisible Magic",
                  desc: "The best technology gets out of the way. We handle the complex scheduling and generation so you can focus on the relationship."
                },
                {
                  icon: <Users className="w-8 h-8 text-teal-500" />,
                  title: "Privacy as a Right",
                  desc: "Your relationships are deeply personal. We protect your contact data with enterprise-grade security and never sell it."
                }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
                >
                  <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
