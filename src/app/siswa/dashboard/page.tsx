'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  BookOpen,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  PieChart,
  Target,
  Award,
  ChevronRight,
  TrendingUp,
  Bell,
  CheckCircle2,
  List
} from 'lucide-react';
import Image from 'next/image';

export default function SiswaDashboardPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <div className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="font-display text-2xl lg:text-3xl text-slate-900 font-bold tracking-tight">Selamat datang kembali, Rakha</h1>
            <span className="bg-blue-50 px-2 py-0.5 rounded font-body text-[10px] text-blue-700 font-bold uppercase tracking-wider border border-blue-100">NISN 2204128</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-body text-sm flex-wrap">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Calendar size={16} className="text-blue-700" />
              Sabtu, 26 September 2026
            </span>
            <span className="text-slate-300">•</span>
            <span>Semester Ganjil TA 2026/2027</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-blue-700">Minggu Efektif Ke-11</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Award size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] text-slate-500 uppercase tracking-wider font-bold">Rerata Nilai</span>
              <span className="font-display text-lg font-bold text-slate-900">86.4 <span className="text-green-600 font-body text-xs ml-1">(A-)</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kiri: Jadwal & Tugas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Jadwal Hari Ini */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-700" size={20} />
                <h2 className="font-display text-lg text-slate-900 font-bold">Jadwal Hari Ini</h2>
              </div>
              <Link href="/siswa/jadwal" className="font-body text-xs text-blue-700 font-bold hover:underline">
                Lihat Semua Jadwal
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item 1: Selesai */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Selesai
                  </span>
                  <span className="font-body text-xs text-slate-500 font-medium">07.00 – 08.30 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-lg text-slate-900 font-bold">Matematika Terapan</h3>
                  <p className="font-body text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <BookOpen size={14} className="text-slate-400" />
                    Ruang Kelas XII RPL 1 • Drs. Haryono
                  </p>
                </div>
              </div>

              {/* Item 2: Sedang Berlangsung */}
              <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm shadow-blue-100 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Sedang Berlangsung
                  </span>
                  <span className="font-body text-xs text-blue-700 font-bold">08.45 – 10.15 WIB</span>
                </div>
                <div>
                  <h3 className="font-display text-lg text-slate-900 font-bold">Pemrograman Web</h3>
                  <p className="font-body text-xs text-slate-600 flex items-center gap-1 mt-1">
                    <MonitorPlay size={14} className="text-blue-500" />
                    Lab Komputer 2 • Budi Pratama, S.Kom.
                  </p>
                </div>
                <div className="mt-4 p-2 bg-blue-50 rounded-lg flex items-center gap-2 border border-blue-100">
                  <BookOpen size={14} className="text-blue-600 shrink-0" />
                  <span className="font-body text-xs text-blue-800 font-medium truncate">Topik: JWT & Security Middleware</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tugas yang Harus Diselesaikan */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="text-red-600" size={20} />
                <h2 className="font-display text-lg text-slate-900 font-bold">Tugas & Tenggat Waktu Terdekat</h2>
              </div>
              <span className="font-body text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold border border-red-100">
                2 Belum Selesai
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link href="/siswa/tugas/tugas-03" className="group">
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm hover:border-blue-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-body text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        Tugas 03: Autentikasi JWT & Middleware
                      </h3>
                      <p className="font-body text-xs text-slate-500 mt-0.5">Pemrograman Web & Perangkat Bergerak</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 font-body text-[10px] font-bold">Sisa 4 Hari</span>
                        <span className="font-body text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={12} /> Batas: 30 Sep, 23:59
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>

              <Link href="/siswa/tugas/quiz-02" className="group">
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm hover:border-blue-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <PieChart size={20} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-body text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        Kuis Formatif: Pemahaman Asinkronus JS
                      </h3>
                      <p className="font-body text-xs text-slate-500 mt-0.5">Pemrograman Web & Perangkat Bergerak</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold">Belum Dikerjakan</span>
                        <span className="font-body text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={12} /> Batas: 1 Okt, 15:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            </div>
            <Link href="/siswa/tugas" className="w-full py-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-body text-xs font-bold text-center transition-colors">
              Lihat Semua Tugas
            </Link>
          </div>
          
        </div>

        {/* Kanan: Pengumuman & Progres (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Progres Modul */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-700" />
                <h2 className="font-display text-base font-bold text-slate-900">Progres Belajar</h2>
              </div>
              <Link href="/siswa/nilai" className="text-blue-600 hover:text-blue-800 transition-colors">
                <ChevronRight size={18} />
              </Link>
            </div>
            <div className="pt-4 flex flex-col gap-4">
              <div>
                <div className="flex justify-between font-body text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-slate-800">Pemrograman Web</span>
                  <span>8 / 12 Modul</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between font-body text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-slate-800">Basis Data</span>
                  <span>6 / 9 Modul</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between font-body text-xs text-slate-500 mb-1.5">
                  <span className="font-bold text-slate-800">PBO (Java)</span>
                  <span>7 / 10 Modul</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pengumuman Terkini */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-orange-500" />
                <h2 className="font-display text-base font-bold text-slate-900">Pengumuman</h2>
              </div>
              <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700">1 Baru</span>
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/siswa/pengumuman/peng-1" className="group block">
                <div className="flex flex-col gap-1 hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Perubahan Jadwal Praktikum Lab</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  </div>
                  <span className="font-body text-[10px] text-slate-500">Budi Pratama, S.Kom. • Kemarin, 14:30</span>
                  <p className="font-body text-xs text-slate-600 line-clamp-2 mt-1">
                    Diinformasikan kepada seluruh siswa XII RPL 1, jadwal praktikum Web dipindah ke Lab 2 karena...
                  </p>
                </div>
              </Link>
              
              <hr className="border-slate-100" />
              
              <Link href="/siswa/pengumuman/peng-2" className="group block">
                <div className="flex flex-col gap-1 hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Pembayaran SPP Bulan September</span>
                  </div>
                  <span className="font-body text-[10px] text-slate-500">Tata Usaha • 23 Sep 2026</span>
                </div>
              </Link>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
// added MonitorPlay to avoid undefined component error
const MonitorPlay = ({size, className}: {size?: number, className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
    <polygon points="10 8 15 10 10 12 10 8"></polygon>
  </svg>
)
