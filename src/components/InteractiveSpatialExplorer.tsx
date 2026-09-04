import React, { useState } from 'react';
import { Language } from '../types';
import { Layers, Sun, Volume2, ShieldCheck, Sparkles, Compass, Eye } from 'lucide-react';

interface InteractiveSpatialExplorerProps {
  language: Language;
}

interface SpatialZone {
  id: string;
  level: string;
  levelFa: string;
  name: string;
  nameFa: string;
  areaSqm: number;
  orientation: string;
  orientationFa: string;
  acousticLevel: string;
  descriptionEn: string;
  descriptionFa: string;
  materialsEn: string;
  materialsFa: string;
  image: string;
}

const ZONES_DATA: SpatialZone[] = [
  {
    id: 'atrium-living',
    level: 'Ground Level (L0)',
    levelFa: 'طبقه همکف (تراز باغ و استخر)',
    name: 'Double-Height Living & Central Zen Atrium',
    nameFa: 'سالن نشیمن دوبلکس و آتریوم مرکزی زردراز',
    areaSqm: 180,
    orientation: 'South-Southwest (Optimized Winter Solar Gain)',
    orientationFa: 'جنوب و جنوب غربی (بیشترین دریافت نور طبیعی زمستان)',
    acousticLevel: 'Reverberation < 0.45s (Acoustic micro-slatted ceiling)',
    descriptionEn: 'The monumental core of the villa featuring a 6.8m soaring void, operable skylights, a living ancient olive tree, and 12-meter frameless sliding glass pocket walls opening to the infinity pool terrace.',
    descriptionFa: 'قلب تپنده عمارت با ارتفاع سقف ۶.۸ متر، سقف شیشه‌ای بازشو، درخت زیتون کهنسال در گودال‌باغچه و پنجره‌های اسلایدی ۱۲ متری که به عرشه استخر بی‌نهایت باز می‌شوند.',
    materialsEn: 'Silver Travertine slabs, Acoustic brushed walnut slats, Fair-faced concrete column',
    materialsFa: 'سنگ تراورتن سیلور، اسلت‌های چوب گردوی جاذب صوت، ستون بتن اکسپوز صیقلی',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'master-wing',
    level: 'Upper Level (L+1)',
    levelFa: 'طبقه اول (تراز خصوصی)',
    name: 'Royal Master Sanctuary & Cantilevered Terrace',
    nameFa: 'مستر سوئیت شاه‌نشین با تراس معلق کوهستان',
    areaSqm: 120,
    orientation: 'East-Northeast (Morning Sunrise & Mountain Panorama)',
    orientationFa: 'شرق و شمال شرق (طلوع خورشید و منظره ابدی کوه‌ها)',
    acousticLevel: 'Sound Isolation STC 58 (Triple-stud insulated walls)',
    descriptionEn: 'A secluded private sanctuary encompassing a walk-through dressing salon, bespoke marble fireplace, Japanese soaking tub with unobstructed mountain vista, and a shaded cantilevered terrace.',
    descriptionFa: 'پناهگاهی کاملاً خصوصی شامل کلوزت روم بزرگ با شیشه‌های دودی، شومینه گازی خطی مرمریت، وان سنگی ژاپنی با دید آزاد به دره و تراس سایه‌انداز معلق.',
    materialsEn: 'Smoked European Oak flooring, Bookmatched Calacatta Marble, Brushed Bronze fixtures',
    materialsFa: 'پارکت چوب بلوط دودی اروپایی، اسلب‌های بوک‌مچ کالاکاتا، یراق‌آلات برنز مات',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wellness-spa',
    level: 'Subterranean (L-1)',
    levelFa: 'تراز زیرزمین (فضای اسپا و آرامش)',
    name: 'Thermal Wellness Pavilion & Subterranean Lap Pool',
    nameFa: 'مجموعه اسپا، سونا خشک ارگانیک و استخر صخره‌ای',
    areaSqm: 220,
    orientation: 'Filtered North Light through sunken courtyard',
    orientationFa: 'نور غیرمستقیم شمال از طریق گودال‌باغچه اختصاصی',
    acousticLevel: 'Complete acoustic isolation with sound-absorbing basalt rock',
    descriptionEn: 'Carved directly into the hillside bedrock, this spa features a heated saltwater lap pool, cedar Finnish sauna, Turkish steam hammam, and natural rock waterfall.',
    descriptionFa: 'تعبیه‌شده در دل بستر سنگی کوه با استخر آب‌شور چهارفصل، سونای خشک چوب سدر فنلاندی، حمام سنتی ترکی، جکوزی ماساژور و آبشار صخره‌ای طبیعی.',
    materialsEn: 'Honed Charcoal Basalt, Solid Western Red Cedar, Micro-cement wall finishes',
    materialsFa: 'سنگ بازالت زغالی هوند، چوب سدر سرخ کانادایی، پوشش‌های میکروسمنت ضدآب',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'rooftop-skyline',
    level: 'Sky Roof Pavilion (L+2)',
    levelFa: 'روف‌گاردن و پاویون آسمان',
    name: '360° Panoramic Sky Lounge & Stargazing Firepit',
    nameFa: 'اسکای‌لانژ ۳۶۰ درجه و نشیمن آتش‌دان چهارفصل',
    areaSqm: 160,
    orientation: 'Unobstructed 360° Horizon View',
    orientationFa: 'دید افق کامل ۳۶۰ درجه به شهر و رشته‌کوه',
    acousticLevel: 'Wind-attenuating glass balustrade barriers',
    descriptionEn: 'An elevated outdoor living pavilion equipped with a full outdoor kitchen, heated plunge jacuzzi, fire pit seating, and native drought-tolerant landscaping.',
    descriptionFa: 'پاویون نشیمن روباز بر فراز ساختمان مجهز به آشپزخانه و باربیکیو فضای باز، جکوزی گرم، نشیمن آتش‌دان با دیواره‌های شیشه‌ای بادشکن و فضای سبز بومی.',
    materialsEn: 'Thermal-treated Ash decking, Weathered Corten Steel planters, Granite countertops',
    materialsFa: 'ترمووود فنلاندی ضد تابش، گلدان‌های فولاد کورتن زنگارپذیر، صفحات گرانیت مشکی',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
];

export const InteractiveSpatialExplorer: React.FC<InteractiveSpatialExplorerProps> = ({ language }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('atrium-living');
  const isFa = language === 'fa';

  const currentZone = ZONES_DATA.find((z) => z.id === selectedZoneId) || ZONES_DATA[0];

  return (
    <section id="spatial-explorer" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>{isFa ? 'آناتومی فضایی و دیاگرام معماری' : 'SPATIAL ANATOMY & ZONING PROGRAM'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              {isFa ? 'کالبدشکافی هوشمند زون‌های اقامتی آتریا' : 'Anatomy of an Atria Signature Sanctuary'}
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-2xl">
              {isFa
                ? 'سطوح مختلف یک اقامتگاه آتریا را انتخاب کنید تا چگونگی ترکیب نور، آکوستیک، متریال‌ها و حریم خصوصی را بررسی فرمایید.'
                : 'Explore the spatial choreography, daylight ingress, and acoustic zoning across the distinct vertical layers of an Atria estate.'}
            </p>
          </div>
        </div>

        {/* Level / Zone Selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {ZONES_DATA.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-400 shadow-lg shadow-amber-500/5'
                    : 'bg-stone-900/50 border-stone-800 hover:border-stone-700 text-stone-400'
                }`}
              >
                <div>
                  <span className={`text-[11px] font-mono font-bold block ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                    {isFa ? zone.levelFa : zone.level}
                  </span>
                  <div className={`font-bold text-xs sm:text-sm mt-1 leading-snug ${isSelected ? 'text-stone-100' : 'text-stone-300'}`}>
                    {isFa ? zone.nameFa : zone.name}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span>{zone.areaSqm} m²</span>
                  <span className={isSelected ? 'text-amber-400' : 'text-stone-600'}>● Active</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Zone Detail Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-2xl">
          
          {/* Spatial Visual & Diagram (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-inner">
              <img
                src={currentZone.image}
                alt={currentZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded bg-stone-950/80 backdrop-blur-md border border-stone-800 text-xs font-mono text-amber-400">
                {isFa ? currentZone.levelFa : currentZone.level}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isFa ? currentZone.descriptionFa : currentZone.descriptionEn}
            </p>
          </div>

          {/* Environmental Specs & Materiality Matrix (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                {isFa ? 'مشخصات فنی و تحلیل اقلیمی زون' : 'ZONAL METRICS & MICROCLIMATE'}
              </span>
              <h3 className="text-lg font-bold text-stone-100 mt-1">
                {isFa ? currentZone.nameFa : currentZone.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Daylight / Solar Orientation */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px] uppercase font-mono">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{isFa ? 'جهت‌گیری تابش نور و آفتاب:' : 'Daylight & Sun Path:'}</span>
                </div>
                <div className="text-stone-200">{isFa ? currentZone.orientationFa : currentZone.orientation}</div>
              </div>

              {/* Acoustic Rating */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-[11px] uppercase font-mono">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isFa ? 'عایق‌بندی آکوستیک و زمان واخنش:' : 'Acoustic Control:'}</span>
                </div>
                <div className="text-stone-200">{currentZone.acousticLevel}</div>
              </div>

              {/* Material Composition */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] uppercase font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ترکیب متریال‌ها و بافت غالب:' : 'Material Palette:'}</span>
                </div>
                <div className="text-stone-300 font-mono text-[11px]">
                  {isFa ? currentZone.materialsFa : currentZone.materialsEn}
                </div>
              </div>

            </div>

            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between font-mono">
              <span>{isFa ? 'طراحی مدولار و پارامتریک' : 'Modular Parametric Layout'}</span>
              <span>Atria Standard v2.4</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
