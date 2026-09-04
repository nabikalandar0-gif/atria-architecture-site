import React, { useState } from 'react';
import { Project, Language } from '../types';
import { MapPin, Navigation, Sparkles, Compass, Layers, ExternalLink, ArrowRight, Eye, Info } from 'lucide-react';

interface ProjectRegionalMapProps {
  projects: Project[];
  language: Language;
  onSelectProject: (project: Project) => void;
  onToggleCompare?: (project: Project) => void;
  selectedForCompare?: string[];
}

export const ProjectRegionalMap: React.FC<ProjectRegionalMapProps> = ({
  projects,
  language,
  onSelectProject,
  onToggleCompare,
  selectedForCompare = [],
}) => {
  const isFa = language === 'fa';
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedZone, setSelectedZone] = useState<'all' | 'tehran' | 'lavasan' | 'south'>('all');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Map pin relative coordinates on custom architectural schematic view (percentage based)
  const pinPositions: Record<string, { x: number; y: number; zone: string }> = {
    'atria-lavasan-sanctuary': { x: 74, y: 24, zone: 'lavasan' },
    'atria-zaferanieh-tower': { x: 42, y: 28, zone: 'tehran' },
    'atria-niavaran-gallery-loft': { x: 58, y: 22, zone: 'tehran' },
    'atria-darband-pavilion': { x: 48, y: 16, zone: 'tehran' },
    'atria-fereshteh-adaptive-reuse': { x: 45, y: 38, zone: 'tehran' },
    'atria-downtown-hq': { x: 50, y: 52, zone: 'tehran' },
    'atria-kish-coral-villa': { x: 62, y: 84, zone: 'south' },
  };

  const zones = [
    { id: 'all', labelEn: 'All Geographic Zones', labelFa: 'همه بسترها و اقلیم‌ها' },
    { id: 'tehran', labelEn: 'North Tehran & Shemiran', labelFa: 'شمال تهران و شمیران' },
    { id: 'lavasan', labelEn: 'Lavasan Mountain Valley', labelFa: 'دامنه‌های البرز و لواسان' },
    { id: 'south', labelEn: 'Persian Gulf & Kish', labelFa: 'سواحل جنوب و جزیره کیش' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedZone === 'all') return true;
    const pin = pinPositions[p.id];
    return pin ? pin.zone === selectedZone : true;
  });

  return (
    <div className="rounded-2xl bg-stone-900/90 border border-stone-800 p-4 sm:p-6 space-y-6">
      
      {/* Map Header & Zone Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>{isFa ? 'نقشه توپوگرافی و پراکندگی جغرافیایی آثار' : 'REGIONAL TOPOGRAPHY & GEOGRAPHIC DISPERSION'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-100">
            {isFa ? 'موقعیت مکانی پروژه‌های معماری آتریا' : 'Interactive Architectural Project Atlas'}
          </h3>
        </div>

        {/* Zone switcher pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setSelectedZone(z.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedZone === z.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isFa ? z.labelFa : z.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Architectural Schematic Topo Map */}
        <div className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[16/10] bg-stone-950 rounded-xl border border-stone-800 overflow-hidden shadow-inner flex items-center justify-center select-none">
          
          {/* Topographic Contour Lines SVG Background */}
          <svg className="absolute inset-0 w-full h-full opacity-30 text-stone-700 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            
            {/* Mountain Contour Curves */}
            <path d="M-50,60 Q200,20 400,90 T900,40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path d="M-50,110 Q220,70 450,140 T900,90" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path d="M-50,170 Q240,130 500,190 T900,150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M-50,230 Q260,190 550,250 T900,210" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            
            {/* Coastal & Regional Lines */}
            <path d="M-20,380 Q300,340 600,410 T950,370" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />
          </svg>

          {/* Compass Rose */}
          <div className="absolute top-3 right-3 p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-[10px] font-mono text-stone-400 flex flex-col items-center pointer-events-none">
            <Navigation className="w-3.5 h-3.5 text-amber-400 transform -rotate-45" />
            <span>N</span>
          </div>

          {/* Region Badges on Map */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest pointer-events-none">
            {isFa ? 'البرز مرکزی و دامنه‌های شمالی' : 'CENTRAL ALBORZ & SHEMIRAN SECTOR'}
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-amber-500/70 uppercase tracking-widest pointer-events-none">
            {isFa ? 'حوزه اقلیمی خلیج فارس' : 'PERSIAN GULF MARITIME ZONE'}
          </div>

          {/* Interactive Project Pins */}
          {filteredProjects.map((p) => {
            const pos = pinPositions[p.id] || { x: 50, y: 50 };
            const isSelected = selectedProjectId === p.id;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-10 ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
                title={isFa ? p.titleFa : p.title}
              >
                {/* Glowing Pulse Ring for active pin */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping" />
                )}

                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full border shadow-lg transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                      : 'bg-stone-900/90 text-stone-200 border-stone-700 hover:border-amber-400 hover:text-white'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span className="text-[10px] font-semibold max-w-[100px] sm:max-w-[130px] truncate">
                    {isFa ? p.titleFa.split(' ')[0] + ' ' + (p.titleFa.split(' ')[1] || '') : p.title.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Project Spatial Monograph Box */}
        {selectedProject && (
          <div className="lg:col-span-5 bg-stone-950 rounded-xl border border-stone-800 p-4 sm:p-5 space-y-4 shadow-xl">
            
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-stone-800">
              <img
                src={selectedProject.heroImage}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] font-mono text-amber-400 border border-stone-700">
                {selectedProject.coordinates
                  ? `${selectedProject.coordinates.lat.toFixed(2)}°N, ${selectedProject.coordinates.lng.toFixed(2)}°E`
                  : '35.80°N, 51.42°E'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                {isFa ? selectedProject.regionNameFa || selectedProject.locationFa : selectedProject.regionName || selectedProject.location}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-stone-100">
                {isFa ? selectedProject.titleFa : selectedProject.title}
              </h4>
              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                {isFa ? selectedProject.descriptionFa : selectedProject.description}
              </p>
            </div>

            {/* Quick Specs Pill Row */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-850 text-xs">
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">{isFa ? 'متراژ زیربنا' : 'Built Area'}</span>
                <span className="font-mono font-bold text-stone-200">{selectedProject.areaSqm.toLocaleString()} m²</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">{isFa ? 'سال ساخت' : 'Year'}</span>
                <span className="font-mono font-bold text-amber-400">{selectedProject.year}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onSelectProject(selectedProject)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isFa ? 'مشاهده مونوگراف کامل' : 'Open Monograph'}</span>
              </button>

              {onToggleCompare && (
                <button
                  onClick={() => onToggleCompare(selectedProject)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedForCompare.includes(selectedProject.id)
                      ? 'bg-stone-800 border-amber-400 text-amber-400'
                      : 'bg-stone-900 hover:bg-stone-850 border-stone-700 text-stone-300'
                  }`}
                  title={isFa ? 'افزودن به لیست مقایسه' : 'Add to Compare'}
                >
                  {selectedForCompare.includes(selectedProject.id) ? (isFa ? '✓ انتخاب شد' : '✓ Selected') : (isFa ? '+ مقایسه' : '+ Compare')}
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
