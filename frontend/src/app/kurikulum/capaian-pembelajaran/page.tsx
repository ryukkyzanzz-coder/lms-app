'use client';

import React from 'react';
import { 
  Target,
  Search,
  Book,
  Link as LinkIcon
} from 'lucide-react';

export default function CapaianPembelajaranPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Capaian Pembelajaran (CP)</h1>
          <p className="font-body text-[13px] text-slate-500 font-medium mt-1">Pantau target kompetensi yang harus dicapai siswa pada setiap fase.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari deskripsi CP, kode, atau mapel..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="h-10 px-3 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-sm flex-1 sm:w-40">
            <option value="">Semua Fase</option>
            <option value="E">Fase E (Kelas X)</option>
            <option value="F">Fase F (Kelas XI-XII)</option>
          </select>
          <select className="h-10 px-3 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-sm flex-1 sm:w-48">
            <option value="">Semua Mapel</option>
            <option value="1">Pemrograman Web</option>
            <option value="2">Basis Data</option>
          </select>
        </div>
      </div>

      {/* CP Cards */}
      <div className="flex flex-col gap-4">
        
        {/* CP Item 1 */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-5 flex flex-col gap-4 hover:border-blue-300 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Target size={20} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">CP-RPL-F-01</span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Fase F</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                  Siswa mampu menerapkan mekanisme autentikasi berbasis token (JWT) dan otorisasi role-based pada aplikasi web server-side.
                </h3>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 pl-14">
            <div className="text-[12px] font-semibold text-slate-700 flex items-center gap-1.5">
              <LinkIcon size={14} className="text-slate-400" />
              Pemetaan Akademik:
            </div>
            
            <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-3 text-[13px] text-slate-600 flex items-start gap-3">
              <Book size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-slate-800">Pemrograman Web</span>
                  <span className="text-slate-300">•</span>
                  <span>Bab 02: Autentikasi & Otorisasi Web</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-medium text-slate-600 shadow-sm">Topik: JWT Token</span>
                  <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-medium text-slate-600 shadow-sm">Topik: Role-Based Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CP Item 2 */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-5 flex flex-col gap-4 hover:border-blue-300 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Target size={20} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">CP-RPL-F-02</span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Fase F</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                  Siswa mampu merancang dan mengimplementasikan arsitektur RESTful API yang memenuhi standar keamanan dan validasi data.
                </h3>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 pl-14">
            <div className="text-[12px] font-semibold text-slate-700 flex items-center gap-1.5">
              <LinkIcon size={14} className="text-slate-400" />
              Pemetaan Akademik:
            </div>
            
            <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-3 text-[13px] text-slate-600 flex items-start gap-3">
              <Book size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-slate-800">Pemrograman Web</span>
                  <span className="text-slate-300">•</span>
                  <span>Bab 01: Konsep Dasar REST API</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-medium text-slate-600 shadow-sm">Topik: Arsitektur Client-Server & Protokol HTTP</span>
                  <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-medium text-slate-600 shadow-sm">Topik: Method Standar HTTP</span>
                  <span className="bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-medium text-slate-600 shadow-sm">Topik: Validasi Request Body</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-200/60 text-[13px] text-slate-500">
        <span>Menampilkan 1-2 dari 62 Capaian Pembelajaran</span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">Sebelummya</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 font-medium">Selanjutnya</button>
        </div>
      </div>

    </div>
  );
}
