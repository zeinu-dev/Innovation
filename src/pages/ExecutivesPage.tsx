import { useState } from 'react';
import { User, Award, Target, Users, Briefcase, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ExecutivesPage() {
  const { t } = useLanguage();

  const desks = [
    {
      icon: <Award className="text-teal-600" size={28} />,
      title: t('desks.quality.title'),
      description: t('desks.quality.description')
    },
    {
      icon: <Target className="text-cyan-600" size={28} />,
      title: t('desks.innovation.title'),
      description: t('desks.innovation.description')
    },
    {
      icon: <Users className="text-blue-600" size={28} />,
      title: t('desks.patientSafety.title'),
      description: t('desks.patientSafety.description')
    },
    {
      icon: <Briefcase className="text-emerald-600" size={28} />,
      title: t('desks.rnd.title'),
      description: t('desks.rnd.description')
    },
    {
      icon: <Building2 className="text-teal-700" size={28} />,
      title: t('desks.training.title'),
      description: t('desks.training.description')
    },
    {
      icon: <User className="text-cyan-700" size={28} />,
      title: t('desks.monitoring.title'),
      description: t('desks.monitoring.description')
    }
  ];

  const [activeTab, setActiveTab] = useState<'Executives' | 'Leaders'>('Leaders');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{t('pages.leadership')}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-full shadow-sm inline-flex overflow-hidden">
            <button
              onClick={() => setActiveTab('Leaders')}
              className={`px-6 py-2 ${activeTab === 'Leaders' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
            >
              {t('nav.leaders')}
            </button>
            <button
              onClick={() => setActiveTab('Executives')}
              className={`px-6 py-2 ${activeTab === 'Executives' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
            >
              {t('nav.executives')}
            </button>
          </div>
        </div>

        {activeTab === 'Executives' && (
          <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-40 h-40 bg-white rounded-full mx-auto mb-4 shadow-2xl overflow-hidden border-4 border-white">
                    <img
                      src="/photo_2025-11-26_00-37-15.jpg"
                      alt="Dr. Abas Hassen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative -mt-20 pb-12">
              <div className="text-center px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">Dr. Abas Hassen</h2>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full mb-6">
                    <Award className="mr-2" size={20} />
                    <span className="font-semibold">Lead Executive Officer</span>
                  </div>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    Health System Innovation and Quality
                  </p>

                  <div className="border-t border-gray-200 pt-6 mt-6 text-left space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Dr. Abas brings over two decades of exemplary leadership in healthcare quality
                      and innovation. With a distinguished career dedicated to transforming healthcare
                      delivery systems, Dr. Abas has pioneered numerous initiatives that have
                      significantly improved patient outcomes and operational excellence across
                      healthcare facilities nationwide.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Under his visionary guidance, the Health System Innovation and Quality department
                      has become a center of excellence, fostering a culture of continuous improvement
                      and evidence-based practice. His commitment to patient safety, quality care, and
                      healthcare innovation has inspired countless healthcare professionals to strive
                      for excellence in their daily practice.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Dr. Abas holds advanced degrees in Medicine and Healthcare Management, and has
                      published extensively in peer-reviewed journals on topics ranging from quality
                      improvement methodologies to healthcare system transformation. His leadership
                      philosophy centers on collaboration, innovation, and unwavering dedication to
                      improving the health and well-being of communities.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-teal-600 mb-1">20+</div>
                        <div className="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-cyan-600 mb-1">500+</div>
                        <div className="text-sm text-gray-600">QI Projects Led</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                        <div className="text-sm text-gray-600">Publications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {activeTab === 'Leaders' && (
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.leaders')}</h2>
              <p className="text-xl text-gray-600">Senior leaders guiding our strategic vision</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dr. Mekdes - styled like Dr. Abas */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative h-56 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-40 h-40 bg-white rounded-full mx-auto mb-4 shadow-2xl overflow-hidden border-4 border-white">
                        <img
                          src="/mekdes.jpg"
                          alt="Dr. Mekdes Daba"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative -mt-20 pb-10">
                  <div className="text-center px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Dr. Mekdes Daba</h2>
                      <p className="text-sm md:text-base text-teal-600 font-semibold mb-3">Minister, Ministry of Health, Ethiopia</p>
                      <div className="inline-flex items-center px-5 py-2 text-base bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full mb-4">
                        <Award className="mr-2" size={18} />
                        <span className="font-semibold">Minister</span>
                      </div>
                      <div className="border-t border-gray-200 pt-6 mt-6 text-left space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            H.E Dr. Mekdes Daba, a distinguished medical professional, currently serves as the Minister of Health in the Federal Democratic Republic of Ethiopia. With a specialization in obstetrics and gynecology, her academic journey includes obtaining a medical undergraduate degree from Hawassa University and completing residency training in Obstetrics and Gynecology at AAU.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Notably, she is the first family planning sub-specialist in Ethiopia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Her Excellency Saharela Abdullahi - same style */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative h-56 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-40 h-40 bg-white rounded-full mx-auto mb-4 shadow-2xl overflow-hidden border-4 border-white">
                        <img
                          src="/saharela.jpg"
                          alt="Mrs. Seharela Abdulahi"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative -mt-20 pb-10">
                  <div className="text-center px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Mrs. Seharela Abdulahi</h2>
                      <p className="text-sm md:text-base text-teal-600 font-semibold mb-3">State Minister, Ministry of Health, Ethiopia</p>
                      <div className="inline-flex items-center px-5 py-2 text-base bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full mb-4">
                        <Award className="mr-2" size={18} />
                        <span className="font-semibold">State Minister</span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6 mt-6 text-left space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          H.E. Mrs. Seharela Abdulahi was born in Addis Ababa in 1990 GC. Prior to her current position, she served as the State Minister of Health of the Federal Democratic Republic of Ethiopia since 2018 GC. She holds a Master’s in Public Health and has worked as a health professional in both the public and private health sectors.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          During her tenure, H.E. Mrs. Abdulahi coordinated and implemented a women-centered and income-generating project for faith-based organizations. She successfully mobilized resources and developed sustainable skill-building programs to ensure the social and economic empowerment of women, contributing to their resilience. Moreover, she developed and implemented hygiene and sanitation programs to promote health and prevent diseases.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          She was elected as a member of the Ethiopian Parliament for two terms and served as the Deputy Chairperson for the Women and Children Standing Committee, where proclamations regarding adaptation law and the Maputo Protocol were ratified. She was also a member of the Pan-African Parliament.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('pages.desks')}</h2>
            <p className="text-xl text-gray-600">
              Dedicated teams working together to advance healthcare excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {desks.map((desk, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {desk.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                  {desk.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {desk.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-xl mb-6 text-white/95">
            Together, we are transforming healthcare through innovation, quality improvement,
            and unwavering commitment to patient safety.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">50+</div>
              <div className="text-sm text-white/90">Healthcare Facilities</div>
            </div>
            <div className="w-px bg-white/30"></div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">1000+</div>
              <div className="text-sm text-white/90">Healthcare Professionals</div>
            </div>
            <div className="w-px bg-white/30"></div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">500K+</div>
              <div className="text-sm text-white/90">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
