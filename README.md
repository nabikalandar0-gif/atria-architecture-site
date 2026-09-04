# Atria Architecture & Design Studio

لوکس‌ترین پورتفولیو معماری + پنل مدیریت اختصاصی

**Frontend:** Vite + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion  
**Backend / Database:** Supabase (Auth + PostgreSQL + RLS)  
**Deploy target:** Cloudflare Pages

---

## ساختار پروژه

```
src/
├── components/
│   ├── admin/           ← پنل مدیریت
│   │   ├── AdminGuard.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── ...              ← کامپوننت‌های سایت اصلی
├── data/                ← داده‌های استاتیک فعلی
├── lib/
│   └── supabase.ts      ← کلاینت و تایپ‌های Supabase
├── App.tsx              ← روتینگ (سایت + /admin)
└── ...
supabase/
└── schema.sql           ← اسکیما کامل دیتابیس + RLS
```

---

## راه‌اندازی محلی

### ۱. نصب وابستگی‌ها

```bash
npm install
```

### ۲. تنظیم Environment Variables

فایل `.env.local` بسازید:

```env
GEMINI_API_KEY=your_key
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### ۳. ساخت جداول در Supabase

1. به Supabase Dashboard بروید
2. پروژه جدید بسازید
3. به **SQL Editor** بروید و محتوای فایل `supabase/schema.sql` را اجرا کنید

### ۴. ساخت کاربر ادمین

1. در Supabase → Authentication → Users → Add user (ایمیل + رمز)
2. سپس در SQL Editor این دستور را اجرا کنید:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
```

### ۵. اجرای پروژه

```bash
npm run dev
```

- سایت اصلی: http://localhost:3000
- پنل مدیریت: http://localhost:3000/admin

---

## پنل مدیریت (`/admin`)

| تب | قابلیت‌ها |
|----|-----------|
| **مدیریت پروژه‌ها** | افزودن / حذف / ویژه کردن پروژه‌ها |
| **درخواست‌های مشاوره** | مشاهده، تغییر وضعیت، حذف |
| **لاگ مشاور AI** | مشاهده تاریخچه مشاوره‌های هوش مصنوعی |

امنیت:
- فقط کاربرانی با role = admin در جدول profiles می‌توانند وارد شوند
- Row Level Security (RLS) روی تمام جداول فعال است

---

## دیپلوی روی Cloudflare Pages

1. کد را به GitHub پوش کنید
2. در Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. تنظیمات بیلد:

| گزینه | مقدار |
|-------|-------|
| Framework preset | None |
| Build command | npm run build |
| Build output directory | dist |

4. Environment Variables را در Cloudflare تنظیم کنید:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - GEMINI_API_KEY

5. فایل public/_redirects برای SPA routing از قبل اضافه شده است.

---

## نکات مهم

- داده‌های پروژه‌های فعلی هنوز از فایل‌های استاتیک (src/data/atriaData.ts) خوانده می‌شوند.
- پنل ادمین پروژه‌ها را در Supabase ذخیره می‌کند.
- برای اتصال کامل فرانت به Supabase می‌توان در مرحله بعد ProjectShowcase را به خواندن از دیتابیس تغییر داد.

Built with precision for Atria Architecture Studio.
