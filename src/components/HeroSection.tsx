import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Compass, Shield, Award } from 'lucide-react';
import { Language } from '../types';
import { STUDIO_INFO } from '../data/atriaData';

interface HeroSectionProps {
  language: Language;
  onExploreProjects: () => void;
  onOpenConsultation: () => void;
  onOpenAIConsultant: () => void;
}

// Dedicated High-Performance Count-Up Component
const CountUpNumber: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
  isFa: boolean;
}> = ({ target, suffix = '', duration = 2000, isFa }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentVal = Math.floor(easedProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, target, duration]);

  // Format with thousand separators
  const formattedNumber = count.toLocaleString(isFa ? 'fa-IR' : 'en-US');

  return (
    <span ref={elementRef} className="tabular-nums tracking-tight font-mono">
      {formattedNumber}
      {suffix && <span className="text-amber-400 text-sm sm:text-base font-normal ml-0.5 mr-0.5">{suffix}</span>}
    </span>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreProjects,
  onOpenConsultation,
  onOpenAIConsultant,
}) => {
  const isFa = language === 'fa';

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-stone-800">
      {/* Background Architectural Canvas Image with Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
          alt="Atria Architecture Monolithic Villa"
          className="w-full h-full object-cover object-center brightness-40 filter contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Main Architectural Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Studio Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700/70 text-amber-400 text-xs font-mono tracking-wider w-fit mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{isFa ? 'استودیو معماری، طراحی سازه و نظارت عالیه' : 'ARCHITECTURAL DESIGN & STRUCTURAL ENGINEERING'}</span>
        </div>

        {/* Grand Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-100 tracking-tight leading-tight sm:leading-none">
            {isFa ? (
              <>
                آفرینش فضاهای ماندگار میان <span className="text-amber-400 font-serif italic">خلوص بتن</span>، نور و طبیعت
              </>
            ) : (
              <>
                Sculpting Timeless Spaces between <span className="text-amber-400 font-serif italic">Pure Form</span>, Light & Topography.
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl leading-relaxed font-light">
            {isFa ? (
              'استودیو معماری آتریا طراح ویلاهای شاخص، برج‌باغ‌های لوکس، مجتمع‌های تجاری و پروژه‌های بازآفرینی معاصر در ایران و خاورمیانه است؛ با تلفیق هنر اصیل فضا، مهندسی سازه پیشرفته و پایداری اقلیمی.'
            ) : (
              'Atria Architecture orchestrates high-end residential sanctuaries, vertical garden towers, corporate headquarters, and museum-grade interiors — merging radical spatial clarity with uncompromising craftsmanship.'
            )}
          </p>
        </div>

        {/* CTA Buttons Row */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onExploreProjects}
            className="px-6 py-3.5 rounded-lg bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-stone-100/10 cursor-pointer"
          >
            <span>{isFa ? 'مشاهده پروژه‌های شاخص' : 'Explore Portfolio'}</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAIConsultant}
            className="px-5 py-3.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-stone-700 hover:border-amber-500/50 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isFa ? 'امکان‌سنجی هوشمند زمین و ویلا' : 'AI Spatial Concept Lab'}</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-3.5 rounded-lg bg-transparent hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 text-xs sm:text-sm font-medium transition-all"
          >
            <span>{isFa ? 'درخواست طراحی و بازدید از زمین' : 'Book Project Consultation'}</span>
          </button>
        </div>

      </div>

      {/* Stats and Accreditations Footer Strip */}
      <div className="relative z-10 w-full bg-stone-950/95 border-t border-stone-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STUDIO_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col border-l border-stone-800 pl-4 first:border-l-0 group">
              <span className="text-xl sm:text-3xl font-black text-stone-100 tracking-tight flex items-baseline gap-1 group-hover:text-amber-400 transition-colors">
                {stat.numericTarget ? (
                  <CountUpNumber
                    target={stat.numericTarget}
                    suffix={stat.suffix}
                    duration={2200}
                    isFa={isFa}
                  />
                ) : (
                  <span className="font-mono">{stat.value}</span>
                )}
              </span>
              <span className="text-xs text-stone-400 mt-1 font-medium">
                {isFa ? stat.labelFa : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
