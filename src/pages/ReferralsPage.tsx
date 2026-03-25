import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Gift, Copy, CheckCircle, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function ReferralsPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ referralCode: '', totalReferrals: 0, referrals: [] as any[] });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch('/api/referrals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch referrals', err);
      }
    };
    if (token) fetchReferrals();
  }, [token]);

  const referralLink = `${window.location.origin}/register?ref=${stats.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-water font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
              <ArrowLeft className="w-6 h-6 text-teal-900" />
            </Link>
            <h1 className="text-3xl font-bold text-teal-900 tracking-tight">Refer a Friend</h1>
          </div>
          <Logo showText={true} />
        </div>

        <div className="glass-card rounded-3xl overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-br from-teal-500 to-lavender-500 text-white text-center">
            <Gift className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-2">Give 1 Credit, Get 1 Credit</h2>
            <p className="text-teal-50 max-w-lg mx-auto">
              Invite your friends to WishPilot. They get an extra free wish when they sign up, and you get a free wish when they join!
            </p>
          </div>
          
          <div className="p-8">
            <h3 className="text-lg font-bold text-teal-900 mb-4">Your Referral Link</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 flex items-center overflow-hidden">
                <span className="text-stone-600 truncate">{referralLink}</span>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 bg-teal-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-800 transition-colors whitespace-nowrap"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-teal-700/70 font-medium uppercase tracking-wider">Total Referrals</p>
              <p className="text-3xl font-bold text-teal-900">{stats.totalReferrals}</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center text-lavender-600">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-teal-700/70 font-medium uppercase tracking-wider">Credits Earned</p>
              <p className="text-3xl font-bold text-teal-900">{stats.totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-xl font-bold text-teal-900 mb-6">Recent Referrals</h3>
          {stats.referrals.length > 0 ? (
            <div className="space-y-4">
              {stats.referrals.map((ref: any) => (
                <div key={ref.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                      {ref.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-teal-900">{ref.name}</p>
                      <p className="text-xs text-stone-500">Joined {new Date(ref.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    +1 Credit
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>You haven't referred anyone yet.</p>
              <p className="text-sm mt-1">Share your link to start earning credits!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
