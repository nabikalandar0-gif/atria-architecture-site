import React, { useState, useMemo, useEffect } from 'react';
import { Project, ProjectCategory, Language } from '../types';
import { supabase } from '../lib/supabase';
import { mapDbProjectToProject } from '../lib/mapProject';
import {
  ArrowUpRight,
  Award,
  Compass,
  MapPin,
  Maximize2,
  Search,
  LayoutGrid,
  Rows3,
  SlidersHorizontal,
  Sparkles,
  Map as MapIcon,
  ArrowRightLeft,
  X,
  Quote,
  Loader2,
} from 'lucide-react';
import { ProjectRegionalMap } from './ProjectRegionalMap';
import { ProjectCompareModal } from './ProjectCompareModal';

interface ProjectShowcaseProps {
  language: Language;
  onSelectProject: (project: Project) => void;
  onBookConsultation?: (projectTitle: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  language,
  onSelectProject,
  onBookConsultation = () => {},
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid' | 'map'>('masonry');
  const [sortBy, setSortBy] = useState<'featured' | 'year' | 'area'>('featured');

  const [compareList, setCompareList] = useState<Project[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const isFa = language === 'fa';

  // دریافت پروژه‌ها از Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error.message);
        setProjects([]);
      } else {
        setProjects((data || []).map(mapDbProjectToProject));
      }
      setLoadingProjects(false);
    };

