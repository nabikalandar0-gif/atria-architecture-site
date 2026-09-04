import React from 'react';
import { Project, Language } from '../types';
import { X, Check, ArrowRightLeft, Sparkles, Layers, Leaf, MapPin, Building, User, Award, ShieldCheck } from 'lucide-react';

interface ProjectCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: [Project, Project];
  language: Language;
  onSelectProject: (project: Project) => void;
  onBookConsultation: (projectTitle: string) => void;
}

export const ProjectCompareModal: React.FC<ProjectCompareModalProps> = ({
  isOpen,
  onClose,
  projects,
  language,
  onSelectProject,
  onBookConsultation,
}) => {
  if (!isOpen || projects.length < 2) return null;

  const [p1, p2] = projects;
  const isFa = language === 'fa';

  const specs = [
    {
      labelEn: 'Category & Typology',
      labelFa: 'کاربری و تیپولوژی',
      icon: Building,
      v1: isFa ? p1.categoryFa : p1.categoryEn,
      v2: isFa ? p2.categoryFa : p2.categoryEn,
    },
    {
      labelEn: 'Location & Setting',
      labelFa: 'موقعیت و بستر زمین',
      icon: MapPin,
      v1: isFa ? p1.locationFa : p1.location,
      v2: isFa ? p2.locationFa : p2.location,
    },
    {
      labelEn: 'Built Area (m²)',
      labelFa: 'زیربنای ناخالص (مترمربع)',
      icon: Layers,
      v1: `${p1.areaSqm.toLocaleString()} m²`,
      v2: `${p2.areaSqm.toLocaleString()} m²`,
    },
    {
      labelEn: 'Year of Execution',
      labelFa: 'سال طراحی و اجرا',
      icon: ShieldCheck,
      v1: p1.year,
      v2: p2.year,
    },
    {
      labelEn: 'Lead Architect',
      labelFa: 'معمار ارشد مسئول',
      icon: User,
      v1: isFa ? p1.leadArchitectFa : p1.leadArchitect,
      v2: isFa ? p2.leadArchitectFa : p2.leadArchitect,
    },
    {
      labelEn: 'Sustainability Rating',
      labelFa: 'استاندارد زیست‌محیطی',
      icon: Leaf,
      v1: p1.sustainabilityRating,
      v2: p2.sustainabilityRating,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 text-stone-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm sm:text-base">
                {isFa ? 'مقایسه تطبیقی مشخصات پروژه‌های معماری' : 'Comparative Architectural Monograph'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {isFa ? 'بررسی هم‌زمان دو اثر منتخب از نظر سازه، کانسپت و متراژ' : 'Side-by-side technical and spatial specification analysis'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Side by side top hero cards */}
          <div className="grid grid-cols-2 gap-4">
            {[p1, p2].map((proj, idx) => (
              <div key={proj.id} className="space-y-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-stone-800">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-mono text-amber-400 border border-stone-700">
                    {idx === 0 ? (isFa ? 'پروژه ۱' : 'Project A') : (isFa ? 'پروژه ۲' : 'Project B')}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-stone-100 line-clamp-1">
                    {isFa ? proj.titleFa : proj.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1">
                    {isFa ? proj.locationFa : proj.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProject(proj);
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    {isFa ? 'مشاهده کامل مونوگراف' : 'View Full Details'}
                  </button>
                  <button
                    onClick={() => onBookConsultation(isFa ? proj.titleFa : proj.title)}
                    className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    {isFa ? 'مشاوره' : 'Inquire'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Structured Specifications Comparison Table */}
          <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950/60">
            <div className="p-3 bg-stone-900 border-b border-stone-800 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              {isFa ? 'جدول مشخصات فنی و مهندسی' : 'Technical Specifications Matrix'}
            </div>

            <div className="divide-y divide-stone-800/80 text-xs">
              {specs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="grid grid-cols-12 p-3 sm:p-4 hover:bg-stone-900/40 transition-colors">
                    <div className="col-span-4 flex items-center gap-2 text-stone-400 font-medium">
                      <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{isFa ? item.labelFa : item.labelEn}</span>
                    </div>
                    <div className="col-span-4 text-stone-100 font-semibold px-2 border-r border-l border-stone-800/60">
                      {item.v1}
                    </div>
                    <div className="col-span-4 text-stone-100 font-semibold px-2">
                      {item.v2}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architectural Concepts Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFa ? 'کانسپت و رویکرد فرمی' : 'Architectural Concept'}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "{isFa ? p1.architecturalPhilosophyFa : p1.architecturalPhilosophy}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFa ? 'کانسپت و رویکرد فرمی' : 'Architectural Concept'}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "{isFa ? p2.architecturalPhilosophyFa : p2.architecturalPhilosophy}"
              </p>
            </div>
          </div>

          {/* Materials comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                {isFa ? 'متریال‌های غالب' : 'Primary Materials'}
              </div>
              <div className="space-y-1.5">
                {p1.materials.map((m, idx) => (
                  <div key={idx} className="text-xs text-stone-400 flex justify-between">
                    <span className="text-stone-200">{isFa ? m.nameFa : m.name}</span>
                    <span className="font-mono text-[10px] text-amber-400">{m.origin}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                {isFa ? 'متریال‌های غالب' : 'Primary Materials'}
              </div>
              <div className="space-y-1.5">
                {p2.materials.map((m, idx) => (
                  <div key={idx} className="text-xs text-stone-400 flex justify-between">
                    <span className="text-stone-200">{isFa ? m.nameFa : m.name}</span>
                    <span className="font-mono text-[10px] text-amber-400">{m.origin}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
