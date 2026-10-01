'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ROLE_ROUTES, UserRole } from '@/lib/auth/auth-types';

interface RoleConfig {
  role: UserRole;
  title: string;
  badge: string;
  desc: string;
  demoName: string;
  defaultUsername: string;
  defaultPassword: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  targetRoute: string;
  icon: React.ElementType;
  colors: {
    accent: string;
    borderActive: string;
    bgActive: string;
    textActive: string;
    iconBg: string;
    iconColor: string;
    button: string;
    badgeBg: string;
    badgeText: string;
  };
}

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  SISWA: {
    role: 'SISWA',
    title: 'Siswa',
    badge: 'Siswa Aktif',
    desc: 'Akses modul materi, pengumpulan tugas daring, dan transparansi rekap capaian nilai.',
    demoName: 'Dafiand',
    defaultUsername: '0061234567',
    defaultPassword: 'password123',
    identifierLabel: 'NISN / ID Siswa / Username',
    identifierPlaceholder: "Contoh: 0061234567 atau 'siswa'",
    targetRoute: '/siswa/dashboard',
    icon: GraduationCap,
    colors: {
      accent: 'blue',
      borderActive: 'border-blue-600 ring-2 ring-blue-500/20',
      bgActive: 'bg-blue-50/70',
      textActive: 'text-blue-900',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
    },
  },
  GURU: {
    role: 'GURU',
    title: 'Guru Pengampu',
    badge: 'Tenaga Pendidik',
    desc: 'Pengelolaan silabus bab, materi pembelajaran, distribusi tugas, dan evaluasi hasil belajar.',
    demoName: 'Budi Pratama, S.Kom.',
    defaultUsername: '198504122010011014',
    defaultPassword: 'password123',
    identifierLabel: 'NIP / ID Guru / Username',
    identifierPlaceholder: "Contoh: 198504122010011014 atau 'guru'",
    targetRoute: '/guru/dashboard',
    icon: BookOpen,
    colors: {
      accent: 'indigo',
      borderActive: 'border-indigo-600 ring-2 ring-indigo-500/20',
      bgActive: 'bg-indigo-50/70',
      textActive: 'text-indigo-900',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-800',
    },
  },
  ADMIN: {
    role: 'ADMIN',
    title: 'Administrator',
    badge: 'Tata Usaha & Dapodik',
    desc: 'Pengelolaan data induk rombel, alokasi guru pengampu, serta sinkronisasi data Dapodik.',
    demoName: 'Bambang Sudarmono, S.AP.',
    defaultUsername: 'admin',
    defaultPassword: 'password123',
    identifierLabel: 'Username / NIP Admin',
    identifierPlaceholder: "Contoh: admin atau NIP",
    targetRoute: '/admin/dashboard',
    icon: Building2,
    colors: {
      accent: 'slate',
      borderActive: 'border-slate-800 ring-2 ring-slate-700/20',
      bgActive: 'bg-slate-100',
      textActive: 'text-slate-900',
      iconBg: 'bg-slate-200',
      iconColor: 'text-slate-800',
      button: 'bg-slate-900 hover:bg-slate-800 text-white',
      badgeBg: 'bg-slate-200',
      badgeText: 'text-slate-900',
    },
  },
  KEPALA_SEKOLAH: {
    role: 'KEPALA_SEKOLAH',
    title: 'Kepala Sekolah',
    badge: 'Pengawas Institusi',
    desc: 'Pemantauan eksekutif mutu pembelajaran, rekap kehadiran, dan evaluasi KBM institusional.',
    demoName: 'Drs. H. Wardoyo, M.Pd.',
    defaultUsername: '196803151993031004',
    defaultPassword: 'password123',
    identifierLabel: 'NIP / ID Kepala Sekolah / Username',
    identifierPlaceholder: "Contoh: 196803151993031004 atau 'kepsek'",
    targetRoute: '/kepsek/dashboard',
    icon: ShieldCheck,
    colors: {
      accent: 'teal',
      borderActive: 'border-teal-600 ring-2 ring-teal-500/20',
      bgActive: 'bg-teal-50/70',
      textActive: 'text-teal-900',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
      button: 'bg-teal-700 hover:bg-teal-800 text-white',
      badgeBg: 'bg-teal-100',
      badgeText: 'text-teal-800',
    },
  },
  KURIKULUM: {
    role: 'KURIKULUM',
    title: 'Waka Kurikulum',
    badge: 'Manajemen Kurikulum',
    desc: 'Struktur Capaian Pembelajaran, pemetaan kurikulum merdeka, dan audit kelengkapan silabus.',
    demoName: 'Ahmad Hidayat, M.Kom',
    defaultUsername: '197508202000121002',
    defaultPassword: 'password123',
    identifierLabel: 'NIP / ID Kurikulum / Username',
    identifierPlaceholder: "Contoh: 197508202000121002 atau 'kurikulum'",
    targetRoute: '/kurikulum/dashboard',
    icon: Layers,
    colors: {
      accent: 'purple',
      borderActive: 'border-purple-600 ring-2 ring-purple-500/20',
      bgActive: 'bg-purple-50/70',
      textActive: 'text-purple-900',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
      button: 'bg-purple-700 hover:bg-purple-800 text-white',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
    },
  },
};

