import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Language, Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ArchitecturalArticles } from './components/ArchitecturalArticles';
import { BeforeAfterRenovation } from './components/BeforeAfterRenovation';
import { InteractiveSpatialExplorer } from './components/InteractiveSpatialExplorer';
import { CostAndFeasibilityEstimator } from './components/CostAndFeasibilityEstimator';
import { AISpatialConsultant } from './components/AISpatialConsultant';
import { StudioPhilosophy } from './components/StudioPhilosophy';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { AdminGuard } from './components/admin/AdminGuard';

/** Main public website */
function MainSite() {
  const [language, setLanguage] = useState<Language>('fa');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationInitialTopic, setConsultationInitialTopic] = useState('');

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleOpenConsultation = (topic: string = '') => {
    setConsultationInitialTopic(topic);
    setConsultationModalOpen(true);
  };

  const handleExploreProjects = () => {
    setActiveSection('projects');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenAIConsultant = () => {
    setActiveSection('ai-consultant');
    const el = document.getElementById('ai-consultant');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 font-sans transition-colors duration-300 ${
        language === 'fa' ? 'rtl font-vazir' : 'ltr'
      }`}
    >
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenConsultation={() => handleOpenConsultation('')}
      />

      <main>
        <HeroSection
          language={language}
          onExploreProjects={handleExploreProjects}
          onOpenConsultation={() => handleOpenConsultation('General Architecture Inquiry')}
          onOpenAIConsultant={handleOpenAIConsultant}
        />

        <ProjectShowcase
          language={language}
          onSelectProject={(project) => setSelectedProject(project)}
          onBookConsultation={(title) => handleOpenConsultation(`Inquiry for: ${title}`)}
        />

        <BeforeAfterRenovation language={language} />

        <InteractiveSpatialExplorer language={language} />

        <CostAndFeasibilityEstimator
          language={language}
          onBookConsultationWithData={(summary) => handleOpenConsultation(summary)}
        />

        <AISpatialConsultant
          language={language}
          onBookConsultation={(conceptTitle) => handleOpenConsultation(`Concept: ${conceptTitle}`)}
        />

        <ArchitecturalArticles
          language={language}
          onBookConsultation={(topic) => handleOpenConsultation(`Article Inquiry: ${topic}`)}
        />

        <StudioPhilosophy language={language} />
      </main>

      <Footer
        language={language}
        onOpenConsultation={() => handleOpenConsultation('Footer Consultation Request')}
      />

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          language={language}
          onBookConsultation={(title) => {
            setSelectedProject(null);
            handleOpenConsultation(`Project Reference: ${title}`);
          }}
        />
      )}

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        language={language}
        initialTopic={consultationInitialTopic}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminGuard />} />
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
