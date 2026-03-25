import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const BLOG_POSTS = [
  {
    slug: 'best-birthday-message-ideas-2026',
    title: '50 Thoughtful Birthday Message Ideas for Every Relationship',
    excerpt: 'Struggling to find the right words? Discover our curated list of birthday wishes for mothers, bosses, friends, and partners.',
    date: 'March 1, 2026',
    category: 'Greeting Ideas'
  },
  {
    slug: 'how-to-remember-anniversaries',
    title: 'The Ultimate Guide to Never Forgetting an Anniversary Again',
    excerpt: 'Learn how relationship automation and smart calendar syncing can save you from the guilt of a missed anniversary.',
    date: 'February 24, 2026',
    category: 'Relationship Advice'
  },
  {
    slug: 'ai-in-relationships',
    title: 'Can AI Make Us More Thoughtful? The Future of Digital Connections',
    excerpt: 'Explore how artificial intelligence is helping busy professionals maintain strong emotional connections with their loved ones.',
    date: 'February 15, 2026',
    category: 'Technology'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-water font-sans pt-12">
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-teal-900 hover:opacity-80 font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <Logo showText={true} />
        </div>
        
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">The WishPilot Blog</h1>
          <p className="text-xl text-teal-700/80 max-w-2xl mx-auto">
            Insights, tips, and inspiration for building stronger relationships in a busy world. Learn how our <span className="font-medium">automatic birthday wish app</span> and <span className="font-medium">AI greeting generator</span> can help you stay connected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="glass-card rounded-3xl p-6 flex flex-col hover:-translate-y-1 transition-transform group">
              <div className="text-xs font-bold text-lavender-600 uppercase tracking-wider mb-3">{post.category}</div>
              <h2 className="text-xl font-bold text-teal-900 mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h2>
              <p className="text-teal-700/70 text-sm mb-6 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-teal-800/60 pt-4 border-t border-teal-900/10">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
