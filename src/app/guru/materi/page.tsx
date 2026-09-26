'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  RefreshCcw, 
  ListOrdered, 
  PlusCircle,
  GraduationCap,
  Users,
  CheckSquare,
  Layers,
  CalendarClock,
  Search,
  ListTree,
  CalendarRange,
  Download,
  ChevronUp,
  FileText,
  Calendar,
  Eye,
  Code,
  Edit,
  MoreVertical,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function MateriPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* 1. HEADER & BREADCRUMB */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-[12px] font-medium" aria-label="Breadcrumb">
              <Link href="/guru/kelas" className="text-blue-700 hover:underline">Kelas Saya</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-600">XII RPL 1</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-900 font-semibold bg-slate-100 px-2 py-0.5 rounded">Materi Pembelajaran</span>
            </nav>
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Materi Pembelajaran <span className="text-slate-400 font-normal mx-1">—</span> Pemrograman Web
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors shadow-sm">
              <RefreshCcw size={16} className="text-slate-500" />
              <span className="hidden sm:inline">Sinkron Target Kurikulum</span>
              <span className="sm:hidden">Sinkron</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors shadow-sm">
              <ListOrdered size={16} className="text-slate-500" />
              <span className="hidden sm:inline">Atur Urutan Silabus</span>
              <span className="sm:hidden">Urutkan</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors shadow-sm">
              <PlusCircle size={16} />
              <span>Tambah Materi</span>
            </button>
          </div>
        </div>

        {/* INSTITUTIONAL CONTEXT BAR */}
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100/50 border border-blue-200/50 text-blue-700 flex items-center justify-center shrink-0">
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-[13px]">
                Kurikulum Operasional Satuan Pendidikan (KOSP) 2026/2027
              </span>
              <span className="text-[12px] text-slate-500 mt-0.5">
                Konsentrasi Keahlian: Rekayasa Perangkat Lunak (Fase F - Kelas XII)
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 bg-white px-3 py-2 rounded-lg border border-slate-200/60">
            <span className="font-semibold text-slate-700 text-[12px] mr-1">
              12 Materi Terjadwal
            </span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              8 Dipublikasikan
            </span>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              2 Terjadwal
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              2 Draft
            </span>
          </div>
        </div>
      </div>

      {/* 2. BENTO STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Tingkat Akses Siswa</span>
            <Users size={20} className="text-blue-700" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">92.4%</span>
              <span className="text-[12px] font-semibold text-green-600">+4.1% pekan ini</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '92.4%' }}></div>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Rerata 29.5 dari 32 peserta didik aktif</span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Cakupan CP Fase F</span>
            <CheckSquare size={20} className="text-green-600" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] font-bold text-slate-900 tracking-tight leading-none">3 / 4 BAB</span>
              <span className="text-[12px] font-semibold text-slate-500">75% Selesai/Aktif</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Target mid-semester terpenuhi 100%</span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-[13px]">Tipe Sumber Belajar</span>
            <Layers size={20} className="text-indigo-600" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">6 Dok.</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">PDF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">4 Lab</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Kode</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[16px] font-bold text-slate-900">2 Vid.</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Media</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-auto">Distribusi format seimbang teori-praktik</span>
        </div>

        <div className="bg-blue-900 rounded-xl p-5 shadow-sm flex flex-col gap-4 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 opacity-10">
            <CalendarClock size={100} />
          </div>
          <div className="relative z-10 flex items-center justify-between text-blue-100">
            <span className="font-semibold text-[13px]">Penerbitan Terdekat</span>
            <CalendarClock size={20} className="text-blue-200" />
          </div>
          <div className="relative z-10 flex flex-col mt-2">
            <span className="font-display text-[16px] font-bold leading-tight truncate" title="JWT Auth pada Single Page App">JWT Auth pada Single Page App</span>
            <span className="text-[12px] font-semibold text-blue-200 bg-blue-950/50 w-fit px-2 py-1 rounded mt-2">Rabu, 30 Sep 2026 • 07.00 WIB</span>
          </div>
          <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-blue-200/80 font-medium mt-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Otomatis via Penjadwal LMS
          </div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[13px] font-semibold whitespace-nowrap shadow-sm">
            Semua Materi
            <span className="bg-blue-600/30 text-blue-200 px-1.5 py-0.5 rounded text-[11px]">12</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Dipublikasikan
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">8</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Terjadwal
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">2</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 text-[13px] font-medium whitespace-nowrap transition-colors">
            Draft Guru
            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[11px]">2</span>
          </button>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text" 
              className="w-full md:w-[250px] lg:w-[300px] h-10 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
              placeholder="Cari topik, judul materi..." 
            />
          </div>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60">
            <button className="p-1.5 rounded-md bg-white text-blue-900 shadow-sm border border-slate-200/40" title="Tampilan Hirarki BAB">
              <ListTree size={18} />
            </button>
            <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-700" title="Tampilan Matriks Timeline">
              <CalendarRange size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. HIERARCHICAL CURRICULUM CONTAINER */}
      <div className="flex flex-col gap-6">
        {/* BAB 1 */}
        <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-blue-50/50 p-4 lg:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-display text-[18px] font-bold shrink-0">
                1
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="font-display text-[16px] font-bold text-slate-900">BAB 1: Dasar Pengembangan Web Modern</h2>
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    Selesai
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">Capaian Pembelajaran (CP): Memahami Arsitektur Client-Server, Web Standards & Responsive Design</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-14 md:pl-0 shrink-0">
              <button className="flex items-center gap-1.5 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                <Download size={14} />
                Unduh Rekap
              </button>
              <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col divide-y divide-slate-100">
            {/* Item 1.1 */}
            <article className="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-1">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Dokumen PDF</span>
                    <h3 className="font-display text-[15px] font-semibold text-slate-900">01. Pengenalan HTTP, Web Protocol & Server Architecture</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      Dirilis: 15 Juli 2026
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <Eye size={14} />
                      32/32 Siswa (100% Akses)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Ukuran: 4.2 MB (24 Halaman)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-14 lg:pl-0 shrink-0">
                <span className="hidden sm:inline-block bg-green-50 border border-green-100 text-green-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                  Dipublikasikan
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Eye size={14} /> Lihat
                  </button>
                  <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 border border-transparent">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Item 1.2 */}
            <article className="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                  <Code size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Teks & Kode</span>
                    <h3 className="font-display text-[15px] font-semibold text-slate-900">02. Semantic HTML5 & Standar Aksesibilitas Web (WCAG 2.1)</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      Dirilis: 22 Juli 2026
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <Eye size={14} />
                      32/32 Siswa (100% Akses)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Interaktif Snippet + Sandbox</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-14 lg:pl-0 shrink-0">
                <span className="hidden sm:inline-block bg-green-50 border border-green-100 text-green-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                  Dipublikasikan
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Eye size={14} /> Lihat
                  </button>
                  <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 border border-transparent">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* BAB 2 */}
        <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-blue-50/50 p-4 lg:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-display text-[18px] font-bold shrink-0">
                2
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="font-display text-[16px] font-bold text-slate-900">BAB 2: Pemrograman JavaScript Lanjut</h2>
                  <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border border-orange-100">
                    <Clock size={12} />
                    Sedang Berjalan
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">Capaian Pembelajaran (CP): Logika DOM, Asynchronous JavaScript, Promise, Event Driven Architecture</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-14 md:pl-0 shrink-0">
              <button className="flex items-center gap-1.5 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                <FileText size={14} />
                Hubungkan Kuis
              </button>
              <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col divide-y divide-slate-100">
            {/* Item 2.1 */}
            <article className="p-4 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-1">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Teks & Dokumen</span>
                    <h3 className="font-display text-[15px] font-semibold text-slate-900">04. JavaScript Fundamental & Modern ES6 Syntax</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      Dirilis: 12 Agustus 2026
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Eye size={14} />
                      31/32 Siswa (97% Akses)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Modul Interaktif + Lab Mandiri</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-14 lg:pl-0 shrink-0">
                <span className="hidden sm:inline-block bg-green-50 border border-green-100 text-green-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                  Dipublikasikan
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Eye size={14} /> Lihat
                  </button>
                  <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 border border-transparent">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
