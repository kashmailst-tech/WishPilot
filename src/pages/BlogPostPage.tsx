import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function BlogPostPage() {
  const { slug } = useParams();
  
  // Mock content based on slug
  const title = slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-water font-sans pt-12">
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-teal-900 hover:opacity-80 font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </Link>
          <Logo showText={true} />
        </div>
        
        <article className="glass-card rounded-3xl p-8 md:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-teal-900 mb-6 leading-tight">{title}</h1>
            <div className="flex items-center justify-center gap-6 text-teal-700/70 text-sm">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> March 1, 2026</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> Editorial Team</span>
            </div>
          </div>
          
          <div className="prose prose-teal max-w-none text-teal-800/80 space-y-6 text-lg leading-relaxed">
            <p>Maintaining strong relationships in today's fast-paced digital world can be challenging. Between endless meetings, overflowing inboxes, and daily responsibilities, it's easy for important dates to slip our minds. This is why using a reliable <strong>birthday reminder app</strong> or an <strong>anniversary reminder app</strong> has become essential for busy professionals.</p>
            
            <h2 className="text-2xl font-bold text-teal-900 mt-8 mb-4">The Impact of a Thoughtful Message</h2>
            <p>A generic "Happy Birthday" text sent at 11:45 PM often feels like an afterthought. However, a personalized message that references a shared memory or inside joke can make someone's entire day. It shows that you didn't just remember the date—you remembered <em>them</em>. An advanced <strong>AI greeting generator</strong> can help you find the perfect words when you're struggling to express your feelings.</p>
            
            <h2 className="text-2xl font-bold text-teal-900 mt-8 mb-4">How Automation Helps</h2>
            <p>Using a relationship automation tool like WishPilot doesn't mean you care less. In fact, it means you care enough to ensure you never miss a moment. By setting up your calendar and letting AI help draft the perfect message, you combine the efficiency of technology with the warmth of human connection. With features like <strong>automated WhatsApp birthday messages</strong>, you can ensure your thoughtful greetings are delivered exactly when they matter most.</p>
            
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl my-8">
              <p className="italic text-teal-900 m-0">"The best time to set up an <strong>automatic birthday wish app</strong> is the day after you forget one. The second best time is today."</p>
            </div>
            
            <p>Start building stronger relationships today by taking 5 minutes to sync your calendar and set up your most important contacts.</p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
