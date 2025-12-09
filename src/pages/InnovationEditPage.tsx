import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function InnovationEditPage({ id, onClose }: { id: number; onClose?: () => void }) {
  const { accessToken } = useAuth();
  const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/innovations/${id}/`, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileLocal = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, [key]: file });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const body = new FormData();
      const keys = ['title','summary','introduction','description','technical_specifications','development_process','category','submitter_name','submitter_email','submitter_organization','submitter_area','evidence','regulatory_compliance','intellectual_property','manufacturing_and_quality_control','marketing_and_distribution','stakeholder_engagement','implementation_plan','financial_considerations'];
      keys.forEach(k => body.append(k, formData[k] || ''));
      if (formData.attachment) body.append('attachment', formData.attachment);
      if (formData.evidence_attachment) body.append('evidence_attachment', formData.evidence_attachment);
      if (formData.regulatory_documents) body.append('regulatory_documents', formData.regulatory_documents);

      const res = await fetch(`${API_BASE}/api/innovations/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` },
        body
      });
      if (!res.ok) throw new Error('Save failed');
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Submission</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <textarea name="summary" value={formData.summary} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={6} />
        <input name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input name="submitter_name" value={formData.submitter_name} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="submitter_email" value={formData.submitter_email} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Attachment</label>
          <input type="file" onChange={handleFile} />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-teal-600 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
