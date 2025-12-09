import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function InnovationSubmitPage({ onClose }: { onClose?: () => void }) {
  const { accessToken } = useAuth();
  const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    introduction: '',
    description: '',
    technical_specifications: '',
    development_process: '',
    category: '',
    submitter_name: '',
    submitter_email: '',
    submitter_organization: '',
    submitter_area: '',
    evidence: '',
    regulatory_compliance: '',
    intellectual_property: '',
    manufacturing_and_quality_control: '',
    marketing_and_distribution: '',
    stakeholder_engagement: '',
    implementation_plan: '',
    financial_considerations: '',
  });
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [regulatoryFile, setRegulatoryFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setter(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v as any));
      if (attachmentFile) body.append('attachment', attachmentFile as File);
      if (evidenceFile) body.append('evidence_attachment', evidenceFile as File);
      if (regulatoryFile) body.append('regulatory_documents', regulatoryFile as File);

      const res = await fetch(`${API_BASE}/api/innovations/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      });
      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to submit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) return <div className="max-w-2xl mx-auto p-6">Submission successful.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Health Systems Innovation Appraisal Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Innovation Title *</label>
          <input name="title" required value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Introduction / Brief summary</label>
          <textarea name="introduction" value={formData.introduction} onChange={handleChange} rows={3} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Summary</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows={3} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Detailed Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Technical specifications</label>
          <textarea name="technical_specifications" value={formData.technical_specifications} onChange={handleChange} rows={4} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Development process (from concept to test and refinement)</label>
          <textarea name="development_process" value={formData.development_process} onChange={handleChange} rows={4} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Category</label>
          <input name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="submitter_name" placeholder="Your name" value={formData.submitter_name} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="submitter_email" placeholder="Email" value={formData.submitter_email} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="submitter_organization" placeholder="Organization" value={formData.submitter_organization} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="submitter_area" placeholder="Area/Region" value={formData.submitter_area} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm">Primary attachment (optional)</label>
          <input type="file" onChange={handleFile(setAttachmentFile)} />
        </div>

        <div>
          <label className="block text-sm">Evidence text</label>
          <textarea name="evidence" value={formData.evidence} onChange={handleChange} rows={3} className="w-full border px-3 py-2 rounded" />
          <label className="block text-sm mt-2">Evidence attachment (optional)</label>
          <input type="file" onChange={handleFile(setEvidenceFile)} />
        </div>

        <div>
          <label className="block text-sm">Regulatory compliance details</label>
          <textarea name="regulatory_compliance" value={formData.regulatory_compliance} onChange={handleChange} rows={3} className="w-full border px-3 py-2 rounded" />
          <label className="block text-sm mt-2">Regulatory documents (optional)</label>
          <input type="file" onChange={handleFile(setRegulatoryFile)} />
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-teal-600 text-white rounded">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
