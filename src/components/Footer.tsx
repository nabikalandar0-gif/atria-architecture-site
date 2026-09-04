import React from 'react';
import { Language } from '../types';
import { STUDIO_INFO } from '../data/atriaData';
import { Compass, Phone, Mail, MapPin, Instagram, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenConsultation }) => {
  const isFa = language === 'fa';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-stone-100 font-mono tracking-wider">
                ATRIA ARCHITECTURE
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              {isFa
                ? 'استودیو معماری، طراحی سازه و نظارت عالیه آتریا؛ خالق ویلاهای اختصاصی، برج‌باغ‌ها و فضاهای ماندگار با استانداردهای مهندسی روز دنیا.'
                : 'Atria Architecture & Design Studio — shaping radical residential sanctuaries, vertical gardens, and corporate landmarks.'}
            </p>

            <div className="text-[11px] text-amber-400 font-mono">
              {isFa ? 'تأسیس: ۱۳۹۳ (تهران و دبی)' : 'Est. 2014 • Tehran & Dubai'}
            </div>
          </div>

          {/* Tehran Atelier */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-100 text-xs uppercase tracking-wider font-mono text-amber-400">
              {isFa ? 'آتلیه و دفتر مرکزی تهران' : 'Tehran Atelier & HQ'}
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.addressFa}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="tel:09389951723"
                  className="font-mono text-stone-200 hover:text-amber-400 font-semibold transition-colors dir-ltr"
                >
                  0938 995 1723
                </a>
              </div>
            </div>
          </div>

          {/* Dubai Office */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-100 text-xs uppercase tracking-wider font-mono text-amber-400">
              {isFa ? 'دفتر بین‌الملل دبی' : 'Dubai Design Studio'}
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Downtown Dubai Design District (d3), Building 4, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a
                  href={`tel:${STUDIO_INFO.phoneDubai}`}
                  className="font-mono hover:text-amber-400 transition-colors dir-ltr"
                >
                  {STUDIO_INFO.phoneDubai}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Connect & Consultation */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-100 text-xs uppercase tracking-wider font-mono text-amber-400">
              {isFa ? 'ارتباط مستقیم و ثبت پروژه' : 'Direct Inquiries'}
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:nabikalandar0@gmail.com"
                  className="font-mono text-stone-200 hover:text-amber-400 text-xs break-all transition-colors"
                >
                  nabikalandar0@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="tel:09389951723"
                  className="font-mono text-stone-200 hover:text-amber-400 font-bold transition-colors"
                >
                  {isFa ? 'تماس / واتس‌اپ: ۰۹۳۸۹۹۵۱۷۲۳' : 'Mobile / WhatsApp: 09389951723'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="font-mono">{STUDIO_INFO.instagram}</span>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 text-amber-400 border border-stone-700 hover:border-amber-400/50 font-bold text-xs transition-all cursor-pointer"
            >
              {isFa ? 'درخواست جلسه مشاوره' : 'Request Consultation'}
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} ATRIA ARCHITECTURE & DESIGN STUDIO. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>{isFa ? 'بازگشت به بالای صفحه' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
