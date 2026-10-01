'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  User,
  ArrowLeft,
  AlertCircle,
  Loader2,
  BookOpen,
  GraduationCap,
  Building2,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ROLE_ROUTES, UserRole } from '@/lib/auth/auth-types';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, role, isLoading: authLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to their role dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated && role) {
      const target = ROLE_ROUTES[role] || '/';
      router.replace(target);
    }
  }, [authLoading, isAuthenticated, role, router]);

  const handleLogin = async (loginUsername?: string, loginPassword?: string) => {
    const userToLogin = loginUsername || username;
    const passToLogin = loginPassword || password;

    if (!userToLogin || !passToLogin) {
      setError('Harap masukkan Username/NIP/NISN dan Kata Sandi');
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await login(userToLogin, passToLogin);

    if (result.success && result.role) {
      const targetRoute = ROLE_ROUTES[result.role] || '/';
      router.push(targetRoute);
    } else {
      setError(result.error || 'Kredensial tidak valid. Silakan coba lagi.');
      setSubmitting(false);
    }
  };

  const handleQuickLogin = (uname: string, pass: string) => {
    setUsername(uname);
    setPassword(pass);
    handleLogin(uname, pass);
  };

  const demoAccounts = [
    {
      role: 'GURU',
      label: 'Guru Pengampu',
      name: 'Budi Pratama, S.Kom.',
      username: '198504122010011014',
      icon: BookOpen,
      iconColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      role: 'SISWA',
      label: 'Siswa',
      name: 'Dafiand',
      username: '0061234567',
      icon: GraduationCap,
      iconColor: 'bg-blue-100 text-blue-700',
    },
    {
      role: 'ADMIN',
      label: 'Administrator',
      name: 'Bambang Sudarmono, S.AP.',
      username: 'admin',
      icon: Building2,
      iconColor: 'bg-slate-100 text-slate-800',
    },
    {
      role: 'KEPALA_SEKOLAH',
      label: 'Kepala Sekolah',
      name: 'Drs. H. Wardoyo, M.Pd.',
      username: '196803151993031004',
      icon: ShieldAlert,
      iconColor: 'bg-teal-100 text-teal-700',
    },
    {
      role: 'KURIKULUM',
      label: 'Waka Kurikulum',
      name: 'Ahmad Hidayat, M.Kom',
      username: '197508202000121002',
      icon: Layers,
      iconColor: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 flex flex-col">
        {/* Top Branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-display font-bold text-2xl mb-3 shadow-md">
            S
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900 text-center tracking-tight">
            Portal Masuk Akademik
          </h1>
          <p className="font-body text-xs text-slate-500 text-center mt-1">
            SMK CITRA NEGARA • Tahun Ajaran 2026/2027
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs font-medium">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Universal Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider">
              NIP / NISN / Username
            </label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan NIP, NISN, atau username..."
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={submitting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 h-10 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-300 text-white rounded-lg font-body text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Sesi...</span>
              </>
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </button>
        </form>

        {/* Demo Fast Login Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Pilihan Akses Uji Coba Multi-Role
          </span>
          <div className="flex flex-col gap-2 mt-1">
            {demoAccounts.map((acc) => {
              const Icon = acc.icon;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleQuickLogin(acc.username, 'password123')}
                  disabled={submitting}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg ${acc.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex flex-col min-w-0 leading-tight">
                      <span className="font-body text-xs font-semibold text-slate-900 truncate">
                        {acc.label}: {acc.name}
                      </span>
                      <span className="font-body text-[10px] text-slate-500 truncate">
                        User: {acc.username}
                      </span>
                    </div>
                  </div>
                  <span className="font-body text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                    Masuk
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
