import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// legacy modal removed: SubmitForm import deleted
import HomePage from './pages/HomePage';
import VisionMissionPage from './pages/VisionMissionPage';
import LearningPage from './pages/LearningPage';
import ResourcesPage from './pages/ResourcesPage';
import ExecutivesPage from './pages/ExecutivesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InnovationSubmitPage from './pages/InnovationSubmitPage';
import InnovationEditPage from './pages/InnovationEditPage';
import InnovatorDashboard from './pages/InnovatorDashboard';
import SupervisorReview from './pages/SupervisorReview';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  // legacy modal removed

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitClick = () => {
    // if user logged in -> go to dashboard, otherwise go to login
    const authRaw = localStorage.getItem('auth_user');
    if (authRaw) setCurrentSection('dashboard');
    else setCurrentSection('login');
  };

  const renderContent = () => {
    if (currentSection.startsWith('edit-')) {
      const id = parseInt(currentSection.replace('edit-', ''), 10);
      if (!isNaN(id)) return <InnovationEditPage id={id} onClose={() => setCurrentSection('dashboard')} />;
    }

    switch (currentSection) {
      case 'home':
        return (
          <>
            <Hero onSubmitClick={handleSubmitClick} />
            <HomePage onNavigate={handleNavigate} />
          </>
        );
      case 'vision':
        return <VisionMissionPage type="vision" />;
      case 'mission':
        return <VisionMissionPage type="mission" />;
      case 'executives':
        return <ExecutivesPage />;
      case 'change-package':
        return <LearningPage type="change-package" />;
      case 'webinars':
        return <LearningPage type="webinars" />;
      case 'documentaries':
        return <LearningPage type="documentaries" />;
      case 'innovation-list':
        return <LearningPage type="innovation-list" />;
      case 'researches':
        return <LearningPage type="researches" />;
      case 'documents':
        return <ResourcesPage type="documents" />;
      case 'qi-projects':
        return <ResourcesPage type="qi-projects" />;
      case 'case-studies':
        return <ResourcesPage type="case-studies" />;
      case 'change-packages':
        return <ResourcesPage type="change-packages" />;
      case 'submit':
        // legacy route — redirect to the full submit page
        setCurrentSection('submit-innovation');
        return null;
      case 'dashboard':
        return <InnovatorDashboard onNavigate={handleNavigate} />;
      case 'submit-innovation':
        return <InnovationSubmitPage onClose={() => setCurrentSection('dashboard')} />;
      case 'supervisor':
        return <SupervisorReview />;
      case 'login':
        return <LoginPage onSuccess={() => setCurrentSection('dashboard')} />;
      case 'register':
        return <RegisterPage onSuccess={() => setCurrentSection('dashboard')} />;
      default:
        return (
          <>
            <Hero onSubmitClick={handleSubmitClick} />
            <HomePage onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentSection={currentSection} />
      <div className="pt-20">
        {renderContent()}
      </div>
      {/* legacy modal removed */}
    </div>
  );
}

export default App;
