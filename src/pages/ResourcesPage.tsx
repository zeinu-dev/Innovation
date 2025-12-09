import { FileText, Folder, BookOpen, Package, Download, ExternalLink } from 'lucide-react';

interface ResourcesPageProps {
  type: 'documents' | 'qi-projects' | 'case-studies' | 'change-packages';
}

export default function ResourcesPage({ type }: ResourcesPageProps) {
  const getPageConfig = () => {
    switch (type) {
      case 'documents':
        return {
          title: 'Documents',
          icon: <FileText size={40} />,
          description: 'Essential documents, guidelines, and resources for healthcare quality improvement',
          items: [
            { title: 'Quality Improvement Toolkit', category: 'Toolkit', size: '2.5 MB', format: 'PDF', description: 'Comprehensive guide with tools and templates for QI projects' },
            { title: 'Patient Safety Guidelines 2024', category: 'Guidelines', size: '1.8 MB', format: 'PDF', description: 'Updated national guidelines for patient safety protocols' },
            { title: 'Healthcare Innovation Framework', category: 'Framework', size: '3.2 MB', format: 'PDF', description: 'Structured approach to developing and implementing innovations' },
            { title: 'Quality Metrics Dashboard Template', category: 'Template', size: '850 KB', format: 'XLSX', description: 'Ready-to-use Excel template for tracking quality metrics' },
            { title: 'Root Cause Analysis Handbook', category: 'Handbook', size: '2.1 MB', format: 'PDF', description: 'Step-by-step guide for conducting effective RCA' },
            { title: 'Infection Control Standards', category: 'Standards', size: '1.5 MB', format: 'PDF', description: 'Current standards for infection prevention and control' }
          ]
        };
      case 'qi-projects':
        return {
          title: 'QI Projects',
          icon: <Folder size={40} />,
          description: 'Quality Improvement projects from healthcare facilities nationwide',
          items: [
            { title: 'Reducing Central Line Infections', facility: 'City General Hospital', year: '2024', impact: '65% reduction', description: 'Implementation of evidence-based bundle to reduce CLABSIs' },
            { title: 'Emergency Department Wait Time Reduction', facility: 'Regional Medical Center', year: '2024', impact: '40% improvement', description: 'Process optimization and flow management strategies' },
            { title: 'Medication Error Prevention Program', facility: 'University Hospital', year: '2023', impact: '78% reduction', description: 'Multi-faceted approach to eliminating medication errors' },
            { title: 'Patient Fall Prevention Initiative', facility: 'Community Health Center', year: '2023', impact: '55% reduction', description: 'Comprehensive fall prevention program implementation' },
            { title: 'Surgical Site Infection Reduction', facility: 'Surgical Specialty Hospital', year: '2023', impact: '72% reduction', description: 'Evidence-based perioperative care bundle' },
            { title: 'Sepsis Early Recognition & Response', facility: 'Metro Hospital', year: '2024', impact: '83% improvement', description: 'Rapid response system for sepsis identification' }
          ]
        };
      case 'case-studies':
        return {
          title: 'QI Project Case Studies',
          icon: <BookOpen size={40} />,
          description: 'In-depth analysis of successful quality improvement implementations',
          items: [
            { title: 'Transforming Discharge Processes', facility: 'National Medical Center', duration: '12 months', outcome: 'Success', description: 'Reducing readmission rates through improved discharge planning and patient education' },
            { title: 'Handoff Communication Excellence', facility: 'Children\'s Hospital', duration: '8 months', outcome: 'Success', description: 'Standardizing clinical handoffs to improve patient safety' },
            { title: 'Pain Management Optimization', facility: 'Regional Pain Center', duration: '10 months', outcome: 'Success', description: 'Multimodal approach to effective pain management' },
            { title: 'Laboratory Turnaround Time Improvement', facility: 'Diagnostic Center', duration: '6 months', outcome: 'Success', description: 'Process redesign to accelerate test result delivery' },
            { title: 'Staff Engagement in Safety Culture', facility: 'Community Hospital Network', duration: '18 months', outcome: 'Success', description: 'Building a culture where safety is everyone\'s responsibility' },
            { title: 'Telehealth Integration Success', facility: 'Rural Health Network', duration: '14 months', outcome: 'Success', description: 'Expanding access through telehealth services' }
          ]
        };
      case 'change-packages':
        return {
          title: 'QI Change Packages',
          icon: <Package size={40} />,
          description: 'Ready-to-implement change packages for healthcare process improvements',
          items: [
            { title: 'Hand Hygiene Improvement Bundle', components: '12 interventions', evidence: 'High', description: 'Proven strategies to increase hand hygiene compliance rates' },
            { title: 'Antibiotic Stewardship Package', components: '15 interventions', evidence: 'High', description: 'Comprehensive approach to optimizing antibiotic use' },
            { title: 'Patient Experience Enhancement', components: '10 interventions', evidence: 'Moderate', description: 'Strategies to improve patient satisfaction and engagement' },
            { title: 'Pressure Ulcer Prevention Bundle', components: '8 interventions', evidence: 'High', description: 'Evidence-based interventions to prevent pressure injuries' },
            { title: 'Surgical Safety Checklist Package', components: '14 interventions', evidence: 'High', description: 'Comprehensive surgical safety improvement tools' },
            { title: 'Diabetes Care Optimization', components: '11 interventions', evidence: 'Moderate', description: 'Integrated approach to diabetes management' }
          ]
        };
      default:
        return { title: '', icon: null, description: '', items: [] };
    }
  };

  const config = getPageConfig();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-6 text-white">
            {config.icon}
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{config.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{config.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-cyan-600 transition-colors pr-2">
                  {item.title}
                </h3>
                {type === 'documents' ? (
                  <Download className="text-gray-400 group-hover:text-cyan-600 transition-colors flex-shrink-0" size={20} />
                ) : (
                  <ExternalLink className="text-gray-400 group-hover:text-cyan-600 transition-colors flex-shrink-0" size={20} />
                )}
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>

              <div className="space-y-2 text-sm">
                {type === 'documents' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Format:</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{item.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span className="font-medium text-gray-700">{item.size}</span>
                    </div>
                  </>
                )}

                {type === 'qi-projects' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Facility:</span>
                      <span className="font-medium text-gray-700 text-right">{item.facility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year:</span>
                      <span className="font-medium text-gray-700">{item.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Impact:</span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold">{item.impact}</span>
                    </div>
                  </>
                )}

                {type === 'case-studies' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Facility:</span>
                      <span className="font-medium text-gray-700 text-right text-xs">{item.facility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{item.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Outcome:</span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold">{item.outcome}</span>
                    </div>
                  </>
                )}

                {type === 'change-packages' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Components:</span>
                      <span className="font-medium text-gray-700">{item.components}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Evidence Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.evidence === 'High' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>{item.evidence}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors flex items-center text-sm">
                  {type === 'documents' ? 'Download' : 'View Details'}
                  <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
