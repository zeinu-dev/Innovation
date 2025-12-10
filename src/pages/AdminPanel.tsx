import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, CheckCircle, XCircle, Clock, FileText, Users, BarChart3 } from 'lucide-react';

type Innovation = {
  id: number;
  title: string;
  status: string;
  submitter: number;
  introduction: string;
  description: string;
  development_process: string;
  evidence: string;
  evidence_attachment: string | null;
  regulatory_compliance: string;
  regulatory_documents: string | null;
  intellectual_property: string;
  manufacturing_and_quality_control: string;
  marketing_and_distribution: string;
  stakeholder_engagement: string;
  implementation_plan: string;
  financial_considerations: string;
  created_at: string;
  updated_at: string;
};

export default function AdminPanel() {
  const { accessToken } = useAuth();
  const [items, setItems] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [accessToken]);

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

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/innovations/${id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setItems((s) => s.map((it) => (it.id === id ? updated : it)));
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      pending: 'Pending',
      under_review: 'Under Review',
      approved: 'Approved',
      rejected: 'Rejected',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const viewDetails = (innovation: Innovation) => {
    setSelectedInnovation(innovation);
    setViewModalOpen(true);
  };

  const stats = {
    total: items.length,
    pending: items.filter(i => i.status === 'pending').length,
    approved: items.filter(i => i.status === 'approved').length,
    rejected: items.filter(i => i.status === 'rejected').length,
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading admin panel...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 rounded-2xl p-8 text-white shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">Admin Panel</h1>
              <p className="text-white/90 mt-2">Manage and review innovation submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Innovation Submissions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitter ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium">No innovations submitted yet</p>
                    </td>
                  </tr>
                ) : (
                  items.map((innovation) => (
                    <tr key={innovation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">#{innovation.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{innovation.title}</div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{innovation.introduction}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">User #{innovation.submitter}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(innovation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(innovation.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewDetails(innovation)}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          {innovation.status !== 'approved' && (
                            <button
                              onClick={() => updateStatus(innovation.id, 'approved')}
                              className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {innovation.status !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(innovation.id, 'rejected')}
                              className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {viewModalOpen && selectedInnovation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-600 text-white p-6 rounded-t-2xl z-10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-semibold text-white/70 mb-1">Innovation ID #{selectedInnovation.id}</div>
                  <h2 className="text-2xl font-bold">{selectedInnovation.title}</h2>
                  <div className="mt-3 flex items-center gap-3">
                    {getStatusBadge(selectedInnovation.status)}
                    <span className="text-sm text-white/80">Submitted by User #{selectedInnovation.submitter}</span>
                  </div>
                </div>
                <button onClick={() => setViewModalOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {selectedInnovation.introduction && (
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Introduction</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.introduction}</p>
                </div>
              )}

              {selectedInnovation.description && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.description}</p>
                </div>
              )}

              {selectedInnovation.development_process && (
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Process</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.development_process}</p>
                </div>
              )}

              {selectedInnovation.evidence && (
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence of Safety & Efficacy</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.evidence}</p>
                  {selectedInnovation.evidence_attachment && (
                    <a href={selectedInnovation.evidence_attachment} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium">
                      <FileText className="h-4 w-4 mr-1" />
                      View Evidence Attachment
                    </a>
                  )}
                </div>
              )}

              {selectedInnovation.regulatory_compliance && (
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.regulatory_compliance}</p>
                  {selectedInnovation.regulatory_documents && (
                    <a href={selectedInnovation.regulatory_documents} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium">
                      <FileText className="h-4 w-4 mr-1" />
                      View Regulatory Documents
                    </a>
                  )}
                </div>
              )}

              {selectedInnovation.intellectual_property && (
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intellectual Property</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.intellectual_property}</p>
                </div>
              )}

              {selectedInnovation.manufacturing_and_quality_control && (
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manufacturing & Quality Control</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.manufacturing_and_quality_control}</p>
                </div>
              )}

              {selectedInnovation.marketing_and_distribution && (
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing & Distribution</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.marketing_and_distribution}</p>
                </div>
              )}

              {selectedInnovation.stakeholder_engagement && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stakeholder Engagement</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.stakeholder_engagement}</p>
                </div>
              )}

              {selectedInnovation.implementation_plan && (
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Plan</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.implementation_plan}</p>
                </div>
              )}

              {selectedInnovation.financial_considerations && (
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Considerations</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInnovation.financial_considerations}</p>
                </div>
              )}

              <div className="border-t pt-6 flex gap-3">
                <button
                  onClick={() => {
                    updateStatus(selectedInnovation.id, 'approved');
                    setViewModalOpen(false);
                  }}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approve Innovation
                </button>
                <button
                  onClick={() => {
                    updateStatus(selectedInnovation.id, 'rejected');
                    setViewModalOpen(false);
                  }}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Reject Innovation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
