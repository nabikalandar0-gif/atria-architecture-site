import React, { useState, useEffect, useCallback } from 'react';
import { supabase, DbProject, DbConsultationRequest, DbAiConsultation } from '../../lib/supabase';
import {
  FolderPlus,
  MessageSquare,
  Sparkles,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  Loader2,
  Star,
  X,
  Pencil,
} from 'lucide-react';

type Tab = 'projects' | 'requests' | 'ai-logs';

const emptyProjectForm = {
  title_fa: '',
  title_en: '',
  slug: '',
  category: 'villa' as const,
  location_fa: '',
  location_en: '',
  area_sqm: '',
  year: new Date().getFullYear().toString(),
  status: 'Completed' as const,
  hero_image: '',
  tagline_fa: '',
  tagline_en: '',
  is_featured: false,
};

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [requests, setRequests] = useState<DbConsultationRequest[]>([]);
  const [aiLogs, setAiLogs] = useState<DbAiConsultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyProjectForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } else if (activeTab === 'requests') {
        const { data, error } = await supabase
          .from('consultation_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setRequests(data || []);
      } else if (activeTab === 'ai-logs') {
        const { data, error } = await supabase
          .from('ai_consultations')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        if (error) throw error;
        setAiLogs(data || []);
      }
    } catch (err: any) {
      showMsg('error', err.message || 'خطا در دریافت داده‌ها');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const resetForm = () => {
    setForm(emptyProjectForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleStartEdit = (proj: DbProject) => {
    setEditingId(proj.id);
    setForm({
      title_fa: proj.title_fa || '',
      title_en: proj.title_en || '',
      slug: proj.slug || '',
      category: (proj.category as any) || 'villa',
      location_fa: proj.location_fa || '',
      location_en: proj.location_en || '',
      area_sqm: proj.area_sqm ? String(proj.area_sqm) : '',
      year: proj.year ? String(proj.year) : new Date().getFullYear().toString(),
      status: (proj.status as any) || 'Completed',
      hero_image: proj.hero_image || '',
      tagline_fa: proj.tagline_fa || '',
      tagline_en: proj.tagline_en || '',
      is_featured: proj.is_featured || false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const slug = form.slug.trim() || generateSlug(form.title_en || form.title_fa);

    const payload = {
      title_fa: form.title_fa.trim(),
      title_en: form.title_en.trim() || form.title_fa.trim(),
      slug,
      category: form.category,
      category_fa:
        form.category === 'villa'
          ? 'ویلا و عمارت'
          : form.category === 'residential'
          ? 'مسکونی'
          : form.category === 'commercial'
          ? 'تجاری و اداری'
          : form.category === 'interior'
          ? 'طراحی داخلی'
          : form.category === 'cultural'
          ? 'فرهنگی'
          : form.category === 'renovation'
          ? 'بازسازی'
          : 'باززنده‌سازی',
      category_en: form.category,
      location_fa: form.location_fa.trim() || null,
      location_en: form.location_en.trim() || form.location_fa.trim() || null,
      area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
      year: form.year ? Number(form.year) : null,
      status: form.status,
      hero_image: form.hero_image.trim() || null,
      tagline_fa: form.tagline_fa.trim() || null,
      tagline_en: form.tagline_en.trim() || null,
      is_featured: form.is_featured,
      gallery_images: form.hero_image.trim() ? [form.hero_image.trim()] : [],
      updated_at: new Date().toISOString(),
    };

    let error;

    if (editingId) {
      // ویرایش
      const result = await supabase.from('projects').update(payload).eq('id', editingId);
      error = result.error;
    } else {
      // ایجاد جدید
      const result = await supabase.from('projects').insert([payload]);
      error = result.error;
    }

    if (error) {
      showMsg('error', (editingId ? 'خطا در ویرایش پروژه: ' : 'خطا در ثبت پروژه: ') + error.message);
    } else {
      showMsg('success', editingId ? 'پروژه با موفقیت ویرایش شد.' : 'پروژه با موفقیت ثبت شد.');
      resetForm();
      fetchData();
    }
    setSubmitting(false);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف پروژه «${title}» مطمئن هستید؟`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      showMsg('error', error.message);
    } else {
      showMsg('success', 'پروژه حذف شد.');
      if (editingId === id) resetForm();
      fetchData();
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('projects')
      .update({ is_featured: !current })
      .eq('id', id);
    if (!error) fetchData();
  };

  const handleUpdateRequestStatus = async (id: string, status: 'pending' | 'contacted' | 'archived') => {
    const { error } = await supabase
      .from('consultation_requests')
      .update({ status })
      .eq('id', id);
    if (error) {
      showMsg('error', error.message);
    } else {
      showMsg('success', 'وضعیت به‌روز شد.');
      fetchData();
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('آیا از حذف این درخواست مطمئن هستید؟')) return;
    const { error } = await supabase.from('consultation_requests').delete().eq('id', id);
    if (!error) {
      showMsg('success', 'درخواست حذف شد.');
      fetchData();
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      contacted: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      archived: 'bg-stone-700/50 text-stone-400 border-stone-600',
    };
    const labels: Record<string, string> = {
      pending: 'در انتظار',
      contacted: 'تماس گرفته شده',
      archived: 'بایگانی',
    };
    return (
      <span className={`text-[11px] px-2.5 py-1 rounded-full border ${map[status] || map.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans" dir="rtl">
      {/* Toast */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl border ${
            message.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/15 border-red-500/40 text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-stone-900 border-l border-stone-800 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 font-bold text-sm">
                A
              </div>
              <div>
                <h1 className="text-base font-bold tracking-wide">مدیریت آتریا</h1>
                <p className="text-[10px] text-stone-500">Admin Panel</p>
              </div>
            </div>

            <nav className="space-y-1.5">
              {(
                [
                  { id: 'projects' as Tab, label: 'مدیریت پروژه‌ها', icon: FolderPlus },
                  { id: 'requests' as Tab, label: 'درخواست‌های مشاوره', icon: MessageSquare },
                  { id: 'ai-logs' as Tab, label: 'لاگ مشاور AI', icon: Sparkles },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    activeTab === item.id
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-transparent'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400/80 hover:text-red-300 text-sm px-4 py-2.5 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            خروج از پنل
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-stone-950">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-amber-500 gap-3">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-sm">در حال بارگذاری...</span>
            </div>
          ) : (
            <>
              {/* ========== PROJECTS TAB ========== */}
              {activeTab === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-stone-100">مدیریت پروژه‌ها</h2>
                      <p className="text-xs text-stone-500 mt-1">{projects.length} پروژه ثبت شده</p>
                    </div>
                    <button
                      onClick={() => {
                        if (showForm) {
                          resetForm();
                        } else {
                          setEditingId(null);
                          setForm(emptyProjectForm);
                          setShowForm(true);
                        }
                      }}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      {showForm ? <X size={18} /> : <Plus size={18} />}
                      {showForm ? 'بستن فرم' : 'پروژه جدید'}
                    </button>
                  </div>

                  {/* Create / Edit Form */}
                  {showForm && (
                    <form
                      onSubmit={handleSubmitProject}
                      className="bg-stone-900 border border-stone-800 p-6 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      <div className="md:col-span-2 lg:col-span-3 mb-1">
                        <h3 className="text-sm font-bold text-amber-400">
                          {editingId ? 'ویرایش پروژه' : 'ثبت پروژه جدید'}
                        </h3>
                      </div>

                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">عنوان فارسی *</label>
                        <input
                          required
                          value={form.title_fa}
                          onChange={(e) => setForm({ ...form, title_fa: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="ویلای افق لواسان"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">عنوان انگلیسی</label>
                        <input
                          value={form.title_en}
                          onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="Lavasan Horizon Residence"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">Slug (انگلیسی)</label>
                        <input
                          value={form.slug}
                          onChange={(e) => setForm({ ...form, slug: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="lavasan-horizon-residence"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">دسته‌بندی</label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                        >
                          <option value="villa">ویلا و عمارت</option>
                          <option value="residential">مسکونی</option>
                          <option value="commercial">تجاری / اداری</option>
                          <option value="interior">طراحی داخلی</option>
                          <option value="cultural">فرهنگی</option>
                          <option value="renovation">بازسازی</option>
                          <option value="adaptive-reuse">باززنده‌سازی</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">موقعیت (فارسی)</label>
                        <input
                          value={form.location_fa}
                          onChange={(e) => setForm({ ...form, location_fa: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="لواسان، تهران"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">موقعیت (انگلیسی)</label>
                        <input
                          value={form.location_en}
                          onChange={(e) => setForm({ ...form, location_en: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="Lavasan, Tehran"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">مساحت (م²)</label>
                        <input
                          type="number"
                          value={form.area_sqm}
                          onChange={(e) => setForm({ ...form, area_sqm: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="1450"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">سال</label>
                        <input
                          type="number"
                          value={form.year}
                          onChange={(e) => setForm({ ...form, year: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">وضعیت</label>
                        <select
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                        >
                          <option value="Completed">تکمیل شده</option>
                          <option value="Under Construction">در حال ساخت</option>
                          <option value="Concept">کانسپت</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-stone-400 block mb-1.5">آدرس تصویر کاور (URL)</label>
                        <input
                          value={form.hero_image}
                          onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-400 block mb-1.5">شعار فارسی</label>
                        <input
                          value={form.tagline_fa}
                          onChange={(e) => setForm({ ...form, tagline_fa: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500 outline-none"
                          placeholder="معماری تندیس‌گون بتن و شیشه..."
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 text-sm text-stone-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.is_featured}
                            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                            className="w-4 h-4 rounded border-stone-600 text-amber-500 focus:ring-amber-500"
                          />
                          پروژه ویژه (Featured)
                        </label>
                      </div>
                      <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-5 py-2.5 rounded-xl text-sm text-stone-400 hover:text-stone-200 border border-stone-700 hover:border-stone-600 transition-colors"
                        >
                          انصراف
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors"
                        >
                          {submitting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : editingId ? (
                            <Pencil size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
                          {editingId ? 'ذخیره تغییرات' : 'ثبت پروژه'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Projects List */}
                  {projects.length === 0 ? (
                    <div className="text-center py-16 text-stone-500 text-sm border border-dashed border-stone-800 rounded-2xl">
                      هنوز پروژه‌ای ثبت نشده است.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex gap-4 hover:border-stone-700 transition-colors"
                        >
                          {proj.hero_image ? (
                            <img
                              src={proj.hero_image}
                              alt={proj.title_fa}
                              className="w-20 h-20 rounded-lg object-cover shrink-0 bg-stone-800"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-lg bg-stone-800 flex items-center justify-center text-stone-600 shrink-0">
                              <FolderPlus size={24} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-bold text-stone-100 truncate">{proj.title_fa}</h3>
                              {proj.is_featured && (
                                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                              {proj.location_fa || '—'} • {proj.area_sqm ? `${proj.area_sqm} م²` : '—'} •{' '}
                              {proj.year || '—'}
                            </p>
                            <p className="text-[11px] text-stone-600 mt-1 capitalize">
                              {proj.category} · {proj.status}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleStartEdit(proj)}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center gap-1"
                              >
                                <Pencil size={12} />
                                ویرایش
                              </button>
                              <button
                                onClick={() => handleToggleFeatured(proj.id, proj.is_featured)}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 transition-colors"
                                title="تغییر وضعیت ویژه"
                              >
                                {proj.is_featured ? 'حذف از ویژه' : 'ویژه کردن'}
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title_fa)}
                                className="text-stone-600 hover:text-red-400 p-1.5 transition-colors"
                                title="حذف"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========== REQUESTS TAB ========== */}
              {activeTab === 'requests' && (
                <div>
                  <h2 className="text-2xl font-bold mb-1 text-stone-100">درخواست‌های مشاوره</h2>
                  <p className="text-xs text-stone-500 mb-6">{requests.length} درخواست</p>

                  {requests.length === 0 ? (
                    <div className="text-center py-16 text-stone-500 text-sm border border-dashed border-stone-800 rounded-2xl">
                      هنوز درخواستی ثبت نشده است.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {requests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-stone-900 border border-stone-800 rounded-xl p-5 hover:border-stone-700 transition-colors"
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div>
                              <h3 className="font-bold text-amber-400">{req.client_name}</h3>
                              <p className="text-sm text-stone-300 mt-0.5" dir="ltr">
                                {req.phone_email}
                              </p>
                            </div>
                            {statusBadge(req.status)}
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 mb-3">
                            {req.project_type && <span>نوع: {req.project_type}</span>}
                            {req.estimated_budget && <span>بودجه: {req.estimated_budget}</span>}
                            {req.location && <span>موقعیت: {req.location}</span>}
                            <span className="text-stone-600">
                              {new Date(req.created_at).toLocaleDateString('fa-IR')}
                            </span>
                          </div>

                          {req.notes && (
                            <p className="text-xs bg-stone-950 border border-stone-800 p-3 rounded-lg text-stone-300 mb-3">
                              {req.notes}
                            </p>
                          )}

                          <div className="flex items-center gap-2">
                            {req.status !== 'contacted' && (
                              <button
                                onClick={() => handleUpdateRequestStatus(req.id, 'contacted')}
                                className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                              >
                                <CheckCircle size={13} />
                                تماس گرفته شد
                              </button>
                            )}
                            {req.status !== 'archived' && (
                              <button
                                onClick={() => handleUpdateRequestStatus(req.id, 'archived')}
                                className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-stone-800 text-stone-400 border border-stone-700 hover:bg-stone-700 transition-colors"
                              >
                                <Archive size={13} />
                                بایگانی
                              </button>
                            )}
                            {req.status !== 'pending' && (
                              <button
                                onClick={() => handleUpdateRequestStatus(req.id, 'pending')}
                                className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                              >
                                <Clock size={13} />
                                بازگردانی
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="mr-auto text-stone-600 hover:text-red-400 p-1.5 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========== AI LOGS TAB ========== */}
              {activeTab === 'ai-logs' && (
                <div>
                  <h2 className="text-2xl font-bold mb-1 text-stone-100">لاگ مشاوره‌های هوش مصنوعی</h2>
                  <p className="text-xs text-stone-500 mb-6">{aiLogs.length} لاگ اخیر</p>

                  {aiLogs.length === 0 ? (
                    <div className="text-center py-16 text-stone-500 text-sm border border-dashed border-stone-800 rounded-2xl">
                      هنوز لاگی ثبت نشده است.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {aiLogs.map((log) => (
                        <div key={log.id} className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-stone-200">
                              {log.project_type || 'پروژه نامشخص'}
                            </h3>
                            <span className="text-[11px] text-stone-500">
                              {new Date(log.created_at).toLocaleDateString('fa-IR')}
                            </span>
                          </div>
                          <div className="flex gap-4 text-xs text-stone-400 mb-3">
                            {log.land_area && <span>مساحت زمین: {log.land_area} م²</span>}
                            {log.budget_level && <span>بودجه: {log.budget_level}</span>}
                          </div>
                          {log.generated_concept && (
                            <pre className="text-[11px] bg-stone-950 border border-stone-800 p-3 rounded-lg text-stone-400 overflow-x-auto max-h-40">
                              {JSON.stringify(log.generated_concept, null, 2)}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};