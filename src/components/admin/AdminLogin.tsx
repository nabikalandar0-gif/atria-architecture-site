import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ShieldAlert, Loader2 } from 'lucide-react';

interface Props {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg('ایمیل یا رمز عبور اشتباه است.');
        setLoading(false);
        return;
      }

      // Verify admin role
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError || profile?.role !== 'admin') {
          await supabase.auth.signOut();
          setErrorMsg('شما دسترسی ادمین ندارید.');
          setLoading(false);
          return;
        }
      }

      onLoginSuccess();
    } catch {
      setErrorMsg('خطای غیرمنتظره رخ داد. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto mb-3 text-amber-500">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-stone-100">ورود به پنل مدیریت آتریا</h2>
          <p className="text-stone-400 text-xs mt-1">فقط مدیران مجاز به ورود هستند</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-6 flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-stone-400 block mb-1.5">ایمیل مدیر</label>
            <div className="relative">
              <Mail className="absolute right-3 top-2.5 text-stone-500" size={18} />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg pr-10 pl-3 py-2.5 text-sm text-stone-200 focus:border-amber-500 outline-none transition-all"
                placeholder="admin@atria-studio.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-stone-400 block mb-1.5">رمز عبور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-2.5 text-stone-500" size={18} />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg pr-10 pl-3 py-2.5 text-sm text-stone-200 focus:border-amber-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-bold py-2.5 rounded-lg text-sm transition-all mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                در حال بررسی...
              </>
            ) : (
              'ورود به سیستم'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
