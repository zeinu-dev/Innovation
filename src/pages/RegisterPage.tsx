import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

export default function RegisterPage({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, any>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});
    try {
      await register({ username, email, password, first_name: firstName, last_name: lastName });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      if (err && typeof err === 'object' && !('message' in err)) {
        setFieldErrors(err);
        const top = (err.non_field_errors && err.non_field_errors[0]) || err.detail || '';
        setError(top);
      } else {
        const parsed = typeof err === 'string' ? err : err?.message || JSON.stringify(err);
        setError(parsed || 'Registration error');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="hidden md:flex flex-col justify-center rounded-2xl p-8 text-white bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <h2 className="text-3xl font-extrabold mb-4">Create an Account</h2>
          <p className="text-white/90">Join the Health System Innovation platform to submit ideas, track reviews, and collaborate with peers.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('nav.register') || 'Register'}</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <input className="border px-3 py-2 rounded-md" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className="border px-3 py-2 rounded-md" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input className="w-full border px-4 py-3 rounded-md" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="w-full border px-4 py-3 rounded-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full border px-4 py-3 rounded-md" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <div className="text-sm text-red-600">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

            <div className="space-y-2">
              <div>
                {fieldErrors.first_name && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.first_name) ? fieldErrors.first_name.join(' ') : String(fieldErrors.first_name)}</div>}
              </div>
              <div>
                {fieldErrors.last_name && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.last_name) ? fieldErrors.last_name.join(' ') : String(fieldErrors.last_name)}</div>}
              </div>
              <div>
                {fieldErrors.username && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.username) ? fieldErrors.username.join(' ') : String(fieldErrors.username)}</div>}
              </div>
              <div>
                {fieldErrors.email && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.email) ? fieldErrors.email.join(' ') : String(fieldErrors.email)}</div>}
              </div>
              <div>
                {fieldErrors.password && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.password) ? fieldErrors.password.join(' ') : String(fieldErrors.password)}</div>}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-md shadow hover:opacity-95">
              {loading ? 'Creating...' : t('nav.register') || 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
