import React, { useState } from 'react';
import { Language } from '../types';
import { STUDIO_INFO } from '../data/atriaData';
import { X, Phone, Calendar, Mail, MapPin, CheckCircle, Send, MessageSquare, Sparkles, Building } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTopic = '',
}) => {
  const isFa = language === 'fa';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Villa / Estate Design',
    location: '',
    estimatedArea: '',
    meetingType: 'atelier',
    notes: initialTopic ? `Inquiry regarding: ${initialTopic}` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm sm:text-base">
                {isFa ? 'رزرو جلسه مشاوره و طراحی معماری' : 'Book Architectural Consultation'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {isFa ? 'استودیو معماری و طراحی ساختمان آتریا' : 'Atria Architecture Studio'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-stone-100">
                {isFa ? 'درخواست مشاوره شما با موفقیت ثبت شد' : 'Consultation Request Registered'}
              </h4>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                {isFa
                  ? 'کارشناسان ارشد استودیو معماری آتریا ظرف ۲ ساعت کاری با شما تماس گرفته و هماهنگی‌های لازم جهت بازدید از زمین یا جلسه در آتلیه را انجام خواهند داد.'
                  : 'Our senior architects will contact you within 2 business hours to confirm your project brief and schedule the session.'}
              </p>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-400 space-y-1">
                <div>{isFa ? 'تماس مستقیم با دبیرخانه آتلیه:' : 'Direct Studio Line:'}</div>
                <div className="font-mono text-amber-400 font-bold text-sm">
                  {STUDIO_INFO.phone}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-white text-stone-950 text-xs font-bold transition-all cursor-pointer"
              >
                {isFa ? 'بستن پنجره' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {initialTopic && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <span className="font-bold">{isFa ? 'موضوع ارجاعی: ' : 'Referenced Subject: '}</span>
                  {initialTopic}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1 font-medium">
                    {isFa ? 'نام و نام خانوادگی:' : 'Full Name:'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isFa ? 'مثال: مهندس رادمهر' : 'e.g. David Vance'}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1 font-medium">
                    {isFa ? 'شماره تماس همراه:' : 'Mobile Number:'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+98 912 000 0000"
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Email & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1 font-medium">
                    {isFa ? 'آدرس ایمیل:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@domain.com"
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1 font-medium">
                    {isFa ? 'موقعیت زمین / ملک:' : 'Project Location / City:'}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={isFa ? 'مثال: لواسان، زعفرانیه، کیش، دبی' : 'e.g. Lavasan, Tehran, Dubai'}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Meeting Type */}
              <div>
                <label className="block text-xs text-stone-400 mb-1 font-medium">
                  {isFa ? 'نوع جلسه مشاوره مدنظر:' : 'Preferred Meeting Format:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'atelier', labelEn: 'Atelier Visit', labelFa: 'حضوری در آتلیه زعفرانیه' },
                    { id: 'site', labelEn: 'On-Site Inspection', labelFa: 'بازدید از زمین پروژه' },
                    { id: 'online', labelEn: 'Online Video', labelFa: 'جلسه آنلاین تصویری' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setFormData({ ...formData, meetingType: m.id })}
                      className={`p-2 rounded-lg text-[11px] font-medium border transition-all cursor-pointer text-center ${
                        formData.meetingType === m.id
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-500'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {isFa ? m.labelFa : m.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Brief Notes */}
              <div>
                <label className="block text-xs text-stone-400 mb-1 font-medium">
                  {isFa ? 'توضیحات و نیازمندی‌های اولیه پروژه:' : 'Project Notes / Scope:'}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isFa ? 'متراژ حدودی، تعداد طبقات یا خواسته‌های شاخص...' : 'Approximate plot area, floors, unique requirements...'}
                  className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-stone-950" />
                <span>{isFa ? 'ثبت و ارسال درخواست مشاوره' : 'Submit Consultation Request'}</span>
              </button>

              {/* Direct Hotline strip */}
              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFa ? 'تماس مستقیم:' : 'Direct Phone:'}</span>
                  <a href="tel:09389951723" className="font-mono text-amber-400 hover:underline font-bold dir-ltr">
                    0938 995 1723
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <a href="mailto:nabikalandar0@gmail.com" className="font-mono text-stone-300 hover:text-amber-400">
                    nabikalandar0@gmail.com
                  </a>
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
