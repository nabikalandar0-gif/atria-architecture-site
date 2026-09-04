import React from 'react';
import { Compass, Globe, Phone, Menu, X, Sun, Moon } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  activeSection,
  setActiveSection,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isFa = language === 'fa';
  const isDark = theme === 'dark';

  const navLinks = [
    { id: 'projects', labelEn: 'Projects', labelFa: 'پروژه‌ها' },
    { id: 'renovations', labelEn: 'Renovation', labelFa: 'بازسازی' },
    { id: 'spatial-explorer', labelEn: 'Spatial Anatomy', labelFa: 'آناتومی فضا' },
    { id: 'estimator', labelEn: 'Feasibility & Cost', labelFa: 'برآورد هزینه' },
    { id: 'ai-consultant', labelEn: 'AI Spatial Lab', labelFa: 'مشاور هوشمند' },
    { id: 'articles', labelEn: 'Articles & Guides', labelFa: 'مقالات و راهنما' },
    { id: 'philosophy', labelEn: 'Studio', labelFa: 'درباره آتریا' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors ${
      isDark 
        ? 'bg-stone-950/90 border-stone-800/80 text-stone-100' 
        : 'bg-stone-50/95 border-stone-200 text-stone-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Zone 1: Brand Title */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm border flex items-center justify-center text-amber-500 transition-colors ${
            isDark ? 'bg-stone-900 border-stone-700 group-hover:border-amber-400/80' : 'bg-white border-stone-300 group-hover:border-amber-500 shadow-sm'
          }`}>
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45 duration-300" />
          </div>
          <div className="flex flex-col text-center">
            <span className={`font-extrabold text-base sm:text-xl tracking-wider uppercase font-mono leading-none ${
              isDark ? 'text-stone-100' : 'text-stone-900'
            }`}>
              ATRIA
            </span>
            <span className={`text-[8px] tracking-widest uppercase -mt-0.5 text-center ${
              isDark ? 'text-stone-400' : 'text-stone-500'
            }`}>
              {isFa ? 'معماری و طراحی ساختمان' : 'Architecture & Design'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single line, clean desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                activeSection === link.id
                  ? isDark
                    ? 'text-amber-400 bg-stone-900 border border-stone-750 font-semibold'
                    : 'text-amber-700 bg-stone-200/80 border border-stone-300 font-semibold'
                  : isDark
                    ? 'text-stone-300 hover:text-stone-100 hover:bg-stone-900/60'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
              }`}
            >
              {isFa ? link.labelFa : link.labelEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme + Language toggle + Consultation CTA) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs font-medium border flex items-center gap-1 transition-colors cursor-pointer ${
              isDark
                ? 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                : 'bg-white border-stone-300 hover:border-stone-400 text-stone-700 shadow-xs'
            }`}
            title={isDark ? (isFa ? 'تغییر به تم روشن' : 'Switch to Light Theme') : (isFa ? 'تغییر به تم تاریک' : 'Switch to Dark Theme')}
            aria-label="Theme toggle"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-stone-700" />
            )}
            <span className="hidden sm:inline text-[11px] font-mono font-medium">
              {isDark ? (isFa ? 'روشن' : 'Light') : (isFa ? 'تاریک' : 'Dark')}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(isFa ? 'en' : 'fa')}
            className={`px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs font-medium border flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
              isDark
                ? 'text-stone-300 bg-stone-900 border-stone-800 hover:border-stone-700'
                : 'text-stone-700 bg-white border-stone-300 hover:border-stone-400 shadow-xs'
            }`}
            title={isFa ? 'Switch to English' : 'تغییر به زبان فارسی'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono uppercase font-bold text-[11px]">{isFa ? 'EN' : 'فا'}</span>
          </button>

          {/* Compact Primary Consultation Action on Mobile */}
          <button
            onClick={onOpenConsultation}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-1 sm:gap-1.5 transition-all shadow-xs sm:shadow-sm whitespace-nowrap cursor-pointer shrink-0"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{isFa ? 'مشاوره' : 'Consultation'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 sm:p-2 rounded-md border cursor-pointer shrink-0 ${
              isDark
                ? 'text-stone-300 hover:text-white bg-stone-900 border-stone-800'
                : 'text-stone-700 hover:text-stone-950 bg-white border-stone-300'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 py-4 space-y-2 ${
          isDark ? 'border-stone-800 bg-stone-950/98' : 'border-stone-200 bg-stone-50/98'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm flex items-center justify-between transition-colors ${
                isDark 
                  ? 'text-stone-200 hover:bg-stone-900 hover:text-amber-400' 
                  : 'text-stone-800 hover:bg-stone-200 hover:text-amber-600'
              }`}
            >
              <span>{isFa ? link.labelFa : link.labelEn}</span>
              <span className="text-stone-400 text-xs">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

