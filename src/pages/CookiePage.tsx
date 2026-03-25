import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-water font-sans pt-12">
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-teal-900 hover:opacity-80 font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <Logo showText={true} />
        </div>
        
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-8 h-8 text-teal-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-teal-900">Cookie Policy</h1>
          </div>
          
          <div className="prose prose-teal max-w-none text-teal-800/80 space-y-6">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            
            <section>
              <h2 className="text-xl font-bold text-teal-900 mb-3">1. What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit our website. They help us ensure the platform functions correctly, remember your preferences, and understand how you interact with WishPilot.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-teal-900 mb-3">2. How We Use Cookies</h2>
              <p>We use cookies primarily for:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Authentication:</strong> Keeping you securely logged in.</li>
                <li><strong>Preferences:</strong> Remembering your settings and dashboard views.</li>
                <li><strong>Analytics:</strong> Understanding how users navigate our site to improve the experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-teal-900 mb-3">3. Managing Your Cookies</h2>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit WishPilot, and some services and functionalities may not work.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
