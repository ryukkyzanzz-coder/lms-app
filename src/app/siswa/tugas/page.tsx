'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Image from 'next/image';

export default function SiswaTugasPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. Header & Context */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 font-body text-xs">
            <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <Home size={14} />
              Portal Siswa
            </Link>
            <span>/</span>
            <span className="font-semibold text-blue-700">Tugas & Penilaian</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl text-blue-900 font-bold tracking-tight leading-tight">
                Tugas & Penilaian
              </h1>
              <p className="font-body text-sm text-slate-500 mt-1">
                Daftar tugas, praktikum, dan ujian yang perlu Anda selesaikan.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/60 w-full lg:w-auto shrink-0">
              <div className="flex flex-col px-3 border-r border-slate-200">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Tugas Aktif</span>
                <span className="font-display text-lg font-bold text-red-600 leading-none">2</span>
              </div>
              <div className="flex flex-col px-3 border-r border-slate-200">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Tuntas</span>
                <span className="font-display text-lg font-bold text-green-600 leading-none">14</span>
              </div>
              <div className="flex flex-col px-3">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Rata-rata</span>
                <span className="font-display text-lg font-bold text-blue-700 leading-none">88.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama tugas atau mata pelajaran..." 
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-slate-200/60 font-body text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-body text-xs font-bold whitespace-nowrap transition-colors shadow-sm ${filter === 'all' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            Semua Tugas
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-body text-xs font-bold whitespace-nowrap transition-colors shadow-sm ${filter === 'active' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            Belum Dikerjakan (2)
          </button>
          <button 
            onClick={() => setFilter('done')}
            className={`px-4 py-2 rounded-lg font-body text-xs font-bold whitespace-nowrap transition-colors shadow-sm ${filter === 'done' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            Selesai Dinilai
          </button>
        </div>
      </div>

      {/* 3. Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Task 1 */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-red-500/30 p-5 lg:p-6 transition-all hover:border-red-500/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body text-[10px] font-bold">RPL-301</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-body text-[10px] font-bold">Praktikum</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-body text-[10px] font-bold">
                <AlertCircle size={14} />
                Mendesak
              </span>
            </div>
            
            <Link href="/siswa/tugas/tugas-03">
              <h3 className="font-display text-xl text-slate-900 font-bold hover:text-blue-700 transition-colors leading-tight mb-2">
                Tugas 03: Implementasi Autentikasi JWT & Middleware Express.js
              </h3>
            </Link>
            
            <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">
              Pemrograman Web & Perangkat Bergerak — Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-auto">
            <div className="flex items-center gap-2 text-red-600">
              <Clock size={16} />
              <div className="flex flex-col">
                <span className="font-body text-[11px] font-bold">Sisa 4 Hari</span>
                <span className="font-body text-[10px] font-medium text-slate-500">Batas: 30 Sep 2026, 23:59</span>
              </div>
            </div>
            <Link href="/siswa/tugas/tugas-03" className="px-4 py-2.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
              Kerjakan Tugas
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Active Quiz 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 lg:p-6 transition-all hover:border-slate-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body text-[10px] font-bold">RPL-301</span>
                <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-body text-[10px] font-bold">Quiz CBT</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-body text-[10px] font-bold">
                <Clock size={14} />
                Belum Dikerjakan
              </span>
            </div>
            
            <Link href="/siswa/tugas/quiz-02">
              <h3 className="font-display text-xl text-slate-900 font-bold hover:text-blue-700 transition-colors leading-tight mb-2">
                Quiz: Pemahaman Asinkron JS (Promise & Async/Await)
              </h3>
            </Link>
            
            <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">
              Evaluasi formatif mandiri untuk materi JavaScript Lanjutan. 15 Soal Pilihan Ganda (25 Menit).
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-auto">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock size={16} className="text-slate-400" />
              <div className="flex flex-col">
                <span className="font-body text-[11px] font-bold">Sisa 6 Hari</span>
                <span className="font-body text-[10px] font-medium text-slate-500">Batas: 1 Okt 2026, 15:00</span>
              </div>
            </div>
            <Link href="/siswa/tugas/quiz-02" className="px-4 py-2.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-body text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
              Mulai Quiz
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Completed Task 3 */}
        <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 opacity-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-body text-[10px] font-bold">RPL-302</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-body text-[10px] font-bold">Tugas Teori</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-body text-[10px] font-bold border border-green-200">
                <CheckCircle2 size={14} />
                Dinilai
              </span>
            </div>
            
            <h3 className="font-display text-xl text-slate-800 font-bold leading-tight mb-2">
              Tugas 02: Desain Skema Database Relasional (ERD)
            </h3>
            
            <p className="font-body text-sm text-slate-500 line-clamp-2 mb-4">
              Basis Data & Pemodelan Relasional — Membuat ERD untuk sistem perpustakaan sekolah.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/60 mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Nilai Akhir</span>
                <span className="font-display text-xl font-bold text-green-700 leading-none">92.0</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Diserahkan</span>
                <span className="font-body text-xs font-bold text-slate-700 leading-none mt-1">Tepat Waktu</span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-body text-xs font-bold transition-all shadow-sm">
              Lihat Ulasan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