const ROLE_LIST: UserRole[] = ['SISWA', 'GURU', 'ADMIN', 'KEPALA_SEKOLAH', 'KURIKULUM'];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, logout, isAuthenticated, user, role: currentRole, isLoading: authLoading } = useAuth();

  // Selected role tab in UI (defaults to query param if provided, else SISWA)
  const initialRole = (searchParams.get('role')?.toUpperCase() as UserRole) || 'SISWA';
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    ROLE_CONFIGS[initialRole] ? initialRole : 'SISWA'
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingRole, setSubmittingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const activeConfig = ROLE_CONFIGS[selectedRole];
  const ActiveIcon = activeConfig.icon;

  // On tab switch, pre-populate default credentials if fields are empty or set to another demo
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setError(null);
    const targetConfig = ROLE_CONFIGS[role];
    setUsername(targetConfig.defaultUsername);
    setPassword(targetConfig.defaultPassword);
  };

  // Set default credentials on mount
  useEffect(() => {
    const config = ROLE_CONFIGS[selectedRole];
    if (config) {
      setUsername(config.defaultUsername);
      setPassword(config.defaultPassword);
    }
  }, [selectedRole]);

  // Execute login
  const handleLogin = async (loginUsername?: string, loginPassword?: string, forceRole?: UserRole) => {
    const userToLogin = loginUsername ?? username;
    const passToLogin = loginPassword ?? password;

    if (!userToLogin.trim() || !passToLogin) {
      setError('Harap masukkan Username/NIP/NISN dan Kata Sandi');
      return;
    }

    setSubmitting(true);
    setSubmittingRole(forceRole || selectedRole);
    setError(null);
    setSuccessNotice(null);

    const result = await login(userToLogin.trim(), passToLogin);

    if (result.success && result.role) {
      setSuccessNotice(`Autentikasi Berhasil! Mengarahkan ke portal ${ROLE_CONFIGS[result.role]?.title || result.role}...`);
      const targetRoute = ROLE_ROUTES[result.role] || '/';
      // Small timeout for smooth feedback
      setTimeout(() => {
        router.push(targetRoute);
      }, 350);
    } else {
      setError(result.error || 'Kredensial tidak valid. Silakan coba lagi.');
      setSubmitting(false);
      setSubmittingRole(null);
    }
  };

  // Instant login for a specific demo account
  const handleQuickLogin = (role: UserRole) => {
    const cfg = ROLE_CONFIGS[role];
    setSelectedRole(role);
    setUsername(cfg.defaultUsername);
    setPassword(cfg.defaultPassword);
    handleLogin(cfg.defaultUsername, cfg.defaultPassword, role);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 flex flex-col my-4">
        
        {/* TOP INSTITUTIONAL BRANDING */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-display font-bold text-2xl mb-3 shadow-md shadow-blue-900/20">
            S
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Portal Masuk Akademik
          </h1>
          <p className="font-body text-xs sm:text-sm text-slate-500 mt-1">
            SMK CITRA NEGARA • Akses Terpadu Multi-Role 2026/2027
          </p>
        </div>

        {/* ACTIVE SESSION BANNER (ROLE SWITCHER HELPER) */}
        {!authLoading && isAuthenticated && user && currentRole && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50/90 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user.profile?.nama?.charAt(0) || user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-blue-950">
                  {user.profile?.nama || user.username}
                </span>
                <span className="text-[11px] text-blue-700 font-medium">
                  Sesi Aktif: <strong className="uppercase">{currentRole}</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => router.push(ROLE_ROUTES[currentRole] || '/')}
                className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors text-xs"
              >
                <span>Buka Dashboard</span>
                <ArrowRight size={13} />
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-100 font-medium rounded-lg flex items-center gap-1 transition-colors text-xs"
                title="Keluar dari sesi ini"
              >
                <LogOut size={14} />
                <span>Ganti Akun</span>
              </button>
            </div>
          </div>
        )}

        {/* ERROR / SUCCESS FEEDBACK */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-red-700 text-xs font-medium animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successNotice && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <div className="flex-1">{successNotice}</div>
          </div>
        )}

        {/* 1. INTERACTIVE ROLE SELECTOR TABS */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pilih Peran Anda
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              5 Akses Terdaftar
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ROLE_LIST.map((r) => {
              const cfg = ROLE_CONFIGS[r];
              const Icon = cfg.icon;
              const isSelected = selectedRole === r;

              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSelectRole(r)}
                  disabled={submitting}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? `${cfg.colors.borderActive} ${cfg.colors.bgActive} shadow-sm font-semibold`
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? cfg.colors.iconBg + ' ' + cfg.colors.iconColor : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="flex flex-col min-w-0 leading-tight">
                    <span className="text-xs font-semibold truncate">
                      {cfg.title}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {cfg.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. DYNAMIC ROLE INFO CARD */}
        <div className={`p-4 rounded-2xl border mb-5 transition-colors ${activeConfig.colors.bgActive} border-slate-200/80`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl ${activeConfig.colors.iconBg} ${activeConfig.colors.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                <ActiveIcon size={18} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-slate-900">
                    Masuk Sebagai {activeConfig.title}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeConfig.colors.badgeBg} ${activeConfig.colors.badgeText}`}>
                    {activeConfig.badge}
                  </span>
                </div>
                <span className="font-body text-xs text-slate-600 mt-0.5 leading-snug">
                  {activeConfig.desc}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Rute Tujuan: <code className="font-mono text-slate-700 font-semibold">{activeConfig.targetRoute}</code></span>
            <span className="text-slate-400">Autentikasi JWT Server</span>
          </div>
        </div>

        {/* 3. LOGIN FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4"
        >
          {/* Identity input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>{activeConfig.identifierLabel}</span>
              <span className="text-[10px] font-normal text-slate-400 lowercase">
                bisa NIP/NISN atau alias
              </span>
            </label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={activeConfig.identifierPlaceholder}
                className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={submitting}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Kata Sandi</span>
              <button
                type="button"
                onClick={() => {
                  setUsername(activeConfig.defaultUsername);
                  setPassword(activeConfig.defaultPassword);
                }}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2 flex items-center gap-1"
                title="Gunakan akun demo yang telah teruji"
              >
                <Sparkles size={12} />
                <span>Gunakan Akun Demo</span>
              </button>
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full h-11 pl-9 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:bg-white transition-colors"
                disabled={submitting}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full mt-2 h-11 rounded-xl font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              activeConfig.colors.button
            } disabled:opacity-50`}
          >
            {submitting && submittingRole === selectedRole ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Sesi {activeConfig.title}...</span>
              </>
            ) : (
              <>
                <span>Masuk sebagai {activeConfig.title}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* 4. FAST 1-CLICK DEMO ACCESS LIST */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Akses Cepat Uji Coba Multi-Role (One-Click)
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Password default: password123
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {ROLE_LIST.map((r) => {
              const cfg = ROLE_CONFIGS[r];
              const Icon = cfg.icon;
              const isSubmittingThis = submitting && submittingRole === r;

              return (
                <div
                  key={r}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 transition-all group bg-white"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl ${cfg.colors.iconBg} ${cfg.colors.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex flex-col min-w-0 leading-tight">
                      <div className="flex items-center gap-1.5">
                        <span className="font-body text-xs font-bold text-slate-900 truncate">
                          {cfg.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal truncate">
                          • {cfg.demoName}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500 truncate mt-0.5">
                        User: <strong className="text-slate-700">{cfg.defaultUsername}</strong>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin(r)}
                    disabled={submitting}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                      cfg.colors.badgeBg
                    } ${cfg.colors.badgeText} hover:opacity-90 active:scale-95 disabled:opacity-50`}
                  >
                    {isSubmittingThis ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        <span>Masuk...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk Cepat</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. BACK TO HOME */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Beranda Utama</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-900" size={32} />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
