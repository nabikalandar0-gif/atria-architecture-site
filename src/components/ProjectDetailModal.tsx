import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Language } from '../types';
import { 
  X, Award, MapPin, Calendar, Layers, Leaf, ChevronRight, ChevronLeft, 
  Maximize2, Sparkles, Phone, Compass, Share2, Copy, Check, Send, 
  CheckCircle2, Clock, Hammer, FileText, Sparkle, Printer, Minimize2,
  Sliders, ArrowRightLeft, MoveHorizontal
} from 'lucide-react';
import { STUDIO_INFO } from '../data/atriaData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  language: Language;
  onBookConsultation: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  language,
  onBookConsultation,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'materials' | 'sustainability' | 'plans'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const isFa = language === 'fa';

  const currentGallery = project?.gallery && project.gallery.length > 0 ? project.gallery : (project ? [project.heroImage] : []);

  // Keyboard navigation for image carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        paginate(isFa ? -1 : 1);
      } else if (e.key === 'ArrowLeft') {
        paginate(isFa ? 1 : -1);
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, isFullscreen, currentGallery.length, isFa, onClose]);

  if (!project) return null;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveImageIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = currentGallery.length - 1;
      if (nextIndex >= currentGallery.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Construction & Architecture Phases
  const timelinePhases = [
    {
      id: 'phase-0',
      phaseNum: isFa ? 'فاز ۰' : 'Phase 0',
      titleFa: 'طراحی مفهومی، کانسپت و برنامه فیزیکی',
      titleEn: 'Conceptual Design & Spatial Feasibility',
      duration: isFa ? '۴ الی ۶ هفته' : '4-6 Weeks',
      icon: Sparkle,
      status: 'completed',
      deliverablesFa: 'مطالعات بستر و اقلیم، اسکیس‌های اولیه حجمی، دیاگرام لکه‌گذاری و مدل سه‌بعدی اولیه.',
      deliverablesEn: 'Site & climate study, volumetric massing sketches, spatial zoning, and 3D concept model.',
    },
    {
      id: 'phase-1',
      phaseNum: isFa ? 'فاز ۱' : 'Phase 1',
      titleFa: 'نقشه‌های شهرداری، اخذ مجوزها و فاز یک',
      titleEn: 'Permits, Approvals & Schematic Drawings',
      duration: isFa ? '۶ الی ۸ هفته' : '6-8 Weeks',
      icon: FileText,
      status: 'completed',
      deliverablesFa: 'اخذ پروانه ساختمانی، نقشه‌های معماری مصوب، تأییدیه‌های نظام مهندسی و آتش‌نشانی.',
      deliverablesEn: 'Building permit approval, certified architectural drawings, civil defense & structural compliance.',
    },
    {
      id: 'phase-2',
      phaseNum: isFa ? 'فاز ۲' : 'Phase 2',
      titleFa: 'مهندسی سازه، تأسیسات و اجرای دقیق ساختمانی',
      titleEn: 'Structural Engineering & Bespoke Construction',
      duration: isFa ? '۱۲ الی ۱۸ ماه' : '12-18 Months',
      icon: Hammer,
      status: 'in-progress',
      deliverablesFa: 'اجرای بتن اکسپوز خودتراکم، نصب سازه فولادی کنسول‌ها، نما و تأسیسات مدرن هوشمند BMS.',
      deliverablesEn: 'Self-compacting fair-faced concrete, cantilever steelwork, MEP integration & smart BMS envelope.',
    },
    {
      id: 'phase-3',
      phaseNum: isFa ? 'فاز ۳' : 'Phase 3',
      titleFa: 'نظارت عالیه، طراحی داخلی و تحویل نهایی کلید',
      titleEn: 'Interior Staging, Commissioning & Handover',
      duration: isFa ? '۲ الی ۴ ماه' : '2-4 Months',
      icon: CheckCircle2,
      status: 'upcoming',
      deliverablesFa: 'چیدمان نجاری و مبلمان سفارشی، تست عملکرد آکوستیک و تحویل شناسنامه فنی به کارفرما.',
      deliverablesEn: 'Custom joinery staging, acoustic commissioning, final punch-list clearance & client keys handover.',
    },
  ];

  const handleShare = async () => {
    const shareData = {
      title: `${isFa ? project.titleFa : project.title} | Atria Architecture`,
      text: isFa ? project.taglineFa : project.tagline,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to menu/clipboard
      }
    }
    setShareMenuOpen(!shareMenuOpen);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${isFa ? project.titleFa : project.title} - ${window.location.href}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(isFa ? project.titleFa : project.title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(isFa ? project.titleFa : project.title)}&url=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      
      {/* Hidden during screen, visible during print: Printable Architectural Technical Datasheet */}
      <div className="hidden print:block w-full max-w-4xl mx-auto p-8 bg-white text-black font-sans leading-relaxed">
        {/* Print Header */}
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-mono tracking-widest text-neutral-600 uppercase">
              {STUDIO_INFO.nameEn} • ARCHITECTURAL MONOGRAPH
            </div>
            <h1 className="text-2xl font-bold text-black mt-1">
              {isFa ? project.titleFa : project.title}
            </h1>
            <div className="text-xs text-neutral-600 mt-1">
              {isFa ? project.locationFa : project.location} | Year: {project.year} | Built Area: {project.areaSqm.toLocaleString()} m²
            </div>
          </div>
          <div className="text-right text-xs font-mono text-neutral-600">
            <div>Atria Project ID: #{project.slug}</div>
            <div>Hotline: {STUDIO_INFO.phoneFormattedEn}</div>
            <div>Email: {STUDIO_INFO.email}</div>
          </div>
        </div>

        {/* Print Hero Image */}
        <div className="mb-6 rounded-lg overflow-hidden border border-neutral-300">
          <img src={project.heroImage} alt={project.title} className="w-full h-72 object-cover" />
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-neutral-100 rounded-lg text-xs">
          <div>
            <div className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Lead Architect</div>
            <div className="font-semibold text-black mt-0.5">{isFa ? project.leadArchitectFa : project.leadArchitect}</div>
          </div>
          <div>
            <div className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Category & Status</div>
            <div className="font-semibold text-black mt-0.5">{isFa ? project.categoryFa : project.categoryEn} • {project.status}</div>
          </div>
          <div>
            <div className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Sustainability Rating</div>
            <div className="font-semibold text-black mt-0.5">{project.sustainabilityRating}</div>
          </div>
        </div>

        {/* Philosophy & Concept */}
        <div className="mb-6 space-y-2">
          <h2 className="text-sm font-bold text-black uppercase tracking-wider border-b border-neutral-300 pb-1">
            {isFa ? 'کانسپت و فلسفه معمارانه' : 'Architectural Philosophy & Concept'}
          </h2>
          <p className="text-xs text-neutral-800 leading-relaxed font-serif italic">
            "{isFa ? project.architecturalPhilosophyFa : project.architecturalPhilosophy}"
          </p>
          <p className="text-xs text-neutral-700 leading-relaxed">
            {isFa ? project.descriptionFa : project.description}
          </p>
        </div>

        {/* Materials Table */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2">
            {isFa ? 'جدول متریال‌های تخصصی و ساختار' : 'Materiality & Structural Envelope'}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {project.materials.map((mat, i) => (
              <div key={i} className="p-2 border border-neutral-300 rounded">
                <div className="font-bold">{isFa ? mat.nameFa : mat.name}</div>
                <div className="text-neutral-600 text-[11px] flex justify-between">
                  <span>{mat.type}</span>
                  <span className="font-mono">{mat.origin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info for print */}
        <div className="pt-4 border-t border-neutral-300 text-[10px] text-neutral-500 flex justify-between items-center font-mono">
          <div>© {new Date().getFullYear()} ATRIA ARCHITECTURE & DESIGN STUDIO • {STUDIO_INFO.email}</div>
          <div>Official Architectural Technical Datasheet</div>
        </div>
      </div>

      {/* Screen Interactive Modal */}
      <div className="print:hidden bg-stone-900 border border-stone-800 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-stone-100">
        
        {/* Modal Top Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-stone-800 flex items-center justify-between gap-3 bg-stone-950/90">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 font-mono text-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-100 text-sm sm:text-base truncate">
                  {isFa ? project.titleFa : project.title}
                </h3>
                <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 font-mono">
                  {project.year}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 truncate">
                {isFa ? project.locationFa : project.location} • {project.areaSqm.toLocaleString()} m²
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isFa ? 'چاپ شناسنامه فنی / ذخیره PDF' : 'Print Technical Sheet / PDF'}
              aria-label="Print Monograph"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{isFa ? 'چاپ / PDF' : 'Print / PDF'}</span>
            </button>

            {/* Share Trigger */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title={isFa ? 'اشتراک‌گذاری پروژه' : 'Share Project'}
                aria-label="Share Project"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{isFa ? 'اشتراک' : 'Share'}</span>
              </button>

              {/* Share Floating Dropdown */}
              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-stone-950 border border-stone-700 shadow-2xl z-50 space-y-1.5 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] text-stone-400 font-mono px-2 py-1 uppercase tracking-wider">
                    {isFa ? 'اشتراک‌گذاری اثر' : 'Share Monograph'}
                  </div>
                  
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                      <span>{copiedLink ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی لینک مستقیم' : 'Copy Direct Link')}</span>
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">URL</span>
                  </button>

                  <div className="grid grid-cols-2 gap-1 pt-1 border-t border-stone-800">
                    <a
                      href={shareUrls.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded-md text-[11px] text-stone-300 hover:bg-stone-850 hover:text-white flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3 text-sky-400" />
                      <span>تلگرام</span>
                    </a>
                    <a
                      href={shareUrls.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded-md text-[11px] text-stone-300 hover:bg-stone-850 hover:text-white flex items-center gap-1.5"
                    >
                      <span className="text-emerald-400 font-bold text-xs">WA</span>
                      <span>واتس‌اپ</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onBookConsultation(isFa ? project.titleFa : project.title)}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isFa ? 'مشاوره این تیپ پروژه' : 'Inquire Similar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Framer Motion Touch-Friendly Horizontal Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl select-none group">
              
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(isFa ? -1 : 1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(isFa ? 1 : -1);
                    }
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full flex items-center justify-center bg-stone-950"
                >
                  <img
                    src={currentGallery[activeImageIndex]}
                    alt={`${project.title} - View ${activeImageIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {currentGallery.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(isFa ? 1 : -1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full photo-overlay-control transition-transform hover:scale-110 active:scale-95 z-20 cursor-pointer"
                    aria-label="Previous architectural visual"
                    title={isFa ? 'تصویر قبلی' : 'Previous visual'}
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => paginate(isFa ? -1 : 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full photo-overlay-control transition-transform hover:scale-110 active:scale-95 z-20 cursor-pointer"
                    aria-label="Next architectural visual"
                    title={isFa ? 'تصویر بعدی' : 'Next visual'}
                  >
                    <ChevronRight className="w-5 h-5 text-amber-400" />
                  </button>
                </>
              )}

              {/* Floating Top Info Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-lg photo-overlay-badge text-xs font-mono flex items-center gap-1.5 pointer-events-auto">
                  <MoveHorizontal className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{isFa ? 'ورق بزنید یا بکشید (Swipe / Drag)' : 'Swipe / Drag Enabled'}</span>
                </span>

                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-1.5 rounded-lg photo-overlay-control pointer-events-auto cursor-pointer"
                  title={isFa ? 'نمای تمام صفحه' : 'Fullscreen view'}
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Bottom Carousel Indicator & Count */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
                {/* Visual Dot Indicators */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-full photo-overlay-badge pointer-events-auto">
                  {currentGallery.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setDirection(dotIdx > activeImageIndex ? 1 : -1);
                        setActiveImageIndex(dotIdx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeImageIndex
                          ? 'w-6 bg-amber-400 shadow-sm'
                          : 'w-2 bg-stone-600 hover:bg-stone-400'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="px-3 py-1 rounded-lg photo-overlay-badge text-xs font-mono text-stone-200">
                  <span className="text-amber-400 font-bold">{activeImageIndex + 1}</span> / {currentGallery.length}
                </div>
              </div>

            </div>

            {/* Thumbnail Strip with Framer Animation */}
            {currentGallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none pt-1">
                {currentGallery.map((img, idx) => {
                  const isCur = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > activeImageIndex ? 1 : -1);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isCur
                          ? 'border-amber-400 opacity-100 scale-105 shadow-lg shadow-amber-500/10'
                          : 'border-stone-800 opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      {isCur && (
                        <div className="absolute inset-0 border-2 border-amber-400 rounded-xl" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fullscreen Lightbox Modal */}
          {isFullscreen && (
            <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4">
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/90 text-stone-200 hover:text-white border border-stone-700 z-50 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-w-6xl w-full max-h-[85vh] flex items-center justify-center">
                <img
                  src={currentGallery[activeImageIndex]}
                  alt={project.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-stone-800"
                />

                {currentGallery.length > 1 && (
                  <>
                    <button
                      onClick={() => paginate(isFa ? 1 : -1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 border border-stone-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => paginate(isFa ? -1 : 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 border border-stone-700 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 text-xs font-mono text-stone-400">
                {project.title} — {activeImageIndex + 1} of {currentGallery.length}
              </div>
            </div>
          )}

          {/* Tab Navigation with Timeline included */}
          <div className="flex border-b border-stone-800 gap-3 sm:gap-6 text-xs sm:text-sm overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview' ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              {isFa ? 'داستان معماری و کانسپت' : 'Design Narrative'}
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-2.5 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'timeline' ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isFa ? 'فازهای اجرا و زمان‌بندی' : 'Execution Timeline'}</span>
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-2.5 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'materials' ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              {isFa ? 'پالت متریال و بافت‌ها' : 'Materiality & Craft'}
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`pb-2.5 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'sustainability' ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              {isFa ? 'پایداری و اقلیم' : 'Climate & Ecology'}
            </button>
            {project.floorPlanImage && (
              <button
                onClick={() => setActiveTab('plans')}
                className={`pb-2.5 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'plans' ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {isFa ? 'نقشه‌ها و دیاگرام پلان' : 'Drawings & Plans'}
              </button>
            )}
          </div>

          {/* Tab 1: Overview & Narrative */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div>
                <h4 className="text-stone-100 font-bold text-base mb-2">
                  {isFa ? project.taglineFa : project.tagline}
                </h4>
                <p>{isFa ? project.descriptionFa : project.description}</p>
              </div>

              {/* Architectural Philosophy Callout */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-bold">
                  {isFa ? 'فلسفه طراحی و ایده معمارانه:' : 'Architectural Philosophy:'}
                </span>
                <p className="text-stone-200 italic font-serif text-sm sm:text-base">
                  "{isFa ? project.architecturalPhilosophyFa : project.architecturalPhilosophy}"
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                <h5 className="font-bold text-stone-100 text-xs uppercase tracking-wider">
                  {isFa ? 'شاخصه‌های برجسته طراحی و سازه:' : 'Key Design Interventions:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isFa ? project.keyFeaturesFa : project.keyFeatures).map((feat, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-stone-850 border border-stone-800 text-stone-300 text-xs flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards if any */}
              {project.awards && project.awards.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    <Award className="w-4 h-4" />
                    <span>{isFa ? 'افتخارات و جوایز کسب شده:' : 'Honors & Distinctions:'}</span>
                  </div>
                  <div className="text-stone-200 space-y-0.5">
                    {(isFa ? project.awardsFa || project.awards : project.awards).map((award, i) => (
                      <div key={i}>• {award}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Visual Construction Timeline Component */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <h4 className="font-bold text-stone-100 text-sm">
                    {isFa ? 'فرآیند گام‌به‌گام و چرخه حیات معماری پروژه' : 'Architectural Lifecycle & Milestone Road Map'}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isFa ? 'رویکرد مهندسی استودیو آتریا از کانسپت اولیه تا تحویل نهایی کلید' : 'Standard rigorous milestones applied to this project typography'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800 w-fit">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isFa ? 'مدت کل اجرای طرح: حدود ۱۶ ماه' : 'Total Cycle: ~16 Months'}</span>
                </div>
              </div>

              {/* Stepped Visual Timeline */}
              <div className="relative space-y-6 before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/50 before:to-stone-800">
                {timelinePhases.map((phase, idx) => {
                  const PhaseIcon = phase.icon;
                  return (
                    <div key={phase.id} className="relative flex items-start gap-4 sm:gap-6 group">
                      {/* Node Icon */}
                      <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-950 border-2 border-amber-400 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform">
                        <PhaseIcon className="w-4 h-4" />
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400/40 transition-colors space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-stone-950">
                              {phase.phaseNum}
                            </span>
                            <h5 className="font-bold text-stone-100 text-xs sm:text-sm">
                              {isFa ? phase.titleFa : phase.titleEn}
                            </h5>
                          </div>
                          <span className="text-[11px] font-mono text-stone-400">
                            {phase.duration}
                          </span>
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed">
                          {isFa ? phase.deliverablesFa : phase.deliverablesEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Materials */}
          {activeTab === 'materials' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-400">
                {isFa
                  ? 'انتخاب متریال‌ها در استودیو آتریا بر پایه اصالت بافت، ماندگاری قرن‌محور، رفتار در برابر اقلیم محلی و ایجاد تجربه لمسی غنی شکل می‌گیرد.'
                  : 'Materials are selected for their honest structural expression, geological permanence, and tactile depth.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.materials.map((mat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="font-bold text-stone-100 text-xs sm:text-sm">
                      {isFa ? mat.nameFa : mat.name}
                    </div>
                    <div className="text-[11px] text-stone-400 flex items-center justify-between">
                      <span>{isFa ? `کاربری: ${mat.type}` : `Application: ${mat.type}`}</span>
                      <span className="font-mono text-amber-400">{mat.origin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Sustainability */}
          {activeTab === 'sustainability' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-300">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Leaf className="w-4 h-4" />
                  <span>{isFa ? 'رویکرد زیست‌محیطی و بهره‌وری انرژی' : 'Environmental Performance'}</span>
                </div>
                <div className="text-stone-200">
                  <span className="font-semibold">{isFa ? 'رتبه پایداری: ' : 'Rating: '}</span>
                  <span className="font-mono text-emerald-300">{project.sustainabilityRating}</span>
                </div>
                <p className="text-stone-300 text-xs">
                  {isFa ? project.climateApproachFa : project.climateApproach}
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Plans */}
          {activeTab === 'plans' && project.floorPlanImage && (
            <div className="space-y-3">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center p-2">
                <img
                  src={project.floorPlanImage}
                  alt="Architectural Floor Plan Schematic"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain filter invert opacity-90"
                />
              </div>
              <p className="text-[11px] text-stone-400 text-center font-mono">
                {isFa ? 'دیاگرام مفهومی جانمایی فضاها و دسترسی‌های پروژه' : 'Conceptual Zoning & Circulation Schematic Plan'}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

