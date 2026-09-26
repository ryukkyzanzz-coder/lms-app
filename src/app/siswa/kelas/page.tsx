'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Verified,
  Terminal,
  Clock,
  Search,
  ArrowUpDown,
  Timer,
  Calendar,
  Monitor,
  ClipboardList,
  UserCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function SiswaKelasPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 lg:gap-8">
      {/* 1. Academic Context Header */}
      <div className="bg-white border-b border-slate-200/60 px-4 py-4 lg:px-8 lg:py-6 lg:-mx-6 -mx-4 -mt-6 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 max-w-[1440px] mx-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold tracking-wide uppercase mb-2">
              <span className="hover:text-blue-700 cursor-pointer transition-colors">Portal Siswa</span>
              <span>/</span>
              <span className="text-slate-600 font-bold">Pembelajaran</span>
              <span>/</span>
              <span className="text-blue-700 font-bold">Kelas Saya</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl lg:text-3xl text-blue-900 tracking-tight font-bold">
                Kelas Saya — Rombel & Mata Pelajaran
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-body text-xs font-semibold border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Semester Ganjil TA 2026/2027 • Fase F (SMK)
              </span>
            </div>
            <p className="font-body text-sm text-slate-500 mt-2 max-w-2xl">
              Daftar seluruh rombongan belajar konsentrasi keahlian Rekayasa Perangkat Lunak yang kamu ikuti semester ini.
            </p>
          </div>
          {/* Live Dapodik State Badge */}
          <div className="flex items-center gap-3 self-start lg:self-center shrink-0 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200/60">
            <Verified size={20} className="text-green-600" />
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold tracking-wider text-slate-500 leading-tight mb-0.5">Sinkronisasi Rombel</span>
              <span className="font-body text-xs font-bold text-slate-900 leading-tight">Dapodik Terkunci • XII RPL 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Summary Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-700 shrink-0">
              <Terminal size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Mata Pelajaran Kejuruan</span>
              <span className="font-display text-lg font-bold text-slate-900 leading-tight mt-0.5">4 Konsentrasi Keahlian</span>
            </div>
          </div>
          <span className="font-body text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 hidden lg:inline-flex">RPL</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-700 shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Muatan Nasional & Umum</span>
              <span className="font-display text-lg font-bold text-slate-900 leading-tight mt-0.5">3 Mata Pelajaran</span>
            </div>
          </div>
          <span className="font-body text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 hidden lg:inline-flex">Fase F</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0">
              <Clock size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Beban Belajar Mingguan</span>
              <span className="font-display text-lg font-bold text-slate-900 leading-tight mt-0.5">48 Jam Pelajaran (JP)</span>
            </div>
          </div>
          <span className="font-body text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 hidden lg:inline-flex">Aktif</span>
        </div>
      </div>

      {/* 3. Operational Filter & Search */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm mb-4">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            className="w-full h-9 pl-9 pr-3 text-sm font-body rounded-lg bg-slate-50 border border-slate-200/60 placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
            placeholder="Cari mata pelajaran, guru pengampu..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md font-body text-xs font-semibold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'}`}
          >
            Semua Kategori (7)
          </button>
          <button 
            onClick={() => setFilter('kejuruan')}
            className={`px-3 py-1.5 rounded-md font-body text-xs font-semibold whitespace-nowrap transition-colors ${filter === 'kejuruan' ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'}`}
          >
            Konsentrasi RPL (4)
          </button>
          <button 
            onClick={() => setFilter('umum')}
            className={`px-3 py-1.5 rounded-md font-body text-xs font-semibold whitespace-nowrap transition-colors ${filter === 'umum' ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'}`}
          >
            Umum & Nasional (3)
          </button>
          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" title="Urutkan Jadwal">
            <ArrowUpDown size={18} />
          </button>
        </div>
      </div>

      {/* 4. Section: Kejuruan */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-700"></span>
            <h2 className="font-display text-lg text-slate-900 font-bold">Konsentrasi Keahlian — Rekayasa Perangkat Lunak</h2>
            <span className="font-body text-xs font-semibold text-slate-500 ml-1">Fase F SMK</span>
          </div>
          <span className="font-body text-xs font-bold text-blue-700">4 Mata Pelajaran Terjadwal</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Card 1: Pemrograman Web (Active/Featured) */}
          <div className="bg-white border-2 border-blue-600/20 rounded-xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all hover:border-blue-600/40">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-blue-600/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col flex-1">
              {/* Meta Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-800 text-white font-body text-[10px] font-bold tracking-wider">RPL-301</span>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200/60 font-body text-[10px] font-bold">Praktikum Utama</span>
                </div>
                <span className="flex items-center gap-1 font-body text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200/60">
                  <Timer size={14} /> 1 Tugas Mendekati Tenggat
                </span>
              </div>
              
              {/* Title & Teacher */}
              <Link href="/siswa/kelas/rpl-301" className="group">
                <h3 className="font-display text-xl text-slate-900 font-bold group-hover:text-blue-700 transition-colors mb-1.5 leading-tight">
                  Pemrograman Web & Perangkat Bergerak
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-slate-600 font-body text-xs mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">BP</div>
                <span className="font-bold text-slate-900">Budi Pratama, S.Kom.</span>
                <span className="text-slate-300">•</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]">Wali Kelas XII RPL 1</span>
              </div>
              
              {/* Schedule & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 mb-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar size={16} className="text-slate-400 shrink-0" />
                  <span className="font-body text-xs font-semibold">Senin (07.00 - 08.30) & Rabu</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Monitor size={16} className="text-slate-400 shrink-0" />
                  <span className="font-body text-xs font-semibold">Lab Komputer RPL 2</span>
                </div>
              </div>
              
              {/* Progress Capaian */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-[11px] font-body mb-1.5">
                  <span className="text-slate-500 font-semibold">Capaian Pembelajaran (CP)</span>
                  <span className="font-bold text-blue-700">8 / 12 Modul Tuntas (67%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '67.5%' }}></div>
                </div>
              </div>
              
              {/* Operational Indicators */}
              <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/60">
                  <ClipboardList size={20} className="text-blue-700 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Status Tugas</span>
                    <span className="font-bold text-slate-900 text-[11px] leading-tight truncate">2 Tugas Aktif</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/60">
                  <UserCheck size={20} className="text-green-600 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Presensi Sesi</span>
                    <span className="font-bold text-green-700 text-[11px] leading-tight truncate">100% (24/24)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action CTAs */}
            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3 shrink-0">
              <Link href="/siswa/kelas/rpl-301/silabus" className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-body text-[13px] font-bold text-slate-600 flex items-center gap-2 transition-colors">
                <BookOpen size={16} />
                <span>Materi & Silabus</span>
              </Link>
              <Link href="/siswa/kelas/rpl-301" className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-[13px] font-bold flex items-center gap-2 transition-all shadow-sm flex-1 justify-center sm:flex-none sm:justify-start">
                <span>Buka Ruang Kelas</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Card 2: Basis Data */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all">
            <div className="flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-600 text-white font-body text-[10px] font-bold tracking-wider">RPL-302</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold">Teori & Praktik</span>
                </div>
                <span className="font-body text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Jadwal Besok
                </span>
              </div>
              
              <Link href="/siswa/kelas/rpl-302" className="group">
                <h3 className="font-display text-xl text-slate-900 font-bold group-hover:text-blue-700 transition-colors mb-1.5 leading-tight">
                  Basis Data & Pemodelan Relasional
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-slate-600 font-body text-xs mb-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">SA</div>
                <span className="font-bold text-slate-900">Siti Aulia, S.Kom.</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-semibold text-[10px]">Guru Kejuruan RPL</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 mb-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar size={16} className="text-slate-400 shrink-0" />
                  <span className="font-body text-xs font-semibold">Selasa & Kamis</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Monitor size={16} className="text-slate-400 shrink-0" />
                  <span className="font-body text-xs font-semibold">Ruang Teori RPL 1</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center text-[11px] font-body mb-1.5">
                  <span className="text-slate-500 font-semibold">Capaian Pembelajaran (CP)</span>
                  <span className="font-bold text-slate-700">5 / 10 Modul Tuntas (50%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/60">
                  <ClipboardList size={20} className="text-slate-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Status Tugas</span>
                    <span className="font-bold text-slate-600 text-[11px] leading-tight truncate">Semua Tuntas</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/60">
                  <UserCheck size={20} className="text-green-600 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Presensi Sesi</span>
                    <span className="font-bold text-green-700 text-[11px] leading-tight truncate">95% (20/21)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3 shrink-0">
              <Link href="/siswa/kelas/rpl-302/silabus" className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-body text-[13px] font-bold text-slate-600 flex items-center gap-2 transition-colors">
                <BookOpen size={16} />
                <span>Materi & Silabus</span>
              </Link>
              <Link href="/siswa/kelas/rpl-302" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-body text-[13px] font-bold flex items-center gap-2 transition-all shadow-sm flex-1 justify-center sm:flex-none sm:justify-start">
                <span>Buka Ruang Kelas</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
