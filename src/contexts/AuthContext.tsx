import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
};

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  login: (credentials: { username: string; password: string }) => Promise<User>;
  register: (payload: { username: string; email: string; password: string; first_name?: string; last_name?: string }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // API base — when developing locally, set VITE_API_BASE_URL=http://127.0.0.1:8000
  const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('access_token'));

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  useEffect(() => {
    if (accessToken) localStorage.setItem('access_token', accessToken);
    else localStorage.removeItem('access_token');
  }, [accessToken]);

  const login = async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (err) {
      // res.json() can fail if the body isn't valid JSON or was already read.
      // Use a cloned response to safely read the text fallback without re-consuming the original stream.
      try {
        const text = await res.clone().text();
        const fallback = (text && text.length) ? text : (res.statusText || `HTTP ${res.status}`);
        if (!res.ok) throw { non_field_errors: [fallback] };
        throw { detail: 'Login succeeded but server returned no JSON' };
      } catch (e) {
        const fallback = res.statusText || `HTTP ${res.status}`;
        throw { non_field_errors: [fallback] };
      }
    }
    if (!res.ok) throw data;
    setUser(data.user);
    setAccessToken(data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data.user;
  };

  const register = async (payload: { username: string; email: string; password: string; first_name?: string; last_name?: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (err) {
      try {
        const text = await res.clone().text();
        const fallback = (text && text.length) ? text : (res.statusText || `HTTP ${res.status}`);
        if (!res.ok) throw { non_field_errors: [fallback] };
        throw { detail: 'Registration succeeded but server returned no JSON' };
      } catch (e) {
        const fallback = res.statusText || `HTTP ${res.status}`;
        throw { non_field_errors: [fallback] };
      }
    }
    if (!res.ok) throw data;
    setUser(data.user);
    setAccessToken(data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default AuthContext;
