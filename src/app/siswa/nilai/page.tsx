'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  TrendingUp,
  BookOpen,
  Award,
  AlertCircle,
  FileText,
  PieChart,
  Target,
  Download,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Clock
} from 'lucide-react';
import Image from 'next/image';

export default function SiswaNilaiPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. Academic Context Banner */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-slate-500 font-body text-xs">
            <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <Home size={14} />
              Portal Siswa
            </Link>
            <span>/</span>
            <span className="font-semibold text-blue-700">Progres Belajar & Nilai</span>
          </nav>
          
          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display text-2xl lg:text-3xl text-slate-900 font-bold tracking-tight">
              Progres Belajar Pribadi
            </h1>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-body text-[10px] font-bold uppercase tracking-wider">
              Semester Ganjil 2026
            </span>
          </div>
          
          <p className="font-body text-sm text-slate-500 max-w-3xl mt-1">
            Pantau perkembangan belajar Anda, ketuntasan modul ajar, rekap nilai ujian, dan kepatuhan penyelesaian tugas.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-body text-sm font-bold transition-colors shadow-sm">
            <Download size={18} />
            Unduh Transkrip (PDF)
          </button>
        </div>
      </div>

      {/* 2. Ringkasan Metrik Pribadi (4-Card Metric Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Capaian Akademik</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-slate-900">86.4</span>
                <span className="inline-flex items-center gap-1 text-green-600 font-body text-xs font-bold">
                  <TrendingUp size={14} /> +2.4
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="font-body text-xs text-slate-500 flex items-center justify-between">
              Status Keseluruhan: <strong className="text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100">Tuntas (Predikat A-)</strong>
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Penyelesaian Modul</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-slate-900">75%</span>
                <span className="text-slate-400 font-body text-sm font-medium">32/42</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="font-body text-[10px] text-slate-400">10 modul tersisa semester ini</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Kehadiran (Absensi)</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-slate-900">98%</span>
                <span className="text-slate-400 font-body text-sm font-medium">Hadir</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full rounded-full" style={{ width: '98%' }}></div>
            </div>
            <span className="font-body text-[10px] text-slate-400">49 dari 50 sesi tatap muka</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Tugas Belum Selesai</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-red-600">3</span>
                <span className="text-slate-400 font-body text-sm font-medium">Tugas</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="font-body text-xs font-bold text-red-600 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Butuh Perhatian Segera
            </span>
          </div>
        </div>

      </div>

      {/* 3. Action Required List */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="font-display text-lg text-slate-900 font-bold">Perhatian & Tindak Lanjut Akademik</h2>
              <p className="font-body text-xs text-slate-500 mt-0.5">3 Agenda Memerlukan Aksi Anda</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col divide-y divide-slate-100">
          
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer">
                    Tugas Praktikum 03: Implementasi Autentikasi JWT & Middleware
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-body text-[10px] font-bold">Tersisa 4 Hari</span>
                </div>
                <p className="font-body text-xs text-slate-500">Pemrograman Web & Perangkat Bergerak • Guru Pengampu: Budi Pratama, S.Kom.</p>
                <div className="flex items-center gap-4 mt-1 font-body text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> Batas: 30 September 2026, 23:59 WIB</span>
                  <span className="flex items-center gap-1"><Target size={14} /> Bobot Formatif: 15%</span>
                </div>
              </div>
            </div>
            <Link href="/siswa/tugas/tugas-03" className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors font-body text-xs font-bold shadow-sm shrink-0">
              Kerjakan
              <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <PieChart size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer">
                    Kuis Formatif 02: Pemahaman Asinkronus (Promise & Async/Await)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-body text-[10px] font-bold">1 Kesempatan</span>
                </div>
                <p className="font-body text-xs text-slate-500">Pemrograman Web & Perangkat Bergerak • 15 Soal Pilihan Ganda Teknis</p>
                <div className="flex items-center gap-4 mt-1 font-body text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> Durasi: 25 Menit</span>
                  <span className="flex items-center gap-1"><Target size={14} /> Batas Akhir: 01 Oktober 2026</span>
                </div>
              </div>
            </div>
            <Link href="/siswa/tugas/quiz-02" className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors font-body text-xs font-bold shadow-sm shrink-0">
              Mulai Kuis
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>
      </div>

      {/* 4. Subject Progress Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl text-slate-900 font-bold">Evaluasi Pembelajaran per Mata Pelajaran</h2>
            <p className="font-body text-sm text-slate-500">Rincian nilai dan penyelesaian tugas untuk semua mata pelajaran semester ini.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Subject 1 */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Konsentrasi Keahlian</span>
                  <h3 className="font-display text-lg text-slate-900 font-bold leading-tight hover:text-blue-700 cursor-pointer transition-colors">
                    Pemrograman Web & Perangkat Bergerak
                  </h3>
                  <p className="font-body text-xs text-slate-500 mt-1">Budi Pratama, S.Kom. • 4 JP/Pekan</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-display text-2xl font-bold text-blue-700">88.0</span>
                  <span className="font-body text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider">Tuntas KKTP</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-3 my-4">
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Modul</span>
                  <span className="font-display text-lg font-bold text-slate-900">8/12</span>
                  <span className="font-body text-[10px] text-slate-400">67% Silabus</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Praktikum</span>
                  <span className="font-display text-lg font-bold text-slate-900">2/3</span>
                  <span className="font-body text-[10px] text-red-500 font-bold">1 Berjalan</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ujian/Quiz</span>
                  <span className="font-display text-lg font-bold text-slate-900">2</span>
                  <span className="font-body text-[10px] text-slate-400">Rerata 88.0</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center font-body text-xs text-slate-500 mb-1.5">
                  <span>Progres Capaian Pembelajaran</span>
                  <span className="font-bold text-slate-700">67%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
              <Lightbulb size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-body text-xs font-bold text-slate-800">Catatan & Arahan:</span>
                <p className="font-body text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Segera selesaikan tugas 03 JWT Authentication sebelum tenggat 30 September untuk menjaga nilai kepatuhan praktikum lab.
                </p>
              </div>
            </div>
          </div>

          {/* Subject 2 */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Konsentrasi Keahlian</span>
                  <h3 className="font-display text-lg text-slate-900 font-bold leading-tight hover:text-blue-700 cursor-pointer transition-colors">
                    Basis Data & Pemodelan Relasional
                  </h3>
                  <p className="font-body text-xs text-slate-500 mt-1">Siti Aulia, S.Kom. • 4 JP/Pekan</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-display text-2xl font-bold text-blue-700">85.0</span>
                  <span className="font-body text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider">Tuntas KKTP</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-3 my-4">
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Modul</span>
                  <span className="font-display text-lg font-bold text-slate-900">6/9</span>
                  <span className="font-body text-[10px] text-slate-400">66% Silabus</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Praktikum</span>
                  <span className="font-display text-lg font-bold text-slate-900">1</span>
                  <span className="font-body text-[10px] text-slate-400">Selesai</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ujian/Quiz</span>
                  <span className="font-display text-lg font-bold text-slate-900">1</span>
                  <span className="font-body text-[10px] text-slate-400">Nilai 85.0</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center font-body text-xs text-slate-500 mb-1.5">
                  <span>Progres Capaian Pembelajaran</span>
                  <span className="font-bold text-slate-700">66%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
              <Lightbulb size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-body text-xs font-bold text-slate-800">Catatan & Arahan:</span>
                <p className="font-body text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Tingkatkan latihan query JOIN bertingkat dan agregasi GROUP BY di Lab Komputer sebelum asesmen sumatif.
                </p>
              </div>
            </div>
          </div>

          {/* Subject 3 */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Konsentrasi Keahlian</span>
                  <h3 className="font-display text-lg text-slate-900 font-bold leading-tight hover:text-blue-700 cursor-pointer transition-colors">
                    Pemrograman Berorientasi Objek (Java)
                  </h3>
                  <p className="font-body text-xs text-slate-500 mt-1">Drs. Hendra Setiawan • 4 JP/Pekan</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-display text-2xl font-bold text-blue-700">86.5</span>
                  <span className="font-body text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider">Tuntas KKTP</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-3 my-4">
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Modul</span>
                  <span className="font-display text-lg font-bold text-slate-900">7/10</span>
                  <span className="font-body text-[10px] text-slate-400">70% Silabus</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Praktikum</span>
                  <span className="font-display text-lg font-bold text-green-600">Tuntas</span>
                  <span className="font-body text-[10px] text-slate-400">3/3 Tugas</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ujian/Quiz</span>
                  <span className="font-display text-lg font-bold text-slate-900">2</span>
                  <span className="font-body text-[10px] text-slate-400">Rerata 86.5</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center font-body text-xs text-slate-500 mb-1.5">
                  <span>Progres Capaian Pembelajaran</span>
                  <span className="font-bold text-slate-700">70%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
              <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-body text-xs font-bold text-slate-800">Status Capaian:</span>
                <p className="font-body text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Seluruh penugasan modul Enkapsulasi, Inheritance, dan Polimorfisme telah dinilai lengkap dan memenuhi indikator.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
