import React, { useState } from 'react';
import { AIConsultationResponse, Language } from '../types';
import { Sparkles, Compass, Sun, Layers, Loader2, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface AISpatialConsultantProps {
  language: Language;
  onBookConsultation: (conceptTitle: string) => void;
}

export const AISpatialConsultant: React.FC<AISpatialConsultantProps> = ({
  language,
  onBookConsultation,
}) => {
  const isFa = language === 'fa';

  const [projectType, setProjectType] = useState('Luxury Hillside Villa');
  const [plotArea, setPlotArea] = useState('1000');
  const [builtArea, setBuiltArea] = useState('1400');
  const [location, setLocation] = useState('Lavasan / Damavand Foothills');
  const [topography, setTopography] = useState('30° Steep Mountain Slope facing South');
  const [architecturalStyle, setArchitecturalStyle] = useState('Warm Minimalist Concrete & Biophilic Courtyard');
  const [clientVision, setClientVision] = useState(
    'Double-height central living with natural olive tree atrium, cantilevered infinity pool overlooking the valley, underground thermal spa, and 4 master suites.'
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIConsultationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/architectural-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          plotArea: Number(plotArea) || 1000,
          builtArea: Number(builtArea) || 1400,
          location,
          topography,
          architecturalStyle,
          clientVision,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate spatial concept. Please try again.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error communicating with Atria AI Spatial Lab');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{isFa ? 'آزمایشگاه هوش مصنوعی و امکان‌سنجی فضا' : 'ATRIA AI SPATIAL LAB & CONCEPT ENGINE'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-100 tracking-tight">
            {isFa ? 'امکان‌سنجی و برنامه‌ریزی کانسپت معمارانه' : 'AI Architectural Concept Feasibility'}
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            {isFa
              ? 'مشخصات بستر زمین و نیازهای فضایی خود را وارد کنید تا هوش مصنوعی استودیو آتریا، برنامه فیزیکی، استراتژی اقلیمی و پالت متریال اختصاصی شما را تدوین کند.'
              : 'Provide your plot topography, desired aesthetic, and lifestyle requirements to synthesize a tailored architectural feasibility brief.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Form (5 Cols) */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-mono uppercase text-stone-300 font-bold">
                {isFa ? 'پارامترهای بستر و پروژه' : 'PROJECT SPECIFICATIONS'}
              </span>
              <span className="text-[10px] text-amber-400 font-mono">Gemini 2.5 Pro</span>
            </div>

            {/* Project Typology */}
            <div>
              <label className="block text-xs text-stone-400 mb-1">
                {isFa ? 'نوع پروژه / کاربری:' : 'Project Typology:'}
              </label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g. Luxury Hillside Villa / Penthouse"
                className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Plot & Built Area */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-stone-400 mb-1">
                  {isFa ? 'مساحت زمین (m²):' : 'Plot Area (m²):'}
                </label>
                <input
                  type="number"
                  value={plotArea}
                  onChange={(e) => setPlotArea(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">
                  {isFa ? 'زیربنای مدنظر (m²):' : 'Built-up Area (m²):'}
                </label>
                <input
                  type="number"
                  value={builtArea}
                  onChange={(e) => setBuiltArea(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Location & Topography */}
            <div>
              <label className="block text-xs text-stone-400 mb-1">
                {isFa ? 'موقعیت و توپوگرافی بستر:' : 'Location & Terrain Topography:'}
              </label>
              <input
                type="text"
                value={topography}
                onChange={(e) => setTopography(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Desired Architectural Style */}
            <div>
              <label className="block text-xs text-stone-400 mb-1">
                {isFa ? 'سبک معماری و حس‌وحال فضا:' : 'Architectural Language / Mood:'}
              </label>
              <input
                type="text"
                value={architecturalStyle}
                onChange={(e) => setArchitecturalStyle(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Client Vision Notes */}
            <div>
              <label className="block text-xs text-stone-400 mb-1">
                {isFa ? 'خواسته‌ها و نیازهای خاص شما:' : 'Client Vision & Key Desired Features:'}
              </label>
              <textarea
                rows={3}
                value={clientVision}
                onChange={(e) => setClientVision(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>{isFa ? 'در حال تحلیل بستر و پردازش کانسپت...' : 'Synthesizing Architectural Brief...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>{isFa ? 'تولید برنامه فیزیکی و کانسپت' : 'Generate Architectural Brief'}</span>
                </>
              )}
            </button>
          </form>

          {/* Result Output Display (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 min-h-[480px] flex flex-col justify-between shadow-2xl">
            
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-16">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-sm font-semibold text-stone-200">
                  {isFa ? 'تحلیل هندسه زمین، مسیر حرکت آفتاب و پالت متریال...' : 'Analyzing solar azimuth, topography, and tectonic program...'}
                </p>
                <p className="text-xs text-stone-500">Atria Generative Spatial AI</p>
              </div>
            )}

            {error && !loading && (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800 text-rose-300 text-xs">
                {error}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16 space-y-3 text-stone-500">
                <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400/60">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-300">
                  {isFa ? 'پروپوزال هوشمند معماری آماده تولید است' : 'Ready for Architectural Synthesis'}
                </h4>
                <p className="text-xs max-w-sm">
                  {isFa
                    ? 'فرم را تکمیل کرده و دکمه تولید را بزنید تا برنامه فیزیکی دقیق و ایده کانسپت استودیو آتریا را دریافت کنید.'
                    : 'Fill in your plot parameters on the left to generate an instant executive architectural proposal.'}
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Concept Header */}
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-bold">
                    {isFa ? 'پروپوزال کانسپت و برنامه فیزیکی اختصاصی' : 'EXECUTIVE CONCEPT PROPOSAL'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-100 mt-1 font-serif">
                    {result.conceptTitle}
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed italic">
                    "{result.designPhilosophy}"
                  </p>
                </div>

                {/* Spatial Zoning Matrix */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-stone-400 font-bold block">
                    {isFa ? 'برنامه فیزیکی و تفکیک زون‌ها:' : 'Spatial Zoning Program:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.spatialZoning.map((zone, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-stone-200">
                          <span>{zone.zoneName}</span>
                          <span className="font-mono text-amber-400 text-[11px]">{zone.areaSqm} m²</span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2">{zone.description}</p>
                        <div className="text-[10px] text-stone-500 font-mono">
                          ☀️ {zone.daylightOrientation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passive Climate Strategies */}
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
                    <Sun className="w-3.5 h-3.5" />
                    <span>{isFa ? 'استراتژی‌های اقلیمی و تهویه طبیعی:' : 'Passive Climate & Solar Strategies:'}</span>
                  </div>
                  <div className="space-y-1 text-stone-300">
                    {result.climateAndPassiveStrategies.map((strat, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{strat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Lead Advice */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                  <span className="font-bold text-amber-400 block font-mono">
                    {isFa ? '💡 توصیه سرپرست معماران آتریا:' : 'Lead Architect Guidance:'}
                  </span>
                  <p className="text-stone-200 leading-relaxed">{result.leadArchitectAdvice}</p>
                </div>

                {/* Direct CTA */}
                <button
                  onClick={() => onBookConsultation(result.conceptTitle)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>{isFa ? 'رزرو جلسه حضوری برای ارزیابی دقیق این طرح' : 'Book Consultation for this Concept'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
