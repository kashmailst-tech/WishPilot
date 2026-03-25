import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Plus, Settings, LogOut, Heart, Image as ImageIcon, 
  MessageSquare, Clock, Bell, BarChart, Sparkles, CheckCircle, 
  AlertCircle, RefreshCw, Smartphone, Mail, LayoutTemplate, Trash2, CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format, addDays } from 'date-fns';
import Logo from '../components/Logo';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [wishes, setWishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const verifyCheckout = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      const success = urlParams.get('success');
      const gateway = urlParams.get('gateway');
      const planId = urlParams.get('planId');
      
      if (sessionId && success === 'true') {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch('/api/verify-checkout', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ sessionId, gateway, planId })
          });
          
          if (res.ok) {
            alert('Subscription successful! Your account has been upgraded.');
            // Remove query params
            window.history.replaceState({}, document.title, window.location.pathname);
            // Optionally refresh user data here
          }
        } catch (err) {
          console.error('Failed to verify checkout', err);
        }
      }
    };

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [eventsRes, wishesRes, notifRes] = await Promise.all([
          fetch('/api/events', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/wishes', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/notifications', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        if (eventsRes.ok && wishesRes.ok) {
          const eventsData = await eventsRes.json();
          const wishesData = await wishesRes.json();
          setEvents(eventsData.events);
          setWishes(wishesData.wishes);
        }
        if (notifRes.ok) {
          const notifData = await notifRes.json();
          setNotifications(notifData.notifications);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    
    verifyCheckout();
    fetchData();
  }, []);

  const handleMarkNotificationsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, read: 1 })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateWish = async (eventId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/generate-wish', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ eventId })
      });
      if (res.ok) {
        const data = await res.json();
        setWishes([data.wish, ...wishes]);
        alert('Wish generated and scheduled successfully!');
      } else {
        alert('Failed to generate wish. Make sure Gemini API is configured.');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating wish');
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== eventId));
        setWishes(wishes.filter(w => w.event_id !== eventId));
      } else {
        alert('Failed to delete event.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting event');
    }
  };

  return (
    <div className="min-h-screen bg-water text-teal-900 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 backdrop-blur-md border-r border-teal-900/10 hidden md:flex flex-col">
        <div className="p-6">
          <Logo showText={true} />
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-teal-50 text-teal-900' : 'text-teal-700/70 hover:bg-white/50 hover:text-teal-900'}`}>
            <Calendar className="w-5 h-5" />
            Dashboard
          </button>
          <button onClick={() => setActiveTab('events')} className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-colors ${activeTab === 'events' ? 'bg-teal-50 text-teal-900' : 'text-teal-700/70 hover:bg-white/50 hover:text-teal-900'}`}>
            <Plus className="w-5 h-5" />
            Event Management
          </button>
          <button onClick={() => setActiveTab('templates')} className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-colors ${activeTab === 'templates' ? 'bg-teal-50 text-teal-900' : 'text-teal-700/70 hover:bg-white/50 hover:text-teal-900'}`}>
            <LayoutTemplate className="w-5 h-5" />
            Message Library
          </button>
          <button onClick={() => setActiveTab('insights')} className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-colors ${activeTab === 'insights' ? 'bg-teal-50 text-teal-900' : 'text-teal-700/70 hover:bg-white/50 hover:text-teal-900'}`}>
            <BarChart className="w-5 h-5" />
            Relationship Insights
          </button>
          <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-colors ${activeTab === 'billing' ? 'bg-teal-50 text-teal-900' : 'text-teal-700/70 hover:bg-white/50 hover:text-teal-900'}`}>
            <Heart className="w-5 h-5" />
            Billing & Plan
          </button>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-teal-700/70 hover:bg-white/50 hover:text-teal-900 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-teal-900/10">
          <div className="mb-4 px-4">
            <p className="text-sm font-bold text-teal-900">{user?.name}</p>
            <p className="text-xs text-teal-700/70">{user?.email}</p>
            <div className="mt-2 text-xs font-bold px-2 py-1 bg-gradient-to-r from-teal-400 to-lavender-500 text-white rounded-md inline-block uppercase tracking-wider">
              {user?.plan} Plan
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-teal-700/70 hover:bg-white/50 hover:text-teal-900 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-teal-900">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="text-teal-700/70 mt-1">Your relationship automation center.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 bg-white/60 backdrop-blur-sm rounded-full text-teal-900 hover:bg-white transition-colors relative shadow-sm"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
                
                {/* Notification Center Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-teal-900/10 z-50 overflow-hidden">
                    <div className="p-4 border-b border-teal-900/10 flex justify-between items-center bg-teal-50/50">
                      <h3 className="font-bold text-teal-900">Notifications</h3>
                      <button onClick={handleMarkNotificationsRead} className="text-xs text-teal-600 hover:text-teal-800 font-medium">Mark all read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-teal-700/60">No notifications</div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-teal-900/5 hover:bg-teal-50/30 transition-colors flex gap-3 cursor-pointer ${!notif.read ? 'bg-teal-50/20' : ''}`}>
                            <div className="mt-0.5">
                              {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                              {notif.type === 'alert' && <AlertCircle className="w-5 h-5 text-rose-500" />}
                              {notif.type === 'info' && <Sparkles className="w-5 h-5 text-lavender-500" />}
                            </div>
                            <div>
                              <p className="text-sm text-teal-900 font-medium">{notif.message}</p>
                              <p className="text-xs text-teal-700/60 mt-1">{format(new Date(notif.created_at), 'MMM dd, HH:mm')}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/add-event" className="bg-gradient-to-r from-teal-500 to-lavender-500 text-white px-5 py-2.5 rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Event
              </Link>
            </div>
          </header>

          {loading ? (
            <div className="text-center py-12 text-teal-700/60">Loading your dashboard...</div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Quick Actions & Discovery */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between group cursor-pointer">
                      <div>
                        <h3 className="font-bold text-teal-900 mb-1">Smart Calendar Sync</h3>
                        <p className="text-sm text-teal-700/70">Connect Google Calendar</p>
                      </div>
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between group cursor-pointer">
                      <div>
                        <h3 className="font-bold text-teal-900 mb-1">Automation Control</h3>
                        <p className="text-sm text-teal-700/70">Fully Auto • Active</p>
                      </div>
                      <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center text-lavender-600 group-hover:scale-110 transition-transform">
                        <Settings className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between group cursor-pointer bg-gradient-to-br from-teal-50 to-lavender-50">
                      <div>
                        <h3 className="font-bold text-teal-900 mb-1">Occasion Discovery</h3>
                        <p className="text-sm text-teal-700/70">3 new events found</p>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform shadow-sm">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Reminder Preview System */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-teal-900">
                          <Calendar className="w-5 h-5 text-teal-500" />
                          Upcoming Scheduled Wishes
                        </h2>
                        <button className="text-sm font-medium text-teal-600 hover:text-teal-800">View Timeline</button>
                      </div>
                      
                      {events.length === 0 ? (
                        <div className="glass-card rounded-3xl p-8 text-center">
                          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-teal-400" />
                          </div>
                          <h3 className="text-lg font-bold text-teal-900 mb-2">No upcoming wishes</h3>
                          <p className="text-teal-700/70 mb-6">Add your first event to start automating your wishes.</p>
                          <Link to="/add-event" className="bg-teal-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-800 transition-colors inline-flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add Event
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {events.map(event => (
                            <div key={event.id} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-teal-100 to-lavender-100 text-teal-900 rounded-2xl flex flex-col items-center justify-center font-bold shadow-inner">
                                  <span className="text-sm uppercase tracking-wider">{format(new Date(event.event_date + 'T00:00:00'), 'MMM')}</span>
                                  <span className="text-xl leading-none">{format(new Date(event.event_date + 'T00:00:00'), 'dd')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {event.photo_url ? (
                                    <img src={event.photo_url} alt={event.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-teal-100" referrerPolicy="no-referrer" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0 border border-teal-200">
                                      {event.name ? event.name.charAt(0).toUpperCase() : '?'}
                                    </div>
                                  )}
                                  <div>
                                    <h3 className="text-lg font-bold text-teal-900">{event.name}'s {event.event_type}</h3>
                                    <p className="text-teal-700/70 text-sm flex items-center gap-2">
                                      <span className="bg-teal-50 px-2 py-0.5 rounded text-teal-800 font-medium">{event.relationship}</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.preferred_time}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Edit AI Personalization">
                                  <Sparkles className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Preview Multi-Platform Message">
                                  <Smartphone className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={() => handleGenerateWish(event.id)}
                                  className="bg-teal-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors flex-1 sm:flex-none"
                                >
                                  Generate Now
                                </button>
                                <button 
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors" 
                                  title="Delete Event"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Recent Wishes & AI Images */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold flex items-center gap-2 text-teal-900">
                        <ImageIcon className="w-5 h-5 text-lavender-500" />
                        Recent AI Greetings
                      </h2>
                      <div className="space-y-4">
                        {wishes.length === 0 ? (
                          <div className="glass-card rounded-3xl p-6 text-center text-teal-700/70 text-sm">
                            No wishes generated yet.
                          </div>
                        ) : (
                          wishes.map(wish => (
                            <div key={wish.id} className="glass-card rounded-2xl overflow-hidden group">
                              {wish.image_url && (
                                <div className="relative">
                                  <img src={wish.image_url} alt="Generated Wish" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/30">Edit Image</button>
                                  </div>
                                </div>
                              )}
                              <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">{wish.event_name}</span>
                                  <div className="flex items-center gap-2">
                                    {wish.status === 'scheduled' && (
                                      <button 
                                        onClick={async () => {
                                          try {
                                            const token = localStorage.getItem('token');
                                            const res = await fetch(`/api/wishes/${wish.id}/send`, {
                                              method: 'POST',
                                              headers: { Authorization: `Bearer ${token}` }
                                            });
                                            if (res.ok) {
                                              alert('Wish sent successfully!');
                                              setWishes(wishes.map(w => w.id === wish.id ? { ...w, status: 'delivered' } : w));
                                            } else {
                                              alert('Failed to send wish');
                                            }
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                        className="text-xs font-bold px-2 py-1 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 transition-colors"
                                      >
                                        Send Now
                                      </button>
                                    )}
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${wish.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : wish.status === 'failed' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                      <CheckCircle className="w-3 h-3" /> {wish.status}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-teal-800/80 line-clamp-3 mb-3 italic">"{wish.message}"</p>
                                <div className="text-xs text-teal-700/60 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Delivered {format(new Date(wish.scheduled_for), 'MMM dd, HH:mm')}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-teal-900 mb-6">Relationship Insights</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-teal-800 mb-4">Needs Attention</h3>
                      <div className="space-y-3">
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <p className="font-bold text-rose-900">Michael (Brother)</p>
                            <p className="text-xs text-rose-700/70">No contact in 6 months</p>
                          </div>
                          <button className="text-sm bg-white text-rose-600 px-3 py-1.5 rounded-full font-medium shadow-sm">Send "Thinking of you"</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-800 mb-4">Engagement Stats</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-teal-700">Family</span>
                            <span className="font-bold text-teal-900">65%</span>
                          </div>
                          <div className="w-full bg-teal-100 rounded-full h-2">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-teal-700">Friends</span>
                            <span className="font-bold text-teal-900">25%</span>
                          </div>
                          <div className="w-full bg-teal-100 rounded-full h-2">
                            <div className="bg-lavender-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-teal-700">Colleagues</span>
                            <span className="font-bold text-teal-900">10%</span>
                          </div>
                          <div className="w-full bg-teal-100 rounded-full h-2">
                            <div className="bg-aqua-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'billing' && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-teal-900 mb-6">Billing & Plan</h2>
                  <div className="bg-white/60 p-6 rounded-2xl border border-teal-900/10 mb-8 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-1">Current Plan</p>
                      <h3 className="text-3xl font-bold text-teal-900 capitalize">{user?.plan || 'Free'} Plan</h3>
                      <p className="text-teal-700/70 mt-2">
                        {user?.plan === 'free' ? 'You are currently on the free tier.' : 'Your subscription is active.'}
                      </p>
                    </div>
                    <div>
                      {user?.plan === 'free' ? (
                        <Link to="/pricing" className="bg-teal-900 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-800 transition-colors inline-block">
                          Upgrade Plan
                        </Link>
                      ) : (
                        <div className="flex flex-col gap-3 items-end">
                          <Link to="/pricing" className="bg-teal-100 text-teal-900 px-6 py-3 rounded-full font-bold hover:bg-teal-200 transition-colors inline-block">
                            Change Plan
                          </Link>
                          <button 
                            onClick={async () => {
                              if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features immediately.')) {
                                try {
                                  const token = localStorage.getItem('token');
                                  const res = await fetch('/api/subscription/cancel', {
                                    method: 'POST',
                                    headers: { Authorization: `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    alert('Subscription cancelled successfully.');
                                    window.location.reload();
                                  }
                                } catch (err) {
                                  console.error(err);
                                }
                              }
                            }}
                            className="text-sm text-rose-600 hover:text-rose-800 font-medium"
                          >
                            Cancel Subscription
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/40 p-6 rounded-2xl border border-teal-900/5">
                      <h4 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        Payment Method
                      </h4>
                      {user?.plan === 'free' ? (
                        <p className="text-sm text-teal-700/70">No payment method on file.</p>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-teal-900 capitalize">Connected via {user?.payment_gateway || 'Stripe'}</p>
                          <p className="text-xs text-teal-700/60 mt-1">Billed automatically</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-white/40 p-6 rounded-2xl border border-teal-900/5">
                      <h4 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-teal-600" />
                        Billing History
                      </h4>
                      <p className="text-sm text-teal-700/70">No recent invoices.</p>
                    </div>
                  </div>
                </div>
              )}

              {(activeTab === 'events' || activeTab === 'templates') && (
                <div className="glass-card rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-teal-900 mb-2">Module in Development</h2>
                  <p className="text-teal-700/70 max-w-md mx-auto">This advanced feature is currently being rolled out to users. Check back soon for full access.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
