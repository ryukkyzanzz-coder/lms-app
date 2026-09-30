'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Timer,
  BookOpen,
  HelpCircle,
  Upload,
  Link as LinkIcon,
  ChevronRight,
  Shield,
  MonitorPlay
} from 'lucide-react';

export default function SiswaDetailTugasPage({ params }: { params: { taskId: string } }) {
  const isQuiz = params.taskId.includes('quiz');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. Header & Meta Data */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 lg:p-6 mb-2 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 font-body text-xs text-slate-500">
            <Link href="/siswa/dashboard" className="hover:text-blue-700 transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/siswa/tugas" className="hover:text-blue-700 transition-colors">Tugas & Penilaian</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
              {isQuiz ? 'Detail Quiz' : 'Detail Tugas'}
            </span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-body text-[10px] font-bold border border-blue-100 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Formatif Mandiri • Bobot 10%
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 font-body text-[10px] font-bold uppercase">
              {isQuiz ? 'CBT-EXAM-V2.4' : 'Unggah Berkas'}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="font-display text-2xl lg:text-3xl text-blue-900 font-bold tracking-tight">
              {isQuiz ? 'Pemahaman Asinkron: Promise & Async/Await' : 'Implementasi Autentikasi JWT & Middleware Express.js'}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-slate-600">
              <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                <BookOpen size={16} className="text-blue-700" />
                Pemrograman Web & Perangkat Bergerak (XII RPL 1)
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1">
                <HelpCircle size={16} className="text-slate-500" />
                Budi Pratama, S.Kom.
              </span>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3 self-start lg:self-auto shrink-0">
            <div className="w-10 h-10 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Timer size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[11px] font-bold text-red-700 uppercase tracking-wider">Tersisa 4 Hari 6 Jam</span>
              <span className="font-body text-xs font-semibold text-red-900">Batas: 1 Okt 2026, 15:00 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider">Durasi</span>
            <Timer size={16} className="text-blue-700" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-slate-900">{isQuiz ? '25' : '1'}</span>
            <span className="font-body text-sm text-slate-500">{isQuiz ? 'Menit' : 'Minggu'}</span>
          </div>
          <span className="font-body text-[10px] text-slate-400 mt-1">{isQuiz ? 'Hitung mundur otomatis' : 'Waktu pengerjaan'}</span>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider">{isQuiz ? 'Butir Soal' : 'Tipe Penyerahan'}</span>
            <FileText size={16} className="text-orange-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-slate-900">{isQuiz ? '15' : 'File'}</span>
            <span className="font-body text-sm text-slate-500">{isQuiz ? 'Soal' : 'ZIP/PDF'}</span>
          </div>
          <span className="font-body text-[10px] text-slate-400 mt-1">{isQuiz ? 'PG Kompleks & Analisis' : 'Maksimal 10 MB'}</span>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider">Percobaan</span>
            <MonitorPlay size={16} className="text-purple-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-slate-900">{isQuiz ? '1' : '3'}</span>
            <span className="font-body text-sm text-slate-500">{isQuiz ? 'Kali Sah' : 'Revisi'}</span>
          </div>
          <span className="font-body text-[10px] text-red-500 font-bold mt-1">Tidak ada remedial instan</span>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider">KKTP Target</span>
            <CheckCircle2 size={16} className="text-green-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-slate-900">75.0</span>
            <span className="font-body text-sm text-slate-500">/ 100</span>
          </div>
          <span className="font-body text-[10px] text-green-700 font-bold mt-1">Standar Kompetensi RPL</span>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider">Koreksi</span>
            <Shield size={16} className="text-blue-700" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-bold text-slate-900">{isQuiz ? 'CBT Auto' : 'Manual'}</span>
          </div>
          <span className="font-body text-[10px] text-slate-400 mt-1">{isQuiz ? 'Kunci enkripsi SHA-256' : 'Oleh Guru Pengampu'}</span>
        </div>
      </div>

      {/* 3. Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col (Main content) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h2 className="font-display text-lg text-slate-900 font-bold">Silabus & Ruang Lingkup Materi</h2>
              </div>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {isQuiz ? 'MODUL-06.JS' : 'MODUL-09.JWT'}
              </span>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white text-blue-700 border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm">
                  {isQuiz ? 'JS' : 'JS'}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-slate-900">
                    {isQuiz ? 'BAB 02: JavaScript Lanjutan' : 'BAB 03: RESTful API Backend'}
                  </span>
                  <span className="font-body text-xs text-slate-600 mt-0.5">
                    {isQuiz ? 'Topik: Asynchronous Execution, Promises, dan Modern Web API' : 'Topik: JSON Web Token & Security Middleware'}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-4">
              {isQuiz ? 'Kisi-Kisi Distribusi Indikator Soal' : 'Instruksi Pengerjaan Tugas Praktikum'}
            </h3>
            
            {isQuiz ? (
              <div className="flex flex-col gap-3">
                <div className="bg-white border border-slate-200/60 rounded-lg p-4 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <h4 className="font-body text-sm font-bold text-slate-800">Konsep Sinkron vs Asinkron (20%)</h4>
                    <p className="font-body text-xs text-slate-500 mt-1">Mengidentifikasi perbedaan blocking dan non-blocking code pada Event Loop V8 Engine.</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-lg p-4 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <h4 className="font-body text-sm font-bold text-slate-800">Promise API & Chaining (40%)</h4>
                    <p className="font-body text-xs text-slate-500 mt-1">Menyelesaikan masalah callback hell dan memprediksi output dari serangkaian .then() dan .catch().</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-lg p-4 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <h4 className="font-body text-sm font-bold text-slate-800">Async/Await & Error Handling (40%)</h4>
                    <p className="font-body text-xs text-slate-500 mt-1">Mengubah kode Promise lama menjadi sintaks async/await dan membungkusnya dalam try...catch block.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-600 leading-relaxed font-body">
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Buat sebuah proyek Express.js baru atau gunakan repositori starter yang telah disediakan.</li>
                  <li>Implementasikan rute <code>POST /api/auth/login</code> yang memvalidasi kredensial statis dan mengembalikan token JWT.</li>
                  <li>Buat middleware <code>authenticateToken</code> di folder terpisah.</li>
                  <li>Lindungi rute <code>GET /api/users/profile</code> menggunakan middleware tersebut.</li>
                  <li>Kumpulkan kode sumber dalam bentuk <code>.zip</code> (tanpa folder node_modules) atau berikan link ke repository GitHub.</li>
                </ol>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Col (Submission/Action) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200/80 overflow-hidden sticky top-20">
            <div className="px-6 py-5 bg-blue-900 text-white flex flex-col gap-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              <span className="font-body text-[10px] font-bold text-blue-200 uppercase tracking-wider relative z-10">Status Pengerjaan</span>
              <span className="font-display text-xl font-bold relative z-10">Belum Diserahkan</span>
            </div>
            
            <div className="p-6 flex flex-col gap-5 bg-white">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Nilai Saat Ini</span>
                  <span className="font-bold text-slate-900">- / 100</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Percobaan ke</span>
                  <span className="font-bold text-slate-900">1 dari {isQuiz ? '1' : '3'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Tenggat Waktu</span>
                  <span className="font-bold text-red-600">1 Okt 2026, 15:00</span>
                </div>
              </div>
              
              <hr className="border-slate-100" />
              
              {isQuiz ? (
                <>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2 text-xs text-red-800">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Sistem CBT akan mengunci browser Anda saat ujian dimulai. Pastikan koneksi internet stabil dan baterai perangkat cukup.</p>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-body text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(29,78,216,0.39)]">
                    Mulai Ujian Sekarang
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    <button className="w-full py-2.5 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-body text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 h-32">
                      <Upload size={24} className="mb-1 text-slate-400" />
                      <span>Unggah File Tugas (.zip / .pdf)</span>
                      <span className="text-xs text-slate-400 font-normal">Maksimal 10 MB</span>
                    </button>
                    <div className="flex items-center gap-2 my-1">
                      <div className="h-px bg-slate-200 flex-1"></div>
                      <span className="text-xs text-slate-400 font-medium">ATAU</span>
                      <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="url" 
                        placeholder="Tempel tautan (GitHub, Drive, dll)" 
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-slate-300 font-body text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-body text-sm font-bold transition-all mt-2">
                    Serahkan Tugas
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
