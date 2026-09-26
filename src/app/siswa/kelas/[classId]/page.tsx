'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  School,
  Terminal,
  Users,
  Calendar,
  Badge,
  Monitor,
  Edit,
  ClipboardList,
  Video,
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Star,
  Megaphone,
  PlayCircle,
  Code,
  FileText,
  AlertCircle,
  FolderArchive,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Image from 'next/image';

export default function SiswaDetailKelasPage({ params }: { params: { classId: string } }) {
  const [activeTab, setActiveTab] = useState('ringkasan');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      {/* 1. Header & Context */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-slate-500 font-body text-xs">
            <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <Home size={14} />
              Beranda
            </Link>
            <span>/</span>
            <Link href="/siswa/kelas" className="hover:text-blue-700 transition-colors">
              Kelas Saya
            </Link>
            <span>/</span>
            <span className="font-semibold text-blue-700 truncate max-w-[200px] sm:max-w-none">
              Pemrograman Web & Perangkat Bergerak
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-body text-[10px] font-semibold border border-blue-100">
              <School size={12} />
              Fase F Kurikulum Merdeka
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-semibold">
              KKTP: 75.0
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-semibold">
              4 JP / Pertemuan
            </span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-2">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-800 text-white font-body text-[10px] font-bold tracking-wider uppercase">
                Kode: RPL-302
              </span>
              <span className="text-slate-500 font-body text-[11px]">• Ruang Lab 02 & Hybrid LMS</span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl text-blue-900 font-bold tracking-tight leading-tight">
              Pemrograman Web & Perangkat Bergerak — XII RPL 1
            </h1>
            <p className="font-body text-sm text-slate-500">
              Konsentrasi Keahlian Rekayasa Perangkat Lunak • Semester Ganjil TA 2026/2027
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200/60 self-start xl:self-auto shrink-0 w-full xl:w-auto min-w-[310px]">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-display text-lg font-bold shrink-0">
              BP
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-body text-sm font-bold text-slate-900 truncate">Budi Pratama, S.Kom.</span>
                <CheckCircle2 size={14} className="text-blue-600" />
              </div>
              <span className="font-body text-[11px] text-slate-500 truncate">Wali Kelas & Guru Produktif RPL</span>
              <div className="flex items-center gap-2 mt-1.5">
                <button className="text-blue-600 hover:text-blue-800 font-body text-[10px] font-bold transition-colors">
                  Kontak Pembimbing
                </button>
                <span className="text-slate-300">•</span>
                <button className="text-slate-500 hover:text-slate-800 font-body text-[10px] font-bold transition-colors">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 px-2 lg:px-4 mb-2">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          <button 
            onClick={() => setActiveTab('ringkasan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'ringkasan' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} />
            <span>Ringkasan Kelas</span>
          </button>
          <button 
            onClick={() => setActiveTab('materi')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'materi' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <BookOpen size={18} />
            <span>Materi Pembelajaran</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-body text-[10px]">12</span>
          </button>
          <button 
            onClick={() => setActiveTab('tugas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'tugas' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <ClipboardCheck size={18} />
            <span>Tugas Praktikum</span>
            <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-body text-[10px] font-bold">2 Aktif</span>
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'quiz' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <HelpCircle size={18} />
            <span>Quiz & Ujian</span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-body text-[10px] font-bold">1</span>
          </button>
          <button 
            onClick={() => setActiveTab('nilai')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'nilai' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Star size={18} />
            <span>Nilai Akademik Saya</span>
          </button>
          <button 
            onClick={() => setActiveTab('pengumuman')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-semibold shrink-0 transition-all ${activeTab === 'pengumuman' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Megaphone size={18} />
            <span>Pengumuman Kelas</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-blue-700 font-body text-[10px] font-bold">3</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section A: Sedang Dipelajari */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-body text-xs font-bold text-green-700 uppercase tracking-wider">Modul Berjalan • Pekan ke-8</span>
              </div>
              <span className="font-body text-[11px] text-slate-500">Target: 24 - 29 Sep 2026</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5">
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 text-blue-700 font-body text-[10px] font-bold border border-slate-200">
                  Bab 03: RESTful API & Integrasi Backend Node.js
                </span>
                <h2 className="font-display text-xl text-slate-900 font-bold leading-tight">
                  Topik 07: Konsep Arsitektur RESTful API, HTTP Methods & Status Code
                </h2>
                <p className="font-body text-sm text-slate-600">
                  Membedah prinsip dasar arsitektur stateless, perancangan URI endpoints baku, implementasi controller modular, dan response format JSON standar industri.
                </p>
              </div>
              
              {/* Progress Radial Mock */}
              <div className="flex items-center gap-3 shrink-0 bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                    <circle className="text-slate-200" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-blue-600" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="31.4" strokeLinecap="round" strokeWidth="4"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-body text-[11px] font-bold text-blue-700">75%</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Progres Materi</span>
                  <span className="font-body text-sm font-bold text-slate-900">3 dari 4 Subbab</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/60 bg-slate-50 -mx-5 -mb-5 p-5 lg:-mx-6 lg:-mb-6 lg:p-6">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-800 text-white hover:bg-blue-900 font-body text-sm font-semibold shadow-sm transition-all">
                <PlayCircle size={18} />
                Lanjutkan Modul 03 (Sesi 4)
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-700 border border-slate-200/60 hover:bg-slate-50 font-body text-sm font-semibold transition-colors">
                <Code size={18} className="text-slate-500" />
                Buka Starter Code
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-600 hover:text-blue-700 font-body text-sm font-semibold transition-colors md:ml-auto">
                <FileText size={18} />
                Unduh Handout PDF
              </button>
            </div>
          </div>

          {/* Section B: Tugas Praktikum Mendatang */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-slate-900">
                <AlertCircle size={20} className="text-blue-700" />
                <h2 className="font-display text-lg font-bold">Tugas Praktikum Mendatang</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-body text-[10px] font-bold uppercase tracking-wider">
                1 Mendesak
              </span>
            </div>
            
            <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4 lg:p-5 transition-all hover:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-800 text-white font-body text-[10px] font-bold">Praktikum Lab Mandiri</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body text-[10px] font-bold">Asesmen Sumatif 03</span>
                  </div>
                  <h3 className="font-display text-lg text-slate-900 font-bold leading-tight">
                    Tugas 03: Implementasi Autentikasi JWT & Middleware Express.js
                  </h3>
                  <p className="font-body text-sm text-slate-600">
                    Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer JWT pada protected route data siswa.
                  </p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end shrink-0 gap-1.5 text-right bg-white p-3 sm:p-0 sm:bg-transparent rounded-lg border border-slate-200 sm:border-none">
                  <span className="inline-flex items-center gap-1.5 text-red-600 font-body text-sm font-bold">
                    <Clock size={16} />
                    Sisa 4 Hari
                  </span>
                  <span className="font-body text-[11px] text-slate-500 font-medium">Rabu, 30 Sep 2026, 23:59</span>
                </div>
              </div>
              
              <div className="p-3.5 rounded-lg bg-white border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                    <FolderArchive size={20} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-body text-xs font-bold text-slate-700">Draf Tersedia:</span>
                      <span className="font-body text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">rakha_jwt_express_v1.zip (14.2 MB)</span>
                    </div>
                    <span className="font-body text-[10px] text-slate-500 mt-0.5">Terakhir diperbarui: 25 Sep 2026, 14.10 WIB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body text-xs font-bold transition-colors">
                    Edit Draf
                  </button>
                  <Link href="/siswa/tugas/tugas-03" className="px-3.5 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm">
                    Kumpulkan
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6">
            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <UserCheck size={20} className="text-blue-700" />
                <h2 className="font-display text-lg font-bold">Capaian Akademik Saya</h2>
              </div>
              <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-wider">Privat</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-blue-800 text-white flex items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-5 rounded-full blur-xl pointer-events-none"></div>
                <div className="space-y-1 relative z-10">
                  <span className="font-body text-[10px] text-blue-200 uppercase font-bold tracking-wider">Rerata Nilai Berjalan</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold leading-none font-display">88.0</span>
                    <span className="font-body text-xs text-blue-200 font-medium">/ 100.0</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-body text-[10px] text-blue-100 mt-1">
                    <CheckCircle2 size={12} className="text-green-400" />
                    Melampaui KKTP (75.0)
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-white/10 border border-white/20 relative z-10">
                  <span className="text-2xl font-bold font-display leading-none">A</span>
                  <span className="font-body text-[8px] uppercase font-bold mt-1 tracking-widest text-blue-100">Sangat Baik</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                  <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Kehadiran</span>
                  <span className="font-display text-xl font-bold text-green-700 leading-tight">100%</span>
                  <span className="font-body text-[10px] text-slate-400 font-medium mt-0.5">24 dari 24 Sesi</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                  <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Ketuntasan Tugas</span>
                  <span className="font-display text-xl font-bold text-blue-700 leading-tight">6 / 6</span>
                  <span className="font-body text-[10px] text-slate-400 font-medium mt-0.5">Tepat Waktu (100%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
