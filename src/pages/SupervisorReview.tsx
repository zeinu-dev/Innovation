import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type Innovation = {
  id: number;
  title: string;
  status: string;
  score?: number;
  feedback?: string;
  submitter: number;
};

export default function SupervisorReview() {
  const { accessToken } = useAuth();
  const [items, setItems] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/innovations/', { headers: { Authorization: `Bearer ${accessToken}` } });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [accessToken]);

  const update = async (id: number, payload: any) => {
    try {
      const res = await fetch(`/api/innovations/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setItems((s) => s.map((it) => (it.id === id ? updated : it)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Supervisor Review</h2>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <div className="text-sm text-gray-500">Status: {it.status}</div>
              </div>
              <div className="w-64">
                <div className="mb-2">
                  <label className="block text-xs">Status</label>
                  <select defaultValue={it.status} onChange={(e) => update(it.id, { status: e.target.value })} className="w-full border px-2 py-1 rounded">
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-xs">Score</label>
                  <input type="number" step="0.1" defaultValue={it.score ?? ''} onBlur={(e) => update(it.id, { score: Number(e.target.value) })} className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block text-xs">Feedback</label>
                  <textarea defaultValue={it.feedback ?? ''} onBlur={(e) => update(it.id, { feedback: e.target.value })} className="w-full border px-2 py-1 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
