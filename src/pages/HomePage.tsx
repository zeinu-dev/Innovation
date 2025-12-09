import { Lightbulb, BookOpen, FileText, Users, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Lightbulb className="text-teal-600" size={32} />,
      title: t('home.features.innovation.title'),
      description: t('home.features.innovation.description'),
      action: () => onNavigate('submit-innovation')
    },
    {
      icon: <BookOpen className="text-cyan-600" size={32} />,
      title: t('home.features.learning.title'),
      description: t('home.features.learning.description'),
      action: () => onNavigate('webinars')
    },
    {
      icon: <FileText className="text-blue-600" size={32} />,
      title: t('home.features.qi.title'),
      description: t('home.features.qi.description'),
      action: () => onNavigate('qi-projects')
    },
    {
      icon: <Users className="text-emerald-600" size={32} />,
      title: t('home.features.collaboration.title'),
      description: t('home.features.collaboration.description'),
      action: () => onNavigate('about')
    },
    {
      icon: <TrendingUp className="text-teal-700" size={32} />,
      title: t('home.features.change.title'),
      description: t('home.features.change.description'),
      action: () => onNavigate('change-package')
    },
    {
      icon: <Award className="text-cyan-700" size={32} />,
      title: t('home.features.research.title'),
      description: t('home.features.research.description'),
      action: () => onNavigate('researches')
    }
  ];

  const stats = [
    { number: '500+', label: t('home.stats.ideas') },
    { number: '200+', label: t('home.stats.projects') },
    { number: '50+', label: t('home.stats.facilities') },
    { number: '100+', label: t('home.stats.resources') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('home.welcomeTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('home.welcomeDescription')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">{t('home.ctaDescription')}</p>
          <button
            onClick={() => onNavigate('submit-innovation')}
            className="px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {t('home.ctaButton')}
          </button>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t('home.steps.submit')}</h3>
              <p className="text-gray-600">{t('home.features.innovation.description')}</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t('home.steps.review')}</h3>
              <p className="text-gray-600">{t('home.features.learning.description')}</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t('home.steps.implement')}</h3>
              <p className="text-gray-600">{t('home.features.change.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
