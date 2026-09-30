'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Download, 
  RefreshCcw, 
  BookOpen, 
  TrendingUp, 
  ClipboardCheck, 
  BarChart3,
  Users,
  AlertCircle,
  ArrowRight,
  BookMarked,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  MoreHorizontal
} from 'lucide-react';

export default function ProgresSiswaPage() {
  const [activeTab, setActiveTab] = useState('semua');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* ACADEMIC CONTEXT HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1.5 text-[12px] font-medium" aria-label="Breadcrumb">
            <Link href="/guru/dashboard" className="text-blue-700 hover:underline">Beranda</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-semibold bg-slate-100 px-2 py-0.5 rounded">Progres Siswa</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Progres Siswa</h1>
            <span className="text-slate-400 font-normal hidden sm:inline">—</span>
            <span className="font-display text-xl font-bold text-slate-700 hidden sm:inline">Pemrograman Web</span>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-blue-100 ml-auto sm:ml-0">
              XII RPL 1
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Pantau perkembangan belajar siswa pada kelas yang Anda ajar, ketuntasan modul ajar, dan kepatuhan tugas praktikum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors shadow-sm">
            <Download size={18} className="text-blue-700" />
            <span className="hidden sm:inline">Unduh Rekap Progres</span>
            <span className="sm:hidden">Unduh Rekap</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors shadow-sm">
            <RefreshCcw size={18} />
            <span className="hidden sm:inline">Sinkronisasi Data</span>
            <span className="sm:hidden">Sinkron</span>
          </button>
        </div>
      </div>

      {/* SECTION 01: RINGKASAN METRIK KELAS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Penyelesaian Materi</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">78.4%</span>
              <span className="flex items-center gap-1 text-[12px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                <TrendingUp size={14} /> +4.2%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '78.4%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">25 dari 32 siswa aktif menyelesaikan modul</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Pengumpulan Tugas</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <ClipboardCheck size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">86.5%</span>
              <span className="text-[11px] font-semibold text-slate-500">(28/32 Siswa)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '86.5%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Rerata keterlambatan serah 1.2 hari</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Rata-Rata Nilai</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">81.2</span>
              <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">Tuntas Klasikal</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '81.2%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Dari 4 asesmen formatif & sumatif (KKM: 75)</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Aktivitas Belajar</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">89.0%</span>
              <span className="text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">Aktif 7 Hari</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">29 dari 32 siswa berinteraksi di portal</span>
          </div>
        </div>
      </section>

      {/* SECTION 02 & 04: GRID 2-COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PART A: PERLU PERHATIAN */}
        <section className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">Perlu Perhatian Pendidik</h2>
            </div>
            <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">3 Peringatan</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* Warning Card 1 */}
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-red-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] text-slate-900">3 Siswa Belum Menyerahkan Tugas 03</span>
                  <span className="text-[12px] text-slate-600 mt-0.5">REST API & Autentikasi JWT (Tenggat lewat 2 hari lalu)</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[11px] font-medium shadow-sm">Ahmad Fauzi</span>
                    <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[11px] font-medium shadow-sm">Bayu Segara</span>
                    <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[11px] font-medium shadow-sm">Siti Nurhaliza</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center gap-1.5 w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-md text-[12px] font-semibold transition-colors mt-1">
                <span>Lihat Siswa & Kirim Notifikasi Pengingat</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Warning Card 2 */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <BookMarked size={20} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] text-slate-900">5 Siswa Belum Membuka Modul '06. Fetch API'</span>
                  <span className="text-[12px] text-slate-600 mt-0.5">Nol riwayat penelusuran modul teori sejak dipublikasi 4 hari lalu.</span>
                </div>
              </div>
              <button className="flex items-center justify-center gap-1.5 w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-md text-[12px] font-semibold transition-colors mt-1">
                <span>Lihat Progres Materi Siswa</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* PART B: PROGRES KETUNTASAN MATERI PER BAB */}
        <section className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-700" />
              <h2 className="font-display text-[15px] font-semibold text-slate-900">Ketuntasan Kurikulum Modul Ajar</h2>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Target KBM: 80% per Kompetensi</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* BAB 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">Bab 1</span>
                  <span className="font-semibold text-[14px] text-slate-900">Dasar Pengembangan Web Modern</span>
                </div>
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">94% Tuntas</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] mt-1">
                <div className="text-slate-500">HTTP & Server: <span className="font-semibold text-slate-900">92%</span></div>
                <div className="text-slate-500">Semantic HTML: <span className="font-semibold text-slate-900">88%</span></div>
                <div className="text-slate-500">CSS Grid & Flex: <span className="font-semibold text-slate-900">76%</span></div>
              </div>
            </div>

            <div className="h-px w-full bg-slate-100"></div>

            {/* BAB 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">Bab 2</span>
                  <span className="font-semibold text-[14px] text-slate-900">Pemrograman JavaScript Lanjut</span>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">78% Berjalan</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] mt-1">
                <div className="text-slate-500">JS Fundamental: <span className="font-semibold text-slate-900">81%</span></div>
                <div className="text-slate-500">DOM Events: <span className="font-semibold text-slate-900">74%</span></div>
                <div className="text-slate-500">Fetch & Async: <span className="font-semibold text-slate-900">63%</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 03: DAFTAR PROGRES SISWA */}
      <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${activeTab === 'semua' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('semua')}
            >
              Semua Siswa
              <span className={`px-1.5 py-0.5 rounded text-[11px] ${activeTab === 'semua' ? 'bg-blue-600/30 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>32</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${activeTab === 'perhatian' ? 'bg-red-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('perhatian')}
            >
              Perlu Perhatian
              <span className={`px-1.5 py-0.5 rounded text-[11px] ${activeTab === 'perhatian' ? 'bg-red-700/50 text-red-100' : 'bg-red-100 text-red-600 font-bold'}`}>5</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${activeTab === 'baik' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setActiveTab('baik')}
            >
              Progres Baik
              <span className={`px-1.5 py-0.5 rounded text-[11px] ${activeTab === 'baik' ? 'bg-blue-600/30 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>24</span>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                className="w-full sm:w-[200px] h-9 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
                placeholder="Cari nama atau NIS..." 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-none">
                <select className="w-full appearance-none h-9 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow">
                  <option>Semua Bab (1 - 3)</option>
                  <option>Bab 1: Dasar Web</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 shrink-0">
                <button className="p-1 rounded bg-white text-blue-900 shadow-sm border border-slate-200/40" title="Tampilan Tabel">
                  <List size={16} />
                </button>
                <button className="p-1 rounded text-slate-500 hover:text-slate-700" title="Tampilan Rincian Bab">
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3 w-[64px]">No/NIS</th>
                <th className="px-5 py-3">Nama Siswa</th>
                <th className="px-5 py-3 w-[220px]">Ketuntasan Materi</th>
                <th className="px-5 py-3 w-[180px]">Pengumpulan Tugas</th>
                <th className="px-5 py-3 w-[110px] text-center">Rerata Nilai</th>
                <th className="px-5 py-3 w-[160px]">Aktivitas Terakhir</th>
                <th className="px-5 py-3 w-[120px] text-center">Status</th>
                <th className="px-5 py-3 w-[80px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
              {/* ROW 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">#24</span>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5">2204128</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-display font-semibold text-sm shrink-0">
                      RA
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">Rakha Arkana</span>
                      <span className="text-[11px] text-slate-500 mt-0.5">XII RPL 1 • Hadir Penuh</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-blue-700 font-bold">92%</span>
                      <span className="text-slate-500">11 / 12 Modul</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">8/8</span>
                    <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[11px] font-bold">Tepat Waktu</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-center">
                  <span className="inline-block font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">88.0</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-slate-900">15 mnt lalu</span>
                    <span className="text-[11px] text-slate-500 truncate max-w-[140px] mt-0.5" title="Membaca Bab 3.2 JWT">Membaca Bab 3.2 JWT</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-center">
                  <span className="inline-block bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Baik</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-700 font-semibold hover:bg-blue-50 px-2 py-1 rounded transition-colors text-[13px]">Detail</button>
                </td>
              </tr>

              {/* ROW 2 (Error) */}
              <tr className="bg-red-50/30 hover:bg-red-50/50 transition-colors">
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">#03</span>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5">2204101</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-display font-semibold text-sm shrink-0">
                      AF
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">Ahmad Fauzi</span>
                      <span className="text-[11px] text-red-600 font-medium mt-0.5">Menunggak Tugas 03</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-red-600 font-bold">41.6%</span>
                      <span className="text-slate-500">5 / 12 Modul</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full" style={{ width: '41.6%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">4/8</span>
                    <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[11px] font-bold">2 Terlambat</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-center">
                  <span className="inline-block font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded">64.0</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-slate-900">Kemarin, 14:20</span>
                    <span className="text-[11px] text-slate-500 truncate max-w-[140px] mt-0.5">Login Beranda</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-center">
                  <span className="inline-block bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Perlu Perhatian</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-700 font-semibold hover:bg-blue-50 px-2 py-1 rounded transition-colors text-[13px]">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
