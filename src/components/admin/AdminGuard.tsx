import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminDashboard } from './AdminDashboard';
import { AdminLogin } from './AdminLogin';
import { Loader2 } from 'lucide-react';

export const AdminGuard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }

      // Verify admin role
      const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single();

console.log('[Atria] Session user ID:', session.user.id);
console.log('[Atria] Profile:', profile);
console.log('[Atria] Profile error:', profileError);

      if (profile?.role === 'admin') {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single();

console.log('[Atria] Session user ID:', session.user.id);
console.log('[Atria] Profile:', profile);
console.log('[Atria] Profile error:', profileError);

      if (profile?.role === 'admin') {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500 gap-3" dir="rtl">
        <Loader2 className="animate-spin" size={24} />
        <span className="text-sm">در حال بارگذاری...</span>
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    return <AdminDashboard />;
  }

  return <AdminLogin onLoginSuccess={() => {
    setIsAuthenticated(true);
    setIsAdmin(true);
  }} />;
};
