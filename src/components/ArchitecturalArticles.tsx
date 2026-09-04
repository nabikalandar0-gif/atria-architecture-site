import React, { useState, useMemo } from 'react';
import { ArchitecturalArticle, Language } from '../types';
import { ARCHITECTURAL_ARTICLES } from '../data/articlesData';
import { 
  BookOpen, Clock, Calendar, ArrowUpRight, HelpCircle, Sparkles, 
  ChevronDown, ChevronUp, Search, Filter, CheckCircle2, ShieldAlert,
  Layers, Tag, X, ArrowLeft, ArrowRight, Share2, MessageSquare, Phone
} from 'lucide-react';

interface ArchitecturalArticlesProps {
  language: Language;
  onBookConsultation: (topic: string) => void;
}

export const ArchitecturalArticles: React.FC<ArchitecturalArticlesProps> = ({
  language,
  onBookConsultation,
}) => {
  const isFa = language === 'fa';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ArchitecturalArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Topics', labelFa: 'همه مقالات و راهنماها' },
    { id: 'construction-law', labelEn: 'Zoning & Municipal Codes', labelFa: 'ضوابط شهرداری و جواز' },
    { id: 'materials-budget', labelEn: 'Materials & Cost Analysis', labelFa: 'متریال‌شناسی و بودجه' },
    { id: 'renovation', labelEn: 'Restoration & Renovation', labelFa: 'بازسازی و احیای سازه' },
    { id: 'villa-design', labelEn: 'Mountain & Villa Design', labelFa: 'معماری ویلا و کوهستان' },
    { id: 'smart-bms', labelEn: 'Smart BMS & Automation', labelFa: 'هوشمندسازی و انرژی' },
  ];

  const filteredArticles = useMemo(() => {
    return ARCHITECTURAL_ARTICLES.filter((art) => {
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        art.title.toLowerCase().includes(q) ||
        art.titleFa.includes(q) ||
        art.summaryFa.includes(q) ||
        art.summaryEn.toLowerCase().includes(q) ||
        art.keyQuestionFa.includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="articles" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>{isFa ? 'دانشنامه و مقالات تخصصی معماری و ساخت' : 'ARCHITECTURAL KNOWLEDGE BASE'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
              {isFa ? 'پاسخ معمارانه به پرسش‌های کلیدی کارفرمایان' : 'Insights & Strategic Guides for Builders'}
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed font-iransans">
              {isFa
                ? 'تحلیل جامع قوانین شهرداری شمیران و لواسان، مقایسه اقتصادی بتن اکسپوز و سنگ، تکنیک‌های بازسازی سازه و راهکارهای بهینه‌سازی مصرف انرژی در ویلاها.'
                : 'In-depth analysis of municipal zoning in Tehran, cost comparison of luxury materials, seismic restoration strategies, and passive climate engineering.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در مقالات و سوالات...' : 'Search articles & topics...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-900 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 placeholder-stone-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-850">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {isFa ? cat.labelFa : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => {
            const isSelected = activeArticle?.id === article.id;
            return (
              <article
                key={article.id}
                onClick={() => {
                  setActiveArticle(article);
                  setOpenFaqIndex(null);
                }}
                className="group bg-stone-900/70 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
              >
                <div>
                  {/* Article Hero Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                    <img
                      src={article.heroImage}
                      alt={isFa ? article.titleFa : article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[11px] font-mono text-amber-400 border border-stone-700/80">
                      {isFa ? article.categoryFa : article.categoryEn}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-mono text-stone-300 flex items-center gap-1 border border-stone-800">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{article.readTimeMin} {isFa ? 'دقیقه مطالعه' : 'min read'}</span>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{article.publishDate}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                      {isFa ? article.titleFa : article.title}
                    </h3>

                    {/* Key Question Callout */}
                    <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-stone-300 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'پرسش کلیدی مقاله:' : 'Core Question Answered:'}</span>
                      </div>
                      <p className="font-semibold text-stone-200 text-[11px] leading-relaxed">
                        {isFa ? article.keyQuestionFa : article.keyQuestionEn}
                      </p>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed font-iransans">
                      {isFa ? article.summaryFa : article.summaryEn}
                    </p>
                  </div>
                </div>

                {/* Article Card Footer */}
                <div className="p-5 sm:px-6 pt-0 border-t border-stone-800/60 mt-2 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-300 font-iransans">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-mono">
                    <span>{isFa ? 'مطالعه کامل' : 'Read Article'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="py-12 text-center text-stone-400 text-sm space-y-3 bg-stone-900/40 border border-stone-800 rounded-xl">
            <p>{isFa ? 'مقاله‌ای مطابق با عبارت جستجوی شما یافت نشد.' : 'No articles matched your search.'}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-medium cursor-pointer"
            >
              {isFa ? 'نمایش همه مقالات' : 'View All Articles'}
            </button>
          </div>
        )}

      </div>

      {/* Comprehensive Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 text-stone-100">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between gap-3 bg-stone-950/90">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span className="font-bold">{isFa ? activeArticle.categoryFa : activeArticle.categoryEn}</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400">{activeArticle.readTimeMin} {isFa ? 'دقیقه مطالعه' : 'min read'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onBookConsultation(isFa ? activeArticle.titleFa : activeArticle.title)}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isFa ? 'مشاوره پیرامون این موضوع' : 'Inquire Topic'}</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
              
              {/* Article Title & Hero */}
              <div className="space-y-4">
                <h1 className="text-xl sm:text-3xl font-extrabold text-stone-100 leading-tight">
                  {isFa ? activeArticle.titleFa : activeArticle.title}
                </h1>
                
                <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-stone-800 shadow-xl">
                  <img
                    src={activeArticle.heroImage}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-mono text-stone-300">
                    {isFa ? 'انتشار:' : 'Published:'} {activeArticle.publishDate}
                  </div>
                </div>
              </div>

              {/* Core Question Highlight Box */}
              <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>{isFa ? 'پرسش بنیادین کارفرمایان:' : 'CRITICAL CLIENT INQUIRY:'}</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed">
                  "{isFa ? activeArticle.keyQuestionFa : activeArticle.keyQuestionEn}"
                </p>
              </div>

              {/* Introduction */}
              <div className="prose prose-invert max-w-none">
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-iransans">
                  {isFa ? activeArticle.contentFa.intro : activeArticle.contentEn.intro}
                </p>
              </div>

              {/* Article Content Sections */}
              <div className="space-y-8">
                {(isFa ? activeArticle.contentFa.sections : activeArticle.contentEn.sections).map((sec, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-2">
                      <span>{sec.heading}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-iransans">
                      {sec.body}
                    </p>

                    {sec.takeaways && sec.takeaways.length > 0 && (
                      <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 mt-3">
                        <div className="text-xs font-bold text-stone-200 font-mono">
                          {isFa ? '📌 نکات کلیدی اجرایی:' : 'Key Practical Takeaways:'}
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-400 font-iransans">
                          {sec.takeaways.map((t, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Frequently Asked Questions (FAQ) Section */}
              {(isFa ? activeArticle.contentFa.faq : activeArticle.contentEn.faq).length > 0 && (
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-100">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>{isFa ? 'پرسش‌های متداول در این زمینه (FAQ)' : 'Frequently Asked Questions'}</span>
                  </div>

                  <div className="space-y-3">
                    {(isFa ? activeArticle.contentFa.faq : activeArticle.contentEn.faq).map((faqItem, fIdx) => {
                      const isOpen = openFaqIndex === fIdx;
                      return (
                        <div
                          key={fIdx}
                          className="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(fIdx)}
                            className="w-full p-4 text-right flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-200 hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            <span>{faqItem.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="p-4 pt-0 text-xs sm:text-sm text-stone-400 border-t border-stone-850/60 leading-relaxed font-iransans bg-stone-900/40">
                              {faqItem.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Consultation Bottom CTA inside reader */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-right">
                  <h4 className="font-bold text-stone-100 text-sm sm:text-base">
                    {isFa ? 'نیاز به راهنمایی حقوقی، مهندسی یا برآورد هزینه اختصاصی دارید؟' : 'Need specific architectural advice or zoning consultation?'}
                  </h4>
                  <p className="text-xs text-stone-400 font-iransans">
                    {isFa ? 'معماران ارشد آتریا آماده پاسخگویی به سوالات پروژه شما هستند.' : 'Speak directly with our senior architectural partners.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const title = isFa ? activeArticle.titleFa : activeArticle.title;
                    setActiveArticle(null);
                    onBookConsultation(title);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shrink-0 transition-all shadow cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isFa ? 'درخواست جلسه مشاوره تخصصی' : 'Schedule Consultation'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
