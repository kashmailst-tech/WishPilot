import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function GoogleCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      
      if (!code) {
        setError('No authorization code found.');
        return;
      }

      try {
        const response = await fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            code,
            redirectUri: `${window.location.origin}/auth/callback/google`
          })
        });

        if (!response.ok) {
          throw new Error('Failed to connect Google account');
        }

        // Send message to opener window if it exists
        if (window.opener) {
          window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
          window.close();
        } else {
          navigate('/add-event');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    handleCallback();
  }, [location, navigate, token]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.close()}
            className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50">
      <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-teal-900">Connecting your Google account...</h2>
      <p className="text-teal-700/60 mt-2">This window will close automatically.</p>
    </div>
  );
}
