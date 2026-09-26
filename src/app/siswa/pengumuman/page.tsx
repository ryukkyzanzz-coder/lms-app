'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  Bell,
  Search,
  Filter,
  Megaphone,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SiswaPengumumanPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 font-body text-xs text-slate-500">
            <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <Home size={14} />
              Portal Siswa
            </Link>
            <span>/</span>
            <span className="font-semibold text-blue-700">Pengumuman Akademik</span>
          </nav>
          
          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display text-2xl lg:text-3xl text-slate-900 font-bold tracking-tight">
              Pusat Informasi & Pengumuman
            </h1>
            <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-100 font-body text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
              1 Belum Dibaca
            </span>
          </div>
          
          <p className="font-body text-sm text-slate-500 max-w-3xl mt-1">
            Informasi resmi dari guru, sekolah, dan pembaruan terkait kelas yang Anda ikuti.
          </p>
        </div>
      </div>

      {/* 2. FILTER & SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
          <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-body text-sm font-bold whitespace-nowrap border border-blue-100">
            Semua (14)
          </button>
          <button className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-body text-sm font-medium whitespace-nowrap transition-colors">
            Belum Dibaca (1)
          </button>
          <button className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-body text-sm font-medium whitespace-nowrap transition-colors">
            Penting
          </button>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari pengumuman..." 
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-slate-50 border border-slate-200 font-body text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <button className="h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* 3. PENGUMUMAN LIST */}
      <div className="flex flex-col gap-4">
        
        {/* Item 1: Unread / High Priority */}
        <Link href="/siswa/pengumuman/1" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-5 hover:shadow-md transition-all relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600"></div>
            
            <div className="flex items-start gap-4 pl-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Megaphone size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Perubahan Jadwal Praktikum Lab Komputer
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-body text-[10px] font-bold uppercase tracking-wider">
                    Baru
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 font-body text-[10px] font-bold border border-red-100 flex items-center gap-1">
                    Penting
                  </span>
                </div>
                <p className="font-body text-sm text-slate-600 line-clamp-2 leading-relaxed max-w-4xl">
                  Diinformasikan kepada seluruh siswa kelas XII RPL 1, dikarenakan adanya maintenance server di Lab 1, jadwal praktikum Pemrograman Web besok (Selasa) dipindah ke Lab Komputer 2. Mohon hadir tepat waktu.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 font-body text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">BP</span>
                    Budi Pratama, S.Kom.
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Hari ini, 08:30 WIB
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    Pemrograman Web & Perangkat Bergerak
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              <ChevronRight size={20} />
            </div>
          </div>
        </Link>

        {/* Item 2: Read */}
        <Link href="/siswa/pengumuman/2" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 hover:opacity-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                <Info size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                    Materi Tambahan: Dokumentasi API Express.js
                  </h3>
                </div>
                <p className="font-body text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-4xl">
                  Bagi yang kesulitan mengerjakan Tugas 03, Bapak sudah mengunggah link referensi tambahan ke dokumentasi resmi Express.js dan contoh implementasi JWT di folder materi. Silakan dipelajari.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 font-body text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">BP</span>
                    Budi Pratama, S.Kom.
                  </span>
                  <span className="text-slate-200">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Kemarin, 14:15 WIB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Item 3: Read - Sekolah */}
        <Link href="/siswa/pengumuman/3" className="group">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 hover:opacity-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Bell size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                    Pembayaran SPP Bulan September 2026
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold uppercase tracking-wider">
                    Sekolah
                  </span>
                </div>
                <p className="font-body text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-4xl">
                  Diberitahukan kepada seluruh siswa, pembayaran SPP bulan September maksimal tanggal 10. Bagi yang sudah transfer mohon konfirmasi ke Tata Usaha.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 font-body text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">TU</span>
                    Tata Usaha SMK N 1
                  </span>
                  <span className="text-slate-200">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    23 Sep 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
      
      {/* 4. Pagination */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-50" disabled>
            &lt;
          </button>
          <button className="w-8 h-8 rounded bg-blue-600 text-white font-body text-sm font-bold flex items-center justify-center shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 font-body text-sm font-medium flex items-center justify-center transition-colors">
            2
          </button>
          <span className="text-slate-400 mx-1">...</span>
          <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 font-body text-sm font-medium flex items-center justify-center transition-colors">
            5
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
}