    fetchProjects();
  }, []);

  const categories: Array<{ id: ProjectCategory; labelEn: string; labelFa: string }> = [
    { id: 'all', labelEn: 'All Typologies', labelFa: 'همه پروژه‌ها' },
    { id: 'villa', labelEn: 'Villas & Mansions', labelFa: 'ویلا و عمارت‌های لوکس' },
    { id: 'residential', labelEn: 'Residential', labelFa: 'برج‌باغ و مسکونی' },
    { id: 'commercial', labelEn: 'Commercial & HQ', labelFa: 'تجاری و اداری' },
    { id: 'renovation', labelEn: 'Renovation & Reuse', labelFa: 'بازسازی و احیا' },
    { id: 'interior', labelEn: 'Interior & Penthouse', labelFa: 'طراحی داخلی و پنت‌هاوس' },
    { id: 'cultural', labelEn: 'Cultural & Public', labelFa: 'فرهنگی و عمومی' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.titleFa.includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.locationFa.includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.descriptionFa || '').includes(q) ||
        (p.tagline || '').toLowerCase().includes(q) ||
        (p.taglineFa || '').includes(q) ||
        (p.architecturalPhilosophy || '').toLowerCase().includes(q) ||
        (p.architecturalPhilosophyFa || '').includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'year') {
      result = [...result].sort((a, b) => Number(b.year) - Number(a.year));
    } else if (sortBy === 'area') {
      result = [...result].sort((a, b) => b.areaSqm - a.areaSqm);
    } else {
      result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [projects, selectedCategory, searchQuery, sortBy]);

  const getAspectClass = (index: number, _project: Project) => {
    if (layoutMode === 'grid') return 'aspect-[16/11]';
    const rhythm = index % 5;
    if (rhythm === 0) return 'aspect-[4/5]';
    if (rhythm === 1) return 'aspect-[16/10]';
    if (rhythm === 2) return 'aspect-[1/1]';
    if (rhythm === 3) return 'aspect-[3/4]';
    return 'aspect-[16/9]';
  };

  const popularKeywords = [
    { labelEn: 'Exposed Concrete', labelFa: 'بتن اکسپوز' },
    { labelEn: 'Villa & Mansion', labelFa: 'ویلا و عمارت' },
    { labelEn: 'Lavasan & Shemiran', labelFa: 'لواسان و شمیران' },
    { labelEn: 'Adaptive Reuse', labelFa: 'بازسازی و احیا' },
    { labelEn: 'Penthouse & Luxury', labelFa: 'پنت‌هاوس لوکس' },
    { labelEn: 'Courtyard & Zen', labelFa: 'حیاط مرکزی' },
    { labelEn: 'Seaside & Coastal', labelFa: 'کیش و ساحلی' },
  ];

  const handleToggleCompare = (project: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === project.id);
      if (exists) {
        return prev.filter((p) => p.id !== project.id);
      }
      if (prev.length >= 2) {
        return [prev[0], project];
      }
      return [...prev, project];
    });
  };

  const compareIds = compareList.map((p) => p.id);

  if (loadingProjects) {
    return (
      <section id="projects" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-stone-400 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
          <span>{isFa ? 'در حال بارگذاری پروژه‌ها...' : 'Loading projects...'}</span>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search Header */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Search className="w-3.5 h-3.5" />
                <span>{isFa ? 'جستجوی هوشمند در آرشیو آثار معماری' : 'ARCHITECTURAL PORTFOLIO SEARCH'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100">
                {isFa ? 'جستجو و کاوش در مونوگراف پروژه‌ها' : 'Explore Architectural Monographs'}
              </h2>
            </div>

            <div className="relative w-full lg:w-[380px]">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isFa
                    ? 'جستجو با کلیدواژه (مثال: بتن اکسپوز، لواسان، بازسازی)...'
                    : 'Search by keyword (e.g. Concrete, Villa, Lavasan)...'
                }
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-950 border border-stone-750 focus:border-amber-400 text-xs text-stone-100 placeholder-stone-500 focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-stone-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{isFa ? 'کلیدواژه‌های پرتکرار:' : 'Popular Keywords:'}</span>
            </span>
            {popularKeywords.map((kw, i) => {
              const kwText = isFa ? kw.labelFa : kw.labelEn;
              const isSelected = searchQuery.includes(kwText);
              return (
                <button
                  key={i}
                  onClick={() => setSearchQuery(isSelected ? '' : kwText)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 font-bold'
                      : 'bg-stone-800/90 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/60'
                  }`}
                >
                  {kwText}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>{isFa ? 'آرشیو آثار و مونوگراف پروژه‌ها' : 'SELECTED WORKS & MONOGRAPHS'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
              {isFa ? 'گزیده پروژه‌های معماری آتریا' : 'Architecture of Significance'}
            </h3>
            <p className="text-sm text-stone-400 mt-2 max-w-2xl">
              {isFa
                ? 'هر پروژه پاسخی منحصر‌به‌فرد به بستر زمین، زاویه تابش آفتاب و سبک زندگی کارفرماست؛ ترکیبی از بتن اکسپوز، متریال‌های طبیعی و شفافیت فضا.'
                : 'Each architectural intervention represents a bespoke synthesis of light, geological context, and tactile materiality.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1">
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'masonry'
                    ? 'bg-stone-800 text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={isFa ? 'چیدمان میسونری' : 'Masonry Layout'}
              >
                <Rows3 className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-medium font-mono">
                  {isFa ? 'میسونری' : 'Masonry'}
                </span>
              </button>

              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-stone-800 text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={isFa ? 'چیدمان گرید' : 'Grid Layout'}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-medium font-mono">
                  {isFa ? 'شبکه‌ای' : 'Grid'}
                </span>
              </button>

              <button
                onClick={() => setLayoutMode('map')}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'map'
                    ? 'bg-stone-800 text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={isFa ? 'نقشه اطلس' : 'Atlas Map'}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-medium font-mono">
                  {isFa ? 'نقشه اطلس' : 'Atlas Map'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        {layoutMode !== 'map' && (
          <div className="flex items-center justify-between gap-4 border-b border-stone-850 pb-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-stone-100 text-stone-950 font-bold shadow-md'
                        : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-850 border border-stone-800'
                    }`}
                  >
                    <span>{isFa ? cat.labelFa : cat.labelEn}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-stone-950 text-amber-400 font-bold'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-400 whitespace-nowrap font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-900 border border-stone-800 text-stone-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="featured">{isFa ? 'مرتب‌سازی: شاخص‌ترین‌ها' : 'Sort: Featured'}</option>
                <option value="year">{isFa ? 'مرتب‌سازی: سال ساخت' : 'Sort: Year'}</option>
                <option value="area">{isFa ? 'مرتب‌سازی: متراژ زیربنا' : 'Sort: Area (m²)'}</option>
              </select>
            </div>
          </div>
        )}

        {/* Map View */}
        {layoutMode === 'map' ? (
          <ProjectRegionalMap
            projects={filteredProjects}
            language={language}
            onSelectProject={onSelectProject}
            onToggleCompare={handleToggleCompare}
            selectedForCompare={compareIds}
          />
        ) : layoutMode === 'masonry' ? (
          /* Masonry Layout */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {filteredProjects.map((project, index) => {
              const isComparing = compareIds.includes(project.id);
              const conceptOneLine = isFa
                ? project.architecturalPhilosophyFa
                : project.architecturalPhilosophy;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="break-inside-avoid mb-6 inline-block w-full group bg-stone-900/70 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-400/60 transition-all duration-400 cursor-pointer shadow-md hover:shadow-2xl hover:shadow-black/60"
                >
                  <div className={`relative ${getAspectClass(index, project)} overflow-hidden bg-stone-950`}>
                    {project.heroImage ? (
                      <img
                        src={project.heroImage}
                        alt={isFa ? project.titleFa : project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-600 text-xs">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40 opacity-70 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono photo-overlay-badge">
                        {project.year || '—'} • {(project.areaSqm || 0).toLocaleString()} m²
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.awards && project.awards.length > 0 && (
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                            <Award className="w-3 h-3" />
                            <span>{isFa ? 'برنده جایزه' : 'Awarded'}</span>
                          </span>
                        )}

                        <button
                          onClick={(e) => handleToggleCompare(project, e)}
                          className={`p-1.5 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all shadow cursor-pointer ${
                            isComparing
                              ? 'photo-overlay-badge-active shadow-amber-500/20'
                              : 'photo-overlay-control'
                          }`}
                          title={isFa ? 'انتخاب برای مقایسه' : 'Toggle Comparison'}
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {isComparing
                              ? isFa
                                ? 'انتخاب‌شده'
                                : 'Selected'
                              : isFa
                              ? 'مقایسه'
                              : 'Compare'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 photo-overlay-concept translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 pointer-events-none">
                      <div className="flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="overflow-hidden">
                          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                            {isFa ? 'کانسپت و رویکرد معمارانه:' : 'ARCHITECTURAL CONCEPT:'}
                          </div>
                          <p className="text-xs italic truncate font-serif">
                            "{conceptOneLine || '—'}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="p-3 rounded-full bg-stone-950/80 border border-stone-700 text-stone-100 shadow-2xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-4 h-4 text-amber-400" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">
                          {isFa ? project.locationFa : project.location || '—'}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-stone-800/90 text-stone-300 text-[10px] font-mono whitespace-nowrap">
                        {isFa ? project.categoryFa : project.categoryEn}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                      {isFa ? project.titleFa : project.title}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {isFa ? project.taglineFa : project.tagline || '—'}
                    </p>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="truncate max-w-[180px]">
                        {isFa
                          ? `سرپرست: ${project.leadArchitectFa}`
                          : `Lead: ${project.leadArchitect}`}
                      </span>
                      <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-mono">
                        <span>{isFa ? 'مشاهده' : 'Details'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const isComparing = compareIds.includes(project.id);
              const conceptOneLine = isFa
                ? project.architecturalPhilosophyFa
                : project.architecturalPhilosophy;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group bg-stone-900/70 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-400/60 transition-all duration-300 flex flex-col cursor-pointer shadow-md hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                    {project.heroImage ? (
                      <img
                        src={project.heroImage}
                        alt={isFa ? project.titleFa : project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-600 text-xs">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40 opacity-70 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono photo-overlay-badge">
                        {project.year || '—'} • {(project.areaSqm || 0).toLocaleString()} m²
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.awards && project.awards.length > 0 && (
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                            <Award className="w-3 h-3" />
                            <span>{isFa ? 'برنده جایزه' : 'Awarded'}</span>
                          </span>
                        )}

                        <button
                          onClick={(e) => handleToggleCompare(project, e)}
                          className={`p-1.5 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all shadow cursor-pointer ${
                            isComparing
                              ? 'photo-overlay-badge-active shadow-amber-500/20'
                              : 'photo-overlay-control'
                          }`}
                          title={isFa ? 'انتخاب برای مقایسه' : 'Toggle Comparison'}
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {isComparing
                              ? isFa
                                ? 'انتخاب‌شده'
                                : 'Selected'
                              : isFa
                              ? 'مقایسه'
                              : 'Compare'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 photo-overlay-concept translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 pointer-events-none">
                      <div className="flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="overflow-hidden">
                          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                            {isFa ? 'کانسپت و رویکرد معمارانه:' : 'ARCHITECTURAL CONCEPT:'}
                          </div>
                          <p className="text-xs italic truncate font-serif">
                            "{conceptOneLine || '—'}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{isFa ? project.locationFa : project.location || '—'}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-mono">
                          {isFa ? project.categoryFa : project.categoryEn}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                        {isFa ? project.titleFa : project.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {isFa ? project.taglineFa : project.tagline || '—'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                      <span className="text-[11px] truncate">
                        {isFa
                          ? `سرپرست: ${project.leadArchitectFa}`
                          : `Lead: ${project.leadArchitect}`}
                      </span>
                      <span className="text-amber-400 flex items-center gap-0.5 text-xs font-mono">
                        <span>{isFa ? 'مشاهده' : 'Details'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && layoutMode !== 'map' && (
          <div className="py-16 text-center text-stone-400 text-sm space-y-3 bg-stone-900/40 border border-stone-800 rounded-xl">
            <p>
              {isFa
                ? 'هیچ پروژه‌ای مطابق با فیلترهای جستجو یافت نشد.'
                : 'No projects matched your search criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium cursor-pointer transition-colors"
            >
              {isFa ? 'پاک‌کردن فیلترها و نمایش همه' : 'Clear filters & view all'}
            </button>
          </div>
        )}
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-40 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-900/95 border border-amber-400/40 shadow-2xl backdrop-blur-md flex items-center gap-3 sm:gap-4 max-w-lg">
            <div className="flex items-center -space-x-2 overflow-hidden">
              {compareList.map((p) => (
                <img
                  key={p.id}
                  src={p.heroImage || ''}
                  alt={p.title}
                  className="w-10 h-10 rounded-lg object-cover border-2 border-stone-900 shadow bg-stone-800"
                />
              ))}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isFa
                    ? `مقایسه تطبیقی (${compareList.length} از ۲)`
                    : `Compare (${compareList.length}/2)`}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 truncate">
                {compareList.length === 1
                  ? isFa
                    ? 'یک پروژه دیگر را برای مقایسه مشخصات انتخاب کنید'
                    : 'Select one more project to compare'
                  : isFa
                  ? 'آماده بررسی تطبیقی مشخصات فنی'
                  : 'Ready for side-by-side spec comparison'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                disabled={compareList.length < 2}
                onClick={() => setIsCompareModalOpen(true)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer ${
                  compareList.length === 2
                    ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 animate-pulse'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                }`}
              >
                <span>{isFa ? 'مقایسه' : 'Compare'}</span>
                <ArrowRightLeft className="w-3 h-3" />
              </button>

              <button
                onClick={() => setCompareList([])}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
                title={isFa ? 'بستن' : 'Clear'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {compareList.length === 2 && (
        <ProjectCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          projects={[compareList[0], compareList[1]]}
          language={language}
          onSelectProject={onSelectProject}
          onBookConsultation={onBookConsultation}
        />
      )}
    </section>
  );
};