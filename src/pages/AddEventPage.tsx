import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Heart, User, Phone, Clock, MessageSquare, Image as ImageIcon, Users, Loader2, X, Search } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

interface GoogleContact {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
}

export default function AddEventPage() {
  const navigate = useNavigate();
  const { user, token, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    event_type: 'Birthday',
    event_date: '',
    preferred_time: '09:00',
    tone: 'Emotional',
    memory_notes: '',
    google_contact_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [contacts, setContacts] = useState<GoogleContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        refreshUser().then(() => {
          fetchContacts();
        });
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

  const fetchContacts = async () => {
    setLoadingContacts(true);
    setShowContactsModal(true);
    try {
      const res = await fetch('/api/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error('Failed to fetch contacts', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleOpenContacts = () => {
    if (user?.hasGoogleContacts) {
      fetchContacts();
    } else {
      handleConnectGoogle();
    }
  };

  const handleSelectContact = (contact: GoogleContact) => {
    setFormData(prev => ({
      ...prev,
      name: contact.name,
      phone: contact.phone,
      google_contact_id: contact.id
    }));
    setShowContactsModal(false);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        navigate('/dashboard');
      } else {
        alert('Failed to add event');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
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
            <h1 className="text-3xl font-bold text-teal-900 tracking-tight">Add New Event</h1>
          </div>
          <Logo showText={true} />
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-8">
          {/* Section 1: Basic Info */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-teal-900 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-500" />
                Who are we wishing?
              </h2>
              <button
                type="button"
                onClick={handleOpenContacts}
                className="flex items-center gap-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                {user?.hasGoogleContacts ? 'Select from Contacts' : 'Connect Google Contacts'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                  placeholder="e.g. Sunita"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  required
                  value={formData.relationship}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                  placeholder="e.g. Mother, Friend, Boss"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">WhatsApp Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* Section 2: Event Details */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              When is the event?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Event Type</label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm bg-white"
                >
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Wedding</option>
                  <option>Festival</option>
                  <option>Custom Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Date</label>
                <input
                  type="date"
                  name="event_date"
                  required
                  value={formData.event_date}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="time"
                    name="preferred_time"
                    required
                    value={formData.preferred_time}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* Section 3: AI Personalization */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              AI Personalization
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tone of Voice</label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm bg-white"
                >
                  <option>Emotional</option>
                  <option>Funny</option>
                  <option>Formal</option>
                  <option>Romantic</option>
                  <option>Spiritual</option>
                  <option>Motivational</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Memory Notes (Optional)</label>
                <textarea
                  name="memory_notes"
                  rows={3}
                  value={formData.memory_notes}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-stone-300 px-4 py-3 focus:border-rose-500 focus:ring-rose-500 sm:text-sm shadow-sm"
                  placeholder="e.g. Mention our trip to Goa last year, or how she always makes the best coffee."
                />
                <p className="mt-2 text-sm text-stone-500">Our AI will use this to make the message deeply personal.</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving Event...' : 'Save & Setup Automation'}
            </button>
          </div>
        </form>
      </div>
      {/* Google Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-teal-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                Select Contact
              </h3>
              <button 
                onClick={() => setShowContactsModal(false)}
                className="text-teal-900/40 hover:text-teal-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border border-stone-300 pl-10 pr-4 py-3 focus:border-teal-500 focus:ring-teal-500 sm:text-sm shadow-sm"
              />
            </div>

            <div className="flex-1 overflow-y-auto min-h-[300px] border border-stone-100 rounded-xl p-2">
              {loadingContacts ? (
                <div className="flex flex-col items-center justify-center h-full text-teal-700/60">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p>Loading contacts...</p>
                </div>
              ) : filteredContacts.length > 0 ? (
                <div className="space-y-1">
                  {filteredContacts.map(contact => (
                    <button
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-teal-50 rounded-xl transition-colors text-left"
                    >
                      {contact.photoUrl ? (
                        <img src={contact.photoUrl} alt={contact.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                          {contact.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-teal-900">{contact.name}</p>
                        <p className="text-sm text-teal-700/60">{contact.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-teal-700/60">
                  <p>No contacts found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
