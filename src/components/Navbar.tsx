import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Navbar({ onNavigate, currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, lang, setLang } = useLanguage();
  const { user, logout } = useAuth();

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src="/logo.png" alt="Ministry of Health Logo" className="h-14 object-contain" />
            <span className="sr-only">Ministry of Health</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSection === 'home'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('nav.home')}
            </button>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('about')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  currentSection === 'about' || currentSection === 'vision' || currentSection === 'mission'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.about')} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => { onNavigate('vision'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-t-lg"
                >
                  Vision
                </button>
                <button
                  onClick={() => { onNavigate('mission'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-b-lg"
                >
                  Mission
                </button>
              </div>
            </div>

            <button
              onClick={() => onNavigate('executives')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSection === 'executives'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('nav.executives')}
            </button>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('learning')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  ['learning', 'change-package', 'webinars', 'documentaries', 'innovation-list', 'researches'].includes(currentSection)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.learning')} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => { onNavigate('change-package'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-t-lg"
                >
                  Change Package
                </button>
                <button
                  onClick={() => { onNavigate('webinars'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  Recorded Webinars
                </button>
                <button
                  onClick={() => { onNavigate('documentaries'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  Documentaries
                </button>
                <button
                  onClick={() => { onNavigate('innovation-list'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  Innovation List (Accepted)
                </button>
                <button
                  onClick={() => { onNavigate('researches'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-b-lg"
                >
                  Researches
                </button>
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  ['resources', 'documents', 'qi-projects', 'case-studies', 'change-packages'].includes(currentSection)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t('nav.resources')} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => { onNavigate('documents'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-t-lg"
                >
                  Documents
                </button>
                <button
                  onClick={() => { onNavigate('qi-projects'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  QI Projects
                </button>
                <button
                  onClick={() => { onNavigate('case-studies'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  QI Project Case Studies
                </button>
                <button
                  onClick={() => { onNavigate('change-packages'); setActiveDropdown(null); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-b-lg"
                >
                  QI Change Packages
                </button>
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  {user.first_name || user.username}
                  {user.is_staff && <span className="ml-1 px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded font-medium">Admin</span>}
                </span>
                <button
                  onClick={() => { logout(); onNavigate('home'); }}
                  className="px-3 py-2 ml-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  {t('nav.login')}
                </button>

                <button
                  onClick={() => onNavigate('register')}
                  className="px-3 py-2 ml-2 rounded-md text-sm bg-teal-600 text-white hover:bg-teal-700"
                >
                  {t('nav.register')}
                </button>
              </>
            )}

            {/* Language switch (moved out of resources container to avoid overlap) */}
            <div className="ml-4">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as 'en' | 'am')}
                className="border rounded-md px-2 py-1 text-sm"
                aria-label="Language"
              >
                <option value="en">EN</option>
                <option value="am">አማ</option>
              </select>
            </div>

          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              {t('nav.home')}
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{t('nav.about')}</p>
            <button
              onClick={() => { onNavigate('vision'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              {t('nav.vision')}
            </button>
            <button
              onClick={() => { onNavigate('mission'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              {t('nav.mission')}
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            <button
              onClick={() => { onNavigate('executives'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              {t('nav.executives')}
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Learning</p>
            <button
              onClick={() => { onNavigate('change-package'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Change Package
            </button>
            <button
              onClick={() => { onNavigate('webinars'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Recorded Webinars
            </button>
            <button
              onClick={() => { onNavigate('documentaries'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Documentaries
            </button>
            <button
              onClick={() => { onNavigate('innovation-list'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Innovation List (Accepted)
            </button>
            <button
              onClick={() => { onNavigate('researches'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Researches
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Resources</p>
            <button
              onClick={() => { onNavigate('documents'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Documents
            </button>
            <button
              onClick={() => { onNavigate('qi-projects'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              QI Projects
            </button>
            <button
              onClick={() => { onNavigate('case-studies'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              QI Project Case Studies
            </button>
            <button
              onClick={() => { onNavigate('change-packages'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              QI Change Packages
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-600">
                  Logged in as {user.first_name || user.username}
                  {user.is_staff && <span className="ml-1 px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded font-medium">Admin</span>}
                </div>
                <button
                  onClick={() => { logout(); onNavigate('home'); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onNavigate('login'); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => { onNavigate('register'); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                >
                  {t('nav.register')}
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
