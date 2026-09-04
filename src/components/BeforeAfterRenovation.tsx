import React, { useState, useRef, useCallback } from 'react';
import { RenovationComparison, Language } from '../types';
import { RENOVATION_STUDIES } from '../data/atriaData';
import { ArrowLeftRight, Clock, Maximize, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface BeforeAfterRenovationProps {
  language: Language;
}

export const BeforeAfterRenovation: React.FC<BeforeAfterRenovationProps> = ({ language }) => {
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isFa = language === 'fa';
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const study = RENOVATION_STUDIES[selectedStudyIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="renovations" className="py-16 sm:py-24 bg-stone-900/60 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{isFa ? 'بازآفرینی و ارتقای سازه‌های لوکس' : 'ADAPTIVE REUSE & ARCHITECTURAL METAMORPHOSIS'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            {isFa ? 'مقایسه تعاملی قبل و بعد از بازسازی' : 'Interactive Before & After Transformations'}
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            {isFa
              ? 'با کشیدن اسلایدر زیر، دگرگونی کامل ویلاها و عمارت‌های قدیمی به شاهکارهای مدرن با تقویت سازه و بازطراحی نما را مشاهده کنید.'
              : 'Drag the interactive slider below to inspect structural interventions, daylight openings, and facade renewal.'}
          </p>
        </div>

        {/* Study Selector Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {RENOVATION_STUDIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedStudyIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedStudyIndex === idx
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700'
              }`}
            >
              {isFa ? item.titleFa : item.title}
            </button>
          ))}
        </div>

        {/* Interactive Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Draggable Image Frame (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div
              ref={containerRef}
              onMouseDown={() => (isDragging.current = true)}
              onMouseUp={() => (isDragging.current = false)}
              onMouseLeave={() => (isDragging.current = false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-950 border border-stone-700 select-none shadow-2xl cursor-ew-resize group"
            >
              {/* "After" Full Image (Base Layer) */}
              <img
                src={study.afterImage}
                alt="After Transformation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded bg-amber-500/90 text-stone-950 text-xs font-bold font-mono tracking-wider backdrop-blur-sm pointer-events-none">
                {isFa ? 'پس از طراحی آتریا (AFTER)' : 'AFTER: ATRIA VISION'}
              </div>

              {/* "Before" Clipped Image (Top Layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={study.beforeImage}
                  alt="Before Transformation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter saturate-50 contrast-90 pointer-events-none"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-stone-950/80 text-stone-200 text-xs font-bold font-mono tracking-wider backdrop-blur-sm pointer-events-none">
                  {isFa ? 'پیش از بازسازی (BEFORE)' : 'BEFORE: EXISTING'}
                </div>
              </div>

              {/* Slider Line Divider with Grab Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-stone-900 text-amber-400 border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Helper prompt bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-950/80 text-[11px] text-stone-300 font-mono border border-stone-800 pointer-events-none backdrop-blur-sm">
                ↔ {isFa ? 'اسلایدر را به چپ و راست بکشید' : 'Drag slider left / right to compare'}
              </div>
            </div>
          </div>

          {/* Details & Engineering Specs Card (4 Cols) */}
          <div className="lg:col-span-4 bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
                {isFa ? study.locationFa : study.location}
              </span>
              <h3 className="text-lg font-bold text-stone-100 mt-1">
                {isFa ? study.titleFa : study.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800 text-xs">
              <div>
                <span className="text-stone-500 block">{isFa ? 'زیربنای ناخالص:' : 'Built Area:'}</span>
                <span className="font-mono font-bold text-stone-200 text-sm">{study.areaSqm} m²</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isFa ? 'مدت زمان اجرا:' : 'Turnaround:'}</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{study.durationMonths} {isFa ? 'ماه' : 'Months'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                <span className="font-bold text-rose-400 block mb-1">
                  {isFa ? '⚠️ چالش‌ها و عیوب ساختار اولیه:' : 'Pre-Existing Structural Defects:'}
                </span>
                <p className="text-stone-400">{isFa ? study.beforeDescriptionFa : study.beforeDescriptionEn}</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                <span className="font-bold text-emerald-400 block mb-1">
                  {isFa ? '✨ مداخلات معمارانه و سازه‌ای آتریا:' : 'Atria Architectural Transformation:'}
                </span>
                <p className="text-stone-300">{isFa ? study.afterDescriptionFa : study.afterDescriptionEn}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
