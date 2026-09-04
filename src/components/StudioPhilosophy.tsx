import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { STUDIO_INFO, TEAM_MEMBERS, STUDIO_AWARDS } from '../data/atriaData';
import { CLIENT_TESTIMONIALS } from '../data/articlesData';
import { 
  Award, Compass, Sparkles, Shield, Feather, Globe2, BookOpen, 
  MessageSquareQuote, ChevronRight, ChevronLeft, Star, CheckCircle2, 
  Quote, MapPin, Calendar, Building2
} from 'lucide-react';

interface StudioPhilosophyProps {
  language: Language;
}

export const StudioPhilosophy: React.FC<StudioPhilosophyProps> = ({ language }) => {
  const isFa = language === 'fa';
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = CLIENT_TESTIMONIALS;

  const nextTestimonial = () => {
    setDirection(1);
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonialIndex];

  const corePillars = [
    {
      titleEn: 'Tectonic Honesty & Pure Form',
      titleFa: 'صداقت تکتونیک و خلوص فرم',
      descEn: 'We reject superficial facade decoration. Every architectural plane, cantilever, and exposed surface is an honest expression of structural physics, gravity, and raw authentic material.',
      descFa: 'ما تزیینات سطحی و بی‌اصالت را کنار می‌گذاریم. هر خط، کنسول معلق و بافت بتن یا سنگ در پروژه‌های آتریا، تجلی صادقانه رفتار سازه و جاذبه زمین است.',
      icon: Feather,
    },
    {
      titleEn: 'Biophilic Porosity & Sunlight',
      titleFa: 'تخلخل سبز بیوفیلیک و نور طبیعی',
      descEn: 'Integrating microclimate courtyards, interior atriums, and cascading greenery to weave living nature into the everyday human routine.',
      descFa: 'خلق حیاط‌های میانی (Atrium)، گودال‌باغچه‌های آفتاب‌گیر و امتداد پوشش گیاهی زنده به داخل فضاهای مسکونی برای بازیابی پیوند انسان با طبیعت.',
      icon: Sparkles,
    },
    {
      titleEn: 'Geological Permanence',
      titleFa: 'ماندگاری قرن‌محور و پایداری اقلیمی',
      descEn: 'Crafting spaces designed to age gracefully over decades, utilizing thermal mass, passive ventilation, and climate-resilient local stone.',
      descFa: 'طراحی بناهایی که با گذشت دهه‌ها زیباتر و پخته‌تر می‌شوند؛ با بهره‌گیری از سرمایش غیرفعال، مصالح بومی با دوام بالا و کاهش ردپای کربن.',
      icon: Shield,
    },
  ];

  return (
    <section id="philosophy" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        
        {/* Ethos Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Compass className="w-4 h-4" />
              <span>{isFa ? 'درباره استودیو و جهان‌بینی معماری' : 'STUDIO PROFILE & PHILOSOPHY'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
              {isFa ? (
                <>معماری به مثابه تندیس سکونت؛ <span className="text-amber-400 font-serif italic">پاسخ به بستر و زمان</span></>
              ) : (
                <>Architecture as Sculptural Dwelling; <span className="text-amber-400 font-serif italic">Grounded in Context</span></>
              )}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-iransans">
              {isFa
                ? 'استودیو معماری آتریا از سال ۱۳۹۳ با هدف بازتعریف معماری لوکس و معاصر در بستر اقلیمی ایران و خاورمیانه پایه‌گذاری شد. رویکرد ما پیوند میان دقت مهندسی سازه، تسلط بر مصالح فاخر و ایجاد فضاهایی آرامش‌بخش و بی‌زمان است.'
                : 'Founded in 2014, Atria Architecture operates at the intersection of radical spatial rigor, structural engineering ingenuity, and tactile luxury. We believe luxury is not ornament, but the sublime orchestration of space, proportion, and light.'}
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85"
              alt="Atria Design Atelier"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-stone-300 flex justify-between">
              <span>Atria Atelier — Tehran & Dubai</span>
              <span className="text-amber-400">Est. 2014</span>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-700 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-100">
                  {isFa ? pillar.titleFa : pillar.titleEn}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-iransans">
                  {isFa ? pillar.descFa : pillar.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Client Testimonials Swiper Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <MessageSquareQuote className="w-4 h-4" />
                <span>{isFa ? 'تجربه و رضایت کارفرمایان' : 'CLIENT TESTIMONIALS & CASE STUDIES'}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-stone-100">
                {isFa ? 'روایت همراهی و خلق ارزش با کارفرمایان' : 'Partnerships Built on Trust & Excellence'}
              </h3>
            </div>

            {/* Swiper Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-amber-400" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Slide with Framer Motion Transition */}
          <div className="relative min-h-[360px] sm:min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center w-full"
              >
                {/* Project Image & Visual Thumbnail */}
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl group">
                  <img
                    src={currentTestimonial.projectImage}
                    alt={currentTestimonial.projectTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-xs space-y-1">
                    <div className="font-bold text-stone-100 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isFa ? currentTestimonial.projectTitleFa : currentTestimonial.projectTitle}</span>
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono flex items-center justify-between">
                      <span>{isFa ? currentTestimonial.projectLocationFa : currentTestimonial.projectLocation}</span>
                      <span className="text-amber-400 font-bold">{currentTestimonial.projectYear}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Content & Client Avatar */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(currentTestimonial.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs font-mono text-stone-400 ml-2 font-bold">5.0 / 5.0</span>
                  </div>

                  <blockquote className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif italic relative">
                    <Quote className="w-8 h-8 text-amber-400/20 absolute -top-4 -left-2 -z-10" />
                    "{isFa ? currentTestimonial.quoteFa : currentTestimonial.quoteEn}"
                  </blockquote>

                  {/* Outcome Achievement Badge */}
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center gap-2.5 text-xs text-amber-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium font-iransans">{isFa ? currentTestimonial.outcomeFa : currentTestimonial.outcomeEn}</span>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3 pt-2 border-t border-stone-800/80">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.clientName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/60 shadow"
                    />
                    <div>
                      <div className="text-sm font-bold text-stone-100">
                        {isFa ? currentTestimonial.clientNameFa : currentTestimonial.clientName}
                      </div>
                      <div className="text-xs text-stone-400 font-iransans">
                        {isFa ? currentTestimonial.clientRoleFa : currentTestimonial.clientRole}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Pagination */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setDirection(dotIdx > activeTestimonialIndex ? 1 : -1);
                  setActiveTestimonialIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeTestimonialIndex
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-stone-700 hover:bg-stone-500'
                }`}
                aria-label={`Testimonial slide ${dotIdx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-bold">
              {isFa ? 'تیم رهبری و معماران ارشد' : 'LEADERSHIP & PRINCIPALS'}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-stone-100 mt-1">
              {isFa ? 'خالقان و مدیران استودیو آتریا' : 'The Minds Shaping the Space'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="aspect-[4/3] bg-stone-950 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-stone-100">
                      {isFa ? member.nameFa : member.name}
                    </h4>
                    <span className="text-xs font-mono text-amber-400 block mt-0.5">
                      {isFa ? member.roleFa : member.role}
                    </span>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed font-iransans">
                      {isFa ? member.bioFa : member.bio}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-800 text-[10px] text-stone-500 font-mono">
                    🎓 {isFa ? member.educationFa : member.education}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Awards Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>{isFa ? 'افتخارات و جوایز کسب‌شده توسط استودیو' : 'Recognitions & International Awards'}</span>
            </div>
            <span className="text-xs font-mono text-stone-400">18 Accreditations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STUDIO_AWARDS.map((award, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1.5">
                <span className="text-xs font-mono text-amber-400 font-bold">{award.badge}</span>
                <h5 className="font-bold text-stone-200 text-xs sm:text-sm leading-snug">
                  {isFa ? award.titleFa : award.title}
                </h5>
                <div className="text-[11px] text-stone-400">
                  {award.organization} ({award.year})
                </div>
                <div className="text-[10px] text-stone-500 italic">
                  {isFa ? award.projectNameFa : award.projectName}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

