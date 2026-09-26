'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  BookOpen,
  ChevronDown,
  Monitor,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import Image from 'next/image';

export default function SiswaMateriPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      {/* 1. Header & Context */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-500 font-body text-xs">
              <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
                <Home size={14} />
                Portal Siswa
              </Link>
              <span>/</span>
              <span className="font-semibold text-blue-700">Materi Pembelajaran</span>
            </div>
            <div>
              <h1 className="font-display text-2xl lg:text-3xl text-blue-900 font-bold tracking-tight leading-tight">
                Materi Pembelajaran & Modul Praktikum Kejuruan
              </h1>
              <p className="font-body text-sm text-slate-500 mt-1">
                Silabus terpadu kompetensi Rekayasa Perangkat Lunak (RPL) - Kelas XII RPL 1
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <label className="font-body text-xs font-semibold text-slate-500 hidden sm:block">Mata Pelajaran:</label>
            <div className="relative flex-1 lg:flex-none">
              <select className="w-full lg:w-auto h-10 pl-3 pr-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm font-bold appearance-none focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all cursor-pointer">
                <option value="pwb">Pemrograman Web (Aktif)</option>
                <option value="bd">Basis Data & SQL Server</option>
                <option value="pbo">PBO Java Enterprise</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Progres Capaian Silabus — Semester Ganjil</h2>
            <p className="font-body text-xs text-slate-500">Berdasarkan penyelesaian modul dan skor ketuntasan tes formatif.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Modul Selesai</span>
                <span className="font-display text-sm font-bold text-slate-900">8 Materi</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center">
                <Lock size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Belum Terbuka</span>
                <span className="font-display text-sm font-bold text-slate-900">4 Materi</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '67%' }}></div>
          </div>
          <span className="font-display text-lg font-bold text-blue-700 w-12 text-right">67%</span>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari judul modul atau topik bab..." 
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-slate-200/60 font-body text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-white border border-slate-200/60 hover:bg-slate-50 font-body text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Filter size={16} className="text-slate-500" />
            Urutkan
          </button>
        </div>
      </div>

      {/* 4. Module List */}
      <div className="space-y-4">
        {/* Module 8 (Active) */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-600/30 p-5 transition-all hover:border-blue-600/50">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
              <Image 
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop" 
                alt="Modul 8"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white font-body text-[10px] font-bold">
                12:45 Menit
              </div>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body text-[10px] font-bold uppercase tracking-wider">Modul 08</span>
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-body text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Sedang Dipelajari
                </span>
              </div>
              
              <Link href="/siswa/materi/modul-08">
                <h3 className="font-display text-lg text-slate-900 font-bold hover:text-blue-700 transition-colors leading-tight mb-1.5">
                  Arsitektur RESTful API & Setup Node.js Express
                </h3>
              </Link>
              
              <p className="font-body text-sm text-slate-500 line-clamp-2 mb-3">
                Pengenalan konsep arsitektur REST, statelessness, standar status code HTTP, dan setup proyek awal menggunakan Express.js serta Nodemon.
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <span className="flex items-center gap-1.5 font-body text-xs text-slate-500 font-medium">
                  <PlayCircle size={14} /> 4 Video Interaktif
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs text-slate-500 font-medium">
                  <FileText size={14} /> 2 Handout PDF
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs text-slate-500 font-medium">
                  <Monitor size={14} /> 1 Tugas Lab
                </span>
              </div>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-slate-100 mt-4 md:mt-0">
              <div className="flex flex-col items-center md:mb-2">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Progres Saya</span>
                <span className="font-display text-xl font-bold text-blue-700 leading-none">25%</span>
              </div>
              <Link href="/siswa/materi/modul-08" className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm">
                Lanjutkan Belajar
                <PlayCircle size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Module 7 (Completed) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 transition-all hover:border-slate-300">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative group">
              <Image 
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop" 
                alt="Modul 7"
                width={300}
                height={200}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center backdrop-blur-[1px]">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/50">
                  <CheckCircle2 size={24} />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0 opacity-80">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold uppercase tracking-wider">Modul 07</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-600" />
                  Selesai Dipelajari
                </span>
              </div>
              
              <Link href="/siswa/materi/modul-07">
                <h3 className="font-display text-lg text-slate-900 font-bold hover:text-blue-700 transition-colors leading-tight mb-1.5">
                  Lifecycle React.js & Hooks Lanjutan (useEffect)
                </h3>
              </Link>
              
              <p className="font-body text-sm text-slate-500 line-clamp-2 mb-3">
                Memahami daur hidup komponen fungsional di React dan penggunaan useEffect untuk fetching data API eksternal.
              </p>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-slate-100 mt-4 md:mt-0">
              <div className="flex flex-col items-center md:mb-2">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Skor Formatif</span>
                <span className="font-display text-xl font-bold text-green-700 leading-none">92.0</span>
              </div>
              <Link href="/siswa/materi/modul-07" className="px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-body text-xs font-bold transition-all">
                Ulas Kembali
              </Link>
            </div>
          </div>
        </div>

        {/* Module 9 (Locked) */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/60 p-5 opacity-75">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
              <Lock size={32} />
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-500 font-body text-[10px] font-bold uppercase tracking-wider">Modul 09</span>
              </div>
              
              <h3 className="font-display text-lg text-slate-500 font-bold leading-tight mb-1.5">
                Autentikasi JWT & Middleware pada Express.js
              </h3>
              
              <p className="font-body text-sm text-slate-400 line-clamp-2 mb-3">
                Materi terkunci. Selesaikan Modul 08 beserta kuis formatifnya terlebih dahulu untuk membuka akses ke materi ini.
              </p>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-slate-200 mt-4 md:mt-0">
              <div className="px-4 py-2 rounded-lg bg-slate-200 text-slate-400 font-body text-xs font-bold flex items-center gap-1.5 cursor-not-allowed">
                Terkunci
                <Lock size={16} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
