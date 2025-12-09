import { useEffect, useState } from 'react';
import { Play, FileText, Video, Microscope, Award, Calendar, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InnovationIdea } from '../types';

interface LearningPageProps {
  type: 'change-package' | 'webinars' | 'documentaries' | 'innovation-list' | 'researches';
}

export default function LearningPage({ type }: LearningPageProps) {
  const [innovations, setInnovations] = useState<InnovationIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === 'innovation-list') {
      fetchAcceptedInnovations();
    } else {
      setLoading(false);
    }
  }, [type]);

  const fetchAcceptedInnovations = async () => {
    try {
      const { data, error } = await supabase
        .from('innovation_ideas')
        .select('*')
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInnovations(data || []);
    } catch (error) {
      console.error('Error fetching innovations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPageConfig = () => {
    switch (type) {
      case 'change-package':
        return {
          title: 'Change Packages',
          icon: <FileText size={40} />,
          description: 'Comprehensive guides and tools for implementing healthcare process improvements',
          items: [
            { title: 'Infection Prevention Change Package', date: '2024', description: 'Evidence-based strategies for reducing healthcare-associated infections' },
            { title: 'Patient Safety Culture Transformation', date: '2024', description: 'Tools and methods for building a robust safety culture' },
            { title: 'Emergency Department Flow Optimization', date: '2023', description: 'Proven techniques to improve ED efficiency and patient experience' },
            { title: 'Medication Safety Enhancement Package', date: '2023', description: 'Comprehensive approach to reducing medication errors' }
          ]
        };
      case 'webinars':
        return {
          title: 'Recorded Webinars',
          icon: <Video size={40} />,
          description: 'Educational sessions from healthcare quality and safety experts',
          items: [
            { title: 'Quality Improvement Fundamentals', date: '2024-10', description: 'Introduction to QI methodologies and tools for healthcare professionals', duration: '1h 30m' },
            { title: 'Patient Safety Innovations', date: '2024-09', description: 'Latest innovations in patient safety from leading healthcare institutions', duration: '1h 15m' },
            { title: 'Data-Driven Healthcare Improvement', date: '2024-08', description: 'Using analytics and metrics to drive quality improvement initiatives', duration: '1h 45m' },
            { title: 'Leadership in Healthcare Quality', date: '2024-07', description: 'Developing leadership skills for quality improvement champions', duration: '1h 20m' }
          ]
        };
      case 'documentaries':
        return {
          title: 'Quality & Safety Documentaries',
          icon: <Play size={40} />,
          description: 'Real stories of healthcare transformation and quality improvement',
          items: [
            { title: 'The Journey to Zero Harm', date: '2024', description: 'Following hospitals on their path to eliminating preventable patient harm', duration: '45m' },
            { title: 'Innovation in Action', date: '2023', description: 'How healthcare innovations are changing patient outcomes nationwide', duration: '52m' },
            { title: 'Culture of Safety', date: '2023', description: 'Building and sustaining safety cultures in healthcare organizations', duration: '38m' },
            { title: 'Quality Champions', date: '2023', description: 'Stories from frontline healthcare workers driving quality improvement', duration: '41m' }
          ]
        };
      case 'researches':
        return {
          title: 'Research Publications',
          icon: <Microscope size={40} />,
          description: 'Evidence-based research and studies in healthcare quality and innovation',
          items: [
            { title: 'Impact of QI Interventions on Patient Outcomes', date: '2024', description: 'Meta-analysis of quality improvement initiatives across 200+ facilities', authors: 'Dr. Smith et al.' },
            { title: 'Healthcare Innovation Adoption Patterns', date: '2024', description: 'Study on factors influencing successful implementation of innovations', authors: 'Dr. Johnson et al.' },
            { title: 'Patient Safety Culture Assessment Tools', date: '2023', description: 'Validation of measurement instruments for safety culture', authors: 'Dr. Williams et al.' },
            { title: 'Cost-Effectiveness of QI Programs', date: '2023', description: 'Economic evaluation of quality improvement initiatives', authors: 'Dr. Brown et al.' }
          ]
        };
      default:
        return {
          title: 'Innovation List',
          icon: <Award size={40} />,
          description: 'Accepted and implemented innovation ideas from healthcare professionals',
          items: []
        };
    }
  };

  const config = getPageConfig();

  if (type === 'innovation-list') {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-6">
              {config.icon}
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{config.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{config.description}</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
            </div>
          ) : innovations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Award className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-xl text-gray-600">No accepted innovations yet. Be the first to submit!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {innovations.map((innovation) => (
                <div key={innovation.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Accepted
                    </span>
                    <Award className="text-teal-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{innovation.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{innovation.description}</p>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-semibold mr-2">Category:</span>
                      <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded">{innovation.category}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-semibold mr-2">Submitted by:</span>
                      <span>{innovation.submitter_name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-semibold mr-2">Organization:</span>
                      <span>{innovation.submitter_organization}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-6 text-white">
            {config.icon}
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{config.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{config.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-100 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors flex-1">
                  {item.title}
                </h3>
                <Download className="text-gray-400 group-hover:text-teal-600 transition-colors" size={24} />
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>{item.date}</span>
                </div>
                {item.duration && (
                  <div className="flex items-center text-gray-500">
                    <Play size={16} className="mr-2" />
                    <span>{item.duration}</span>
                  </div>
                )}
                {item.authors && (
                  <div className="flex items-center text-gray-500">
                    <Microscope size={16} className="mr-2" />
                    <span>{item.authors}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="text-teal-600 font-semibold hover:text-teal-700 transition-colors flex items-center">
                  View Details
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
