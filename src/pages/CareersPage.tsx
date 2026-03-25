import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, PenTool, Sparkles, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function CareersPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Build technology that <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-500">connects people.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              We're a small, passionate team building the future of relationship automation. If you believe technology should enhance human connection, we want you on our team.
            </p>
          </motion.div>
        </section>

        {/* Culture Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8 text-teal-500" />,
                  title: "Remote First",
                  desc: "Work from anywhere. We care about what you build, not where you sit."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                  title: "Ownership",
                  desc: "Take charge of your projects from ideation to deployment. We trust our team."
                },
                {
                  icon: <Code className="w-8 h-8 text-indigo-500" />,
                  title: "Continuous Learning",
                  desc: "We provide a learning budget for courses, books, and conferences."
                }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-stone-50 p-8 rounded-3xl border border-stone-100"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Open Roles</h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Senior Full-Stack Engineer",
                  department: "Engineering",
                  location: "Remote (Global)",
                  type: "Full-time"
                },
                {
                  title: "Product Designer (UI/UX)",
                  department: "Design",
                  location: "Remote (Global)",
                  type: "Full-time"
                },
                {
                  title: "AI Prompt Engineer",
                  department: "Product",
                  location: "Remote (Global)",
                  type: "Contract"
                }
              ].map((role, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between group hover:border-teal-200 transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">{role.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-stone-500">
                      <span className="bg-stone-100 px-3 py-1 rounded-full">{role.department}</span>
                      <span>{role.location}</span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <ArrowRight className="w-6 h-6 text-stone-300 group-hover:text-teal-500 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-stone-600 mb-4">Don't see a role that fits? We're always looking for talented people.</p>
              <a href="mailto:careers@wishpilot.com" className="text-teal-600 font-medium hover:underline">Send us your resume</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
