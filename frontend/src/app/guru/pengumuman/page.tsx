'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Megaphone, 
  TrendingUp, 
  Users, 
  Clock, 
  Search, 
  ChevronDown, 
  Pin,
  GraduationCap,
  Calendar,
  User,
  FileText,
  Code,
  ExternalLink,
  Eye,
  BarChart2,
  Bell,
  Edit,
  MoreVertical,
  ClipboardList,
  Download,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function PengumumanPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* ACADEMIC CONTEXT HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1.5 text-[12px] font-medium" aria-label="Breadcrumb">
            <Link href="/guru/kelas" className="text-blue-700 hover:underline">Kelas Saya</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-600">XII RPL 1</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-semibold bg-slate-100 px-2 py-0.5 rounded">Pengumuman Kelas</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Pengumuman Kelas</h1>
            <span className="text-slate-400 font-normal hidden sm:inline">—</span>
            <span className="font-display text-xl font-bold text-slate-700 hidden sm:inline">Pemrograman Web</span>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-blue-100 ml-auto sm:ml-0">
              Kurikulum Merdeka
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Sampaikan informasi resmi, pembaruan silabus, jadwal praktikum lab, dan instruksi asesmen kepada peserta didik di rombel Anda.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors shadow-sm">
            <Users size={18} className="text-blue-700" />
            <span className="hidden sm:inline">Sinkronisasi Orang Tua</span>
            <span className="sm:hidden">Sinkron Ortu</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors shadow-sm">
            <Plus size={18} />
            <span>Buat Pengumuman Baru</span>
          </button>
        </div>
      </div>

      {/* KPI STATS SUMMARY ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Total Pengumuman</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Megaphone size={18} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">14</span>
              <span className="text-[12px] font-semibold text-slate-500">Rilis</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-2">8 Aktif • 4 Terjadwal • 2 Arsip</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Tingkat Keterbacaan</span>
            <span className="flex items-center gap-1 text-[12px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <TrendingUp size={14} /> +3.5%
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">91.2%</span>
              <span className="text-[12px] font-medium text-slate-500">rerata</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '91.2%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-1">29 dari 32 siswa aktif membaca</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Target Kelas Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">3</span>
              <span className="text-[12px] font-semibold text-slate-500">Rombel</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-2 leading-relaxed">XII RPL 1 (Utama), XII RPL 2, X PPLG 1</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Clock size={60} className="text-orange-600" />
          </div>
          <div className="relative z-10 flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Broadcast Terdekat</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="relative z-10 flex flex-col mt-1">
            <span className="font-display text-[15px] font-bold text-slate-900 truncate" title="Praktikum Lab 2">Praktikum Lab 2</span>
            <div className="flex items-center gap-1.5 mt-2 bg-slate-50 border border-slate-100 rounded p-1.5 w-fit">
              <Calendar size={14} className="text-slate-400" />
              <span className="text-[11px] text-slate-600 font-medium">Rabu, 30 Sep • 06.30 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & CONTROL TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[13px] font-semibold whitespace-nowrap shadow-sm">
            Semua Pengumuman
            <span className="bg-blue-600/30 text-blue-200 px-1.5 py-0.5 rounded text-[11px]">14</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Dipublikasikan
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">8</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Terjadwal
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">4</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Draft Guru
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">2</span>
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text" 
              className="w-full sm:w-[220px] lg:w-[280px] h-10 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
              placeholder="Cari judul, topik..." 
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:flex-none">
              <select className="w-full appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow">
                <option>XII RPL 1</option>
                <option>XII RPL 2</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select className="w-full appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow">
                <option>Semester Ganjil</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT LISTING */}
      <div className="flex flex-col gap-6">
        {/* ITEM 1: PINNED / RESMI PENTING */}
        <article className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm relative flex flex-col pl-2">
          {/* Accent Strip */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600"></div>
          
          <div className="p-5 lg:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  <Pin size={12} className="rotate-45" />
                  Pengumuman Resmi Penting • Pinned
                </span>
                <span className="flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                  <GraduationCap size={12} />
                  Target: XII RPL 1
                </span>
                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                  Dipublikasikan
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium shrink-0">
                <Clock size={14} className="text-slate-400" />
                <span>28 Sep 2026, 08:30</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <User size={14} />
                  Drs. Hendra S.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[18px] font-bold text-slate-900 leading-snug">
                Perubahan Jam Praktikum Lab & Persiapan Uji Kompetensi REST API Postman
              </h2>
              <p className="text-[14px] text-slate-600 leading-relaxed text-justify">
                Diberitahukan kepada seluruh siswa kelas XII RPL 1 bahwa sesi laboratorium pada hari Rabu, 30 September dialihkan ke Lab Komputer 2 (IP Static V-LAN). Seluruh siswa wajib memastikan starter template Express.js telah di-clone dan Postman Desktop Client sudah terinstal versi 11.4+. Keterlambatan toleransi maksimal 10 menit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="#" className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-3 hover:border-red-300 hover:shadow-sm transition-all sm:w-[320px]">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-display text-[13px] font-semibold text-slate-800 truncate">Panduan_Lab_Komputer_2_Config.pdf</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">1.8 MB • Unduh Dokumen</span>
                </div>
                <Download size={16} className="text-slate-400 shrink-0" />
              </Link>
              
              <Link href="#" className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all sm:w-[320px]">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Code size={20} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-display text-[13px] font-semibold text-slate-800 truncate">rest-starter-kit</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Repositori Resmi Template</span>
                </div>
                <ExternalLink size={16} className="text-slate-400 shrink-0" />
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-2">
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
                    <Eye size={16} className="text-blue-700" />
                    29 / 32 Siswa Telah Membaca (90.6%)
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-bold">
                    3 Belum Membaca
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '90.6%' }}></div>
                </div>
                <div className="flex items-center gap-2 text-[11px] mt-1">
                  <span className="text-slate-500">Menunggu konfirmasi:</span>
                  <span className="font-semibold text-slate-700">Ahmad Fauzi, Rizky Pratama, Zulfikar</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 shrink-0 xl:pl-6 xl:border-l xl:border-slate-200">
                <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-md text-[12px] font-semibold transition-colors shadow-sm">
                  <BarChart2 size={14} className="text-slate-400" />
                  <span>Detail Pembaca</span>
                </button>
                <button className="flex items-center gap-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-700 px-3 py-2 rounded-md text-[12px] font-semibold transition-colors shadow-sm">
                  <Bell size={14} />
                  <span>Kirim Pengingat (3)</span>
                </button>
                <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-md shadow-sm transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* ITEM 2: DIPUBLIKASIKAN (TUGAS / DEADLINE) */}
        <article className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm relative flex flex-col pl-[2px]">
          <div className="p-5 lg:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 bg-slate-100 text-blue-700 border border-slate-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  <ClipboardList size={14} />
                  Tenggat & Asesmen
                </span>
                <span className="flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                  XII RPL 1
                </span>
                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold border border-green-100">
                  Terbaca: 31/32 (96.8%)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium shrink-0">
                <Clock size={14} className="text-slate-400" />
                <span>25 Sep 2026, 14:00</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[17px] font-bold text-slate-900 leading-snug">
                Pemberitahuan Tenggat Waktu Pengumpulan Tugas 03: Otentikasi JWT & Middleware
              </h2>
              <p className="text-[14px] text-slate-600 leading-relaxed text-justify">
                Tenggat waktu submission repositori Git dan dokumentasi Postman Runner berakhir malam ini pukul 23.59 WIB. Kebijakan toleransi keterlambatan (grace period) 24 jam dengan penalti potongan 10 poin otomatis pada sistem rekap nilai LMS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 mt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200/60 w-fit">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Notifikasi Push & Email Siswa Terkirim</span>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                  Lihat
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                  Edit
                </button>
                <button className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                  <Copy size={14} className="text-slate-400" />
                  <span className="hidden md:inline">Duplikasi ke XII RPL 2</span>
                  <span className="md:hidden">Duplikasi</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* BOTTOM OPERATIONAL DISCIPLINE BANNER */}
      <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-4 lg:p-5 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-display text-[14px] text-slate-900 font-bold">
            Kebijakan Komunikasi & Notifikasi Multi-Peran
          </span>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Pengumuman yang dipublikasikan secara otomatis memicu <strong className="font-semibold text-slate-800">push notification</strong> pada aplikasi mobile Murid, portal orang tua, dan tercatat dalam buku log kegiatan mengajar guru untuk supervisi Kurikulum & Kepala Sekolah.
          </p>
        </div>
      </div>
    </div>
  );
}
