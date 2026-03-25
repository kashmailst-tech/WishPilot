import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, Mail, MessageCircle, Calendar, Twitter, Linkedin, Instagram, Facebook, Globe } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-white/80 backdrop-blur-md border-t border-teal-900/10 py-16 mt-20 overflow-hidden">
      {/* Subtle World Map Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100,50 Q150,20 200,50 T300,50 T400,50 T500,50 T600,50 T700,50 T800,50 T900,50 T1000,50' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo showText={true} />
            </div>
            <p className="text-teal-700/80 max-w-sm mb-8 leading-relaxed">
              The global AI-powered relationship automation platform. Never miss another important moment with the people who matter most, anywhere in the world.
            </p>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 hover:text-teal-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 hover:text-teal-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 hover:text-teal-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 hover:text-teal-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-teal-800/70">
              <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-teal-500" /> 256-bit Encryption</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-teal-500" /> GDPR Compliant</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-teal-900 mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-3 text-teal-700/80">
              <li><Link to="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link></li>
              <li><a href="/#features" className="hover:text-teal-600 transition-colors">Features</a></li>
              <li><a href="/#integrations" className="hover:text-teal-600 transition-colors">Integrations</a></li>
              <li><Link to="/login" className="hover:text-teal-600 transition-colors">Log in</Link></li>
              <li><Link to="/register" className="hover:text-teal-600 transition-colors">Sign up</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-teal-900 mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-3 text-teal-700/80">
              <li><Link to="/blog" className="hover:text-teal-600 transition-colors">Blog</Link></li>
              <li><Link to="/help" className="hover:text-teal-600 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-teal-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/security" className="hover:text-teal-600 transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-teal-900 mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3 text-teal-700/80">
              <li><Link to="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-teal-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-teal-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-teal-900/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-teal-700/60">
            <div className="flex items-center gap-2" title="WhatsApp Integration">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2" title="Email Integration">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2" title="Google Calendar Integration">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2" title="Global Delivery">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-teal-700/60 text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} WishPilot Inc. All rights reserved. We never sell your data.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
