'use client';

import React from 'react';
import { 
  ArrowLeft,
  Book,
  FolderTree,
  ListChecks,
  Target,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function DetailMataPelajaranPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4">
        <Link href="/kurikulum/struktur" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-900 w-fit transition-colors">
          <ArrowLeft size={14} />
          <span>Kembali ke Struktur Kurikulum</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Book size={28} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">MP-RPL-1201</span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Kelas XII RPL</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Pemrograman Web</h1>
              <p className="font-body text-[13px] text-slate-500 font-medium mt-1">
                Mata pelajaran konsentrasi keahlian RPL mencakup arsitektur web modern, API, dan autentikasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Bab</span>
          <div className="flex items-center gap-2">
            <FolderTree size={16} className="text-slate-400" />
            <span className="text-lg font-display font-bold text-slate-900">12</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Topik</span>
          <div className="flex items-center gap-2">
            <ListChecks size={16} className="text-slate-400" />
            <span className="text-lg font-display font-bold text-slate-900">48</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Capaian Pembelajaran</span>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-slate-400" />
            <span className="text-lg font-display font-bold text-slate-900">6</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guru Pengampu</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-[9px] font-bold">HS</div>
            <span className="text-[13px] font-semibold text-slate-700 truncate">Drs. Hendra Setiawan</span>
          </div>
        </div>
      </div>

      {/* Hierarchical Structure */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="font-display text-[15px] font-semibold text-slate-900">Struktur Silabus (Bab & Topik)</h2>
        
        <div className="flex flex-col gap-3">
          
          {/* Bab 1 */}
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <button className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors">
                  <ChevronDown size={18} />
                </button>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bab 01</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">2 Topik</span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-slate-900 mt-0.5">Konsep Dasar REST API</h3>
                </div>
              </div>
            </div>
            
            {/* Topik List */}
            <div className="flex flex-col p-4 pl-12 gap-3 bg-white">
              
              {/* Topik Item 1 */}
              <div className="flex items-start gap-4 p-3 border border-slate-200/60 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                <div className="mt-0.5 w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ListChecks size={12} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-slate-800">Arsitektur Client-Server & Protokol HTTP</h4>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">
                    Memahami peran client (browser/mobile) dan server dalam arsitektur web modern, serta method standar HTTP (GET, POST, PUT, DELETE).
                  </p>
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Target size={12} className="text-emerald-500"/>
                      <span className="font-medium">Terkait dengan CP-01</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">1</span> Materi Dibuat Guru
                    </div>
                  </div>
                </div>
              </div>

              {/* Topik Item 2 */}
              <div className="flex items-start gap-4 p-3 border border-slate-200/60 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                <div className="mt-0.5 w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ListChecks size={12} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-slate-800">Format Data JSON</h4>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">
                    Struktur, sintaksis, dan cara mem-parsing data JSON antara client dan backend.
                  </p>
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Target size={12} className="text-emerald-500"/>
                      <span className="font-medium">Terkait dengan CP-01</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">2</span> Materi Dibuat Guru
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bab 2 */}
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <button className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors -rotate-90">
                  <ChevronDown size={18} />
                </button>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bab 02</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">3 Topik</span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-slate-900 mt-0.5">Autentikasi & Otorisasi Web</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
