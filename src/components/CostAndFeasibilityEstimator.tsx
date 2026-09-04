import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Building2, Layers, DollarSign } from 'lucide-react';

interface CostAndFeasibilityEstimatorProps {
  language: Language;
  onBookConsultationWithData: (summary: string) => void;
}

export const CostAndFeasibilityEstimator: React.FC<CostAndFeasibilityEstimatorProps> = ({
  language,
  onBookConsultationWithData,
}) => {
  const isFa = language === 'fa';

  const [projectType, setProjectType] = useState<'villa' | 'residential' | 'commercial' | 'renovation' | 'interior'>('villa');
  const [plotArea, setPlotArea] = useState<number>(800);
  const [targetBuiltArea, setTargetBuiltArea] = useState<number>(1100);
  const [location, setLocation] = useState<string>('lavasan');
  const [finishGrade, setFinishGrade] = useState<'ultra' | 'signature' | 'contemporary'>('ultra');

  const locationOptions = [
    { id: 'lavasan', labelEn: 'Lavasan & Damavand Foothills', labelFa: 'لواسان، فشم و دامنه‌های البرز', multiplier: 1.15 },
    { id: 'shemiran', labelEn: 'North Tehran (Zaferanieh / Niavaran / Elahiyeh)', labelFa: 'شمال تهران (زعفرانیه، نیاوران، الهیه)', multiplier: 1.2 },
    { id: 'kish', labelEn: 'Kish Island & Coastal Gulf', labelFa: 'جزیره کیش و سواحل خلیج فارس', multiplier: 1.18 },
    { id: 'caspian', labelEn: 'Caspian Sea Coast (Mazandaran / Gilan)', labelFa: 'نوار ساحلی و جنگلی مازندران و گیلان', multiplier: 1.05 },
    { id: 'dubai', labelEn: 'Dubai / UAE International', labelFa: 'دبی و امارات متحده عربی', multiplier: 1.45 },
    { id: 'other', labelEn: 'Other Prime Locations', labelFa: 'سایر شهرهای اصلی', multiplier: 1.0 },
  ];

  const calculations = useMemo(() => {
    const loc = locationOptions.find((l) => l.id === location) || locationOptions[0];
    
    // Base design timeline in weeks
    let designWeeks = 12;
    if (targetBuiltArea > 2000) designWeeks = 20;
    else if (targetBuiltArea > 1000) designWeeks = 16;
    else if (targetBuiltArea < 500) designWeeks = 9;

    // Construction turnaround estimate in months
    let buildMonths = 14;
    if (projectType === 'renovation') buildMonths = Math.round(targetBuiltArea / 100) + 4;
    else if (projectType === 'interior') buildMonths = Math.round(targetBuiltArea / 150) + 3;
    else buildMonths = Math.round((targetBuiltArea / 80) * loc.multiplier) + 8;

    // Finish grade attributes
    const grades = {
      ultra: {
        titleFa: 'سوپرلوکس سفارشی (Ultra-Luxury Bespoke)',
        titleEn: 'Ultra-Luxury Bespoke Tier',
        featuresFa: ['بتن اکسپوز خودتراکم و سنگ‌های طبیعی بوک‌مچ اسلب', 'شیشه‌های سه‌جداره کف تا سقف Low-E بدون فریم', 'سیستم تمام هوشمند BMS اشنایدر / KNX', 'اسپا، استخر معلق و چوب‌های طبیعی فرآوری‌شده'],
        featuresEn: ['Self-compacting concrete & bookmatched marble slabs', 'Floor-to-ceiling frameless Low-E curtain walls', 'Full KNX / Schneider integrated smart automation', 'Subterranean spa, infinity cantilever pool & teak decks'],
      },
      signature: {
        titleFa: 'سیگنچر پرمیوم (Atria Signature Premium)',
        titleEn: 'Atria Signature Premium Tier',
        featuresFa: ['آجرچینی دست‌ساز پارامتریک و میکروسمنت اروپایی', 'پنجره‌های ترمال‌بریک آلومینیومی شوکو', 'روف‌گاردن چهارفصل با سیستم آبیاری قطره‌ای هوشمند', 'عایق‌بندی کامل حرارتی و صوتی بر پایه اقلیم'],
        featuresEn: ['Hand-fired parametric brickwork & microcement', 'Schüco thermal-break slimline aluminum windows', 'All-season rooftop garden with automated irrigation', 'Comprehensive acoustic and climate thermal envelope'],
      },
      contemporary: {
        titleFa: 'مدرن مینیمال معاصر (Contemporary Modern)',
        titleEn: 'Contemporary Modern Tier',
        featuresFa: ['احجام خالص معماری مینیمال با نورگیری بهینه', 'پلان‌های باز با انعطاف‌پذیری کاربری فضا', 'متریال‌های پایدار با دوام بالا و نگهداری آسان', 'بهره‌گیری از نور طبیعی و تهویه متقابل'],
        featuresEn: ['Pure minimal architectural volumes with optimal daylight', 'Open-plan flexible zoning with high ceilings', 'Sustainable, low-maintenance authentic materials', 'Natural cross-ventilation and passive energy efficiency'],
      },
    };

    return {
      designWeeks,
      buildMonths: Math.min(buildMonths, 36),
      gradeInfo: grades[finishGrade],
      selectedLocation: loc,
    };
  }, [projectType, targetBuiltArea, location, finishGrade]);

  const handleBookConsultation = () => {
    const summary = `${isFa ? 'نوع پروژه' : 'Project Type'}: ${projectType} | ${isFa ? 'متراژ بنا' : 'Built Area'}: ${targetBuiltArea}m² | ${isFa ? 'موقعیت' : 'Location'}: ${calculations.selectedLocation.labelEn} | ${isFa ? 'گرید اجرایی' : 'Finish Grade'}: ${finishGrade}`;
    onBookConsultationWithData(summary);
  };

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-stone-900/40 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <Calculator className="w-4 h-4" />
            <span>{isFa ? 'محاسبه‌گر فنی، زمانی و امکان‌سنجی اولیه' : 'FEASIBILITY, SCOPE & TIMELINE ESTIMATOR'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            {isFa ? 'برآورد هوشمند پروژه و زمان‌بندی ساخت' : 'Project Feasibility & Scope Simulator'}
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            {isFa
              ? 'مشخصات زمین یا پروژه خود را وارد کنید تا برآورد مراحل طراحی، فازبندی اجرا و استاندارد متریال‌ها را دریافت فرمایید.'
              : 'Configure your plot size, location, and finish tier to generate estimated design milestones and technical specifications.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Project Typology */}
            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 tracking-wider mb-2 font-semibold">
                1. {isFa ? 'نوع کاربری پروژه:' : 'Project Typology:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'villa', labelEn: 'Luxury Villa / Estate', labelFa: 'ویلا و عمارت لوکس' },
                  { id: 'residential', labelEn: 'Residential Tower / Garden', labelFa: 'برج‌باغ و آپارتمان' },
                  { id: 'commercial', labelEn: 'Commercial / Office HQ', labelFa: 'تجاری و اداری' },
                  { id: 'renovation', labelEn: 'Villa / Building Renovation', labelFa: 'بازسازی و نوسازی کامل' },
                  { id: 'interior', labelEn: 'Interior / Penthouse', labelFa: 'طراحی داخلی و پنت‌هاوس' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProjectType(t.id as any)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      projectType === t.id
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-sm'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    {isFa ? t.labelFa : t.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Built Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-stone-400 tracking-wider font-semibold">
                  2. {isFa ? 'زیربنای کل طراحی (مترمربع):' : 'Estimated Built-Up Area (m²):'}
                </label>
                <span className="font-mono text-sm font-bold text-amber-400 bg-stone-900 px-2.5 py-1 rounded border border-stone-800">
                  {targetBuiltArea.toLocaleString()} m²
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={targetBuiltArea}
                onChange={(e) => setTargetBuiltArea(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                <span>200 m²</span>
                <span>1,500 m²</span>
                <span>3,000 m²</span>
                <span>5,000+ m²</span>
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 tracking-wider mb-2 font-semibold">
                3. {isFa ? 'موقعیت جغرافیایی و اقلیم زمین:' : 'Geographic Location & Climate:'}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs sm:text-sm text-stone-100 focus:border-amber-400 focus:outline-none"
              >
                {locationOptions.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {isFa ? loc.labelFa : loc.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Finish Tier */}
            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 tracking-wider mb-2 font-semibold">
                4. {isFa ? 'سطح کیفی و متریال‌های مد نظر:' : 'Material & Execution Tier:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'ultra', titleEn: 'Ultra-Luxury', titleFa: 'سوپرلوکس سفارشی' },
                  { id: 'signature', titleEn: 'Atria Signature', titleFa: 'سیگنچر پرمیوم' },
                  { id: 'contemporary', titleEn: 'Contemporary', titleFa: 'مدرن مینیمال' },
                ].map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setFinishGrade(grade.id as any)}
                    className={`p-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      finishGrade === grade.id
                        ? 'bg-stone-100 text-stone-950 font-bold border-white'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {isFa ? grade.titleFa : grade.titleEn}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-bold">
                {isFa ? 'خلاصه زمان‌بندی و مشخصات فنی' : 'PROJECT SCOPE & TIMELINE'}
              </span>
              <h3 className="text-xl font-black text-stone-100 mt-1">
                {isFa ? calculations.gradeInfo.titleFa : calculations.gradeInfo.titleEn}
              </h3>
            </div>

            {/* Timeline Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFa ? 'زمان طراحی کامل:' : 'Design Phase:'}</span>
                </div>
                <div className="font-mono font-bold text-base text-stone-100">
                  {calculations.designWeeks} {isFa ? 'هفته' : 'Weeks'}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {isFa ? 'فاز ۱ (کانسپت) + فاز ۲ (اجرایی)' : 'Schematic + Detailed BIM'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isFa ? 'تخمین دوره ساخت:' : 'Construction:'}</span>
                </div>
                <div className="font-mono font-bold text-base text-stone-100">
                  {calculations.buildMonths} {isFa ? 'ماه' : 'Months'}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {isFa ? 'سفت‌کاری تا تحویل نهایی' : 'Turnkey execution'}
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-stone-400 tracking-wider block font-semibold">
                {isFa ? 'استانداردها و مشخصات این گرید:' : 'Included Architectural Standards:'}
              </span>
              <div className="space-y-1.5">
                {(isFa ? calculations.gradeInfo.featuresFa : calculations.gradeInfo.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to Consult */}
            <div className="pt-2">
              <button
                onClick={handleBookConsultation}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{isFa ? 'درخواست جلسه مشاوره و بررسی این متراژ' : 'Book Consultation for this Scope'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
