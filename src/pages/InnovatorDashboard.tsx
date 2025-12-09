import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type Innovation = {
  id: number;
  title: string;
  status: string;
  created_at: string;
};

export default function InnovatorDashboard({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { accessToken } = useAuth();
  const [items, setItems] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/innovations/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">My Innovation Submissions</h1>
              <p className="text-white/90 mt-1">Submit new innovations and track the review status from one place.</p>
            </div>
            <div>
              <button onClick={() => onNavigate('submit-innovation')} className="px-4 py-2 bg-white text-teal-700 rounded-md font-semibold shadow">Submit New</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.length === 0 && <div className="text-gray-600">You have no submissions yet. Click "Submit New" to add one.</div>}
            {items.map((it) => (
              <div key={it.id} className="bg-white rounded-2xl shadow p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{it.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">Submitted: {new Date(it.created_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-sm px-3 py-1 rounded-full ${it.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : it.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{it.status}</div>
                  <button onClick={() => onNavigate(`edit-${it.id}`)} className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
