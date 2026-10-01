'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  Building2,
  Layers,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ROLE_ROUTES } from '@/lib/auth/auth-types';

export default function Home() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading, logout } = useAuth();

  const roleCards = [
    {
      title: 'Guru Pengampu',
      desc: 'Kelola materi pembelajaran, penugasan siswa, dan penilaian capaian',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white',
      borderHover: 'hover:border-indigo-400 hover:bg-indigo-50/40',
    },
    {
      title: 'Siswa',
      desc: 'Akses modul ajar, kumpulkan tugas mandiri, dan pantau progres akademik',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
      borderHover: 'hover:border-blue-400 hover:bg-blue-50/40',
    },
    {
      title: 'Administrator',
      desc: 'Pengelolaan data master, rombongan belajar, penempatan kelas, dan pengampu',
      icon: Building2,
      color: 'bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white',
      borderHover: 'hover:border-slate-400 hover:bg-slate-50/40',
    },
    {
      title: 'Kepala Sekolah',
      desc: 'Pemantauan eksekutif kondisi akademik, aktivitas KBM, dan evaluasi berkala',
      icon: ShieldCheck,
      color: 'bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white',
      borderHover: 'hover:border-teal-400 hover:bg-teal-50/40',
    },
    {
      title: 'Kurikulum',
      desc: 'Struktur capaian pembelajaran, silabus, dan monitoring kelengkapan materi',
      icon: Layers,
      color: 'bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white',
      borderHover: 'hover:border-purple-400 hover:bg-purple-50/40',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/70 p-8 sm:p-10 flex flex-col items-center">
        {/* Emblem & Branding */}
        <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-display font-bold text-3xl mb-4 shadow-lg shadow-blue-900/20">
          S
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-center tracking-tight">
          LMS Akademik Terpadu
        </h1>
        <p className="font-body text-sm text-slate-500 text-center mt-1.5 mb-6">
          SMK CITRA NEGARA • Platform Pembelajaran Multi-Role
        </p>

        {/* Auth State Banner if already logged in */}
        {!isLoading && isAuthenticated && user && role ? (
          <div className="w-full mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs text-blue-700 font-medium">Sesi Aktif Terdeteksi</span>
              <span className="text-sm font-bold text-slate-900">
                {user.profile?.nama || user.username} ({role})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push(ROLE_ROUTES[role] || '/')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Buka Dashboard</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={logout}
                className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full mb-8">
            <Link
              href="/login"
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <span>Masuk ke Portal Akademik</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Role Exploration Cards */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Lingkup Akses Peran
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              5 Peran Terverifikasi
            </span>
          </div>

          {roleCards.map((rc, idx) => {
            const Icon = rc.icon;
            return (
              <Link
                key={idx}
                href="/login"
                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border border-slate-200 transition-all group ${rc.borderHover}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${rc.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex flex-col min-w-0 flex-1 leading-tight">
                  <span className="font-display text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {rc.title}
                  </span>
                  <span className="font-body text-xs text-slate-500 truncate mt-0.5">
                    {rc.desc}
                  </span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>

        <p className="font-body text-[11px] text-slate-400 text-center mt-8">
          Sistem Autentikasi JWT Terpusat • Verifikasi Database Berjenjang
        </p>
      </div>
    </div>
  );
}
