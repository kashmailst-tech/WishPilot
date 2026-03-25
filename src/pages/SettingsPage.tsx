import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Shield, Bell, CreditCard, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function SettingsPage() {
  const { user, token, refreshUser } = useAuth();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        refreshUser();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refreshUser]);

  const handleConnectGoogle = async () => {
    try {
      const res = await fetch('/api/auth/google/url', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.url) {
        const authWindow = window.open(data.url, 'oauth_popup', 'width=600,height=700');
        if (!authWindow) {
          alert('Please allow popups for this site to connect your account.');
        }
      }
    } catch (err) {
      console.error('Failed to get Google Auth URL', err);
    }
  };

  return (
    <div className="min-h-screen bg-water font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
              <ArrowLeft className="w-6 h-6 text-teal-900" />
            </Link>
            <h1 className="text-3xl font-bold text-teal-900 tracking-tight">Settings</h1>
          </div>
          <Logo showText={true} />
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-teal-900/10">
            <h2 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-500" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
                <input
                  type="text"
                  disabled
                  value={user?.name || ''}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 bg-stone-50 text-stone-500 sm:text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 bg-stone-50 text-stone-500 sm:text-sm shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-stone-100">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-stone-500" />
              Subscription
            </h2>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900 capitalize">{user?.plan} Plan</p>
                <p className="text-sm text-stone-500 mt-1">You have {user?.credits} events remaining this month.</p>
              </div>
              <Link to="/pricing" className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors">
                Upgrade
              </Link>
            </div>
          </div>

          <div className="p-8 border-b border-stone-100">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-stone-500" />
              Integrations
            </h2>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900">Google Contacts</p>
                <p className="text-sm text-stone-500 mt-1">Sync your contacts to easily add events.</p>
              </div>
              {user?.hasGoogleContacts ? (
                <div className="flex items-center gap-2 text-teal-600 font-medium bg-teal-50 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  Connected
                </div>
              ) : (
                <button 
                  onClick={handleConnectGoogle}
                  className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Connect
                </button>
              )}
            </div>
          </div>

          <div className="p-8 border-b border-stone-100">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-stone-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <p className="font-medium text-stone-900">Push Notifications</p>
                  <p className="text-sm text-stone-500">Get notified 1 day before an event.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-rose-500" defaultChecked />
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-stone-300 cursor-pointer"></label>
                </div>
              </label>
              <label className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <p className="font-medium text-stone-900">Monthly Email Summary</p>
                  <p className="text-sm text-stone-500">Receive a summary of upcoming events.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-rose-500" defaultChecked />
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-stone-300 cursor-pointer"></label>
                </div>
              </label>
            </div>
          </div>

          <div className="p-8 border-b border-stone-100">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-stone-500" />
              Security & Privacy
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-xl transition-colors font-medium">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-xl transition-colors font-medium">
                Privacy Policy
              </button>
              <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
                Delete Account
              </button>
            </div>
          </div>

          <div className="p-8 bg-teal-50/50">
            <h2 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" />
              Admin Controls
            </h2>
            <div className="space-y-4">
              <Link to="/admin/payments" className="block w-full text-left px-4 py-3 text-teal-700 hover:bg-teal-100 rounded-xl transition-colors font-medium">
                Payment Gateways Configuration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
