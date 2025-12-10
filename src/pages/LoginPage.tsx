import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage({ onSuccess }: { onSuccess?: (user: any) => void }) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, any>>({});

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const keys = Object.keys(fieldErrors);
    if (keys.length === 0) return;
    const first = keys[0];
    const map: Record<string, HTMLInputElement | null> = {
      username: usernameRef.current,
      email: usernameRef.current,
      password: passwordRef.current,
    };
    const el = map[first];
    if (el) {
      el.focus();
      try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch {}
    }
  }, [fieldErrors]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});
    try {
      const userData = await login({ username, password });
      if (onSuccess) onSuccess(userData);
    } catch (err: any) {
      if (err && typeof err === 'object' && !('message' in err)) {
        setFieldErrors(err);
        const top = (err.non_field_errors && err.non_field_errors[0]) || err.detail || '';
        setError(top);
      } else {
        const parsed = typeof err === 'string' ? err : err?.message || JSON.stringify(err);
        setError(parsed || 'Login error');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch px-4">
        <div className="hidden md:flex flex-col justify-center rounded-2xl p-8 text-white bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <h2 className="text-3xl font-extrabold mb-4">Welcome Back</h2>
          <p className="text-white/90">Sign in to manage your innovation submissions, track reviews, and collaborate with the team.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('nav.login') || 'Login'}</h2>
          <form onSubmit={submit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
              <input ref={usernameRef} className="w-full border px-4 py-3 rounded-md" placeholder="Username or email" value={username} onChange={(e) => setUsername(e.target.value)} />
              {fieldErrors.username && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.username) ? fieldErrors.username.join(' ') : String(fieldErrors.username)}</div>}
              {fieldErrors.email && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.email) ? fieldErrors.email.join(' ') : String(fieldErrors.email)}</div>}
            </div>

            <div>
              <input ref={passwordRef} className="w-full border px-4 py-3 rounded-md" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {fieldErrors.password && <div className="text-xs text-red-600 mt-1">{Array.isArray(fieldErrors.password) ? fieldErrors.password.join(' ') : String(fieldErrors.password)}</div>}
            </div>

            <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-md shadow hover:opacity-95">
              {loading ? 'Signing in...' : t('nav.login') || 'Login'}
            </button>

            <div className="text-sm text-center text-gray-500">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); if (typeof (onSuccess) === 'function') {} }} className="text-teal-600 font-semibold">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
