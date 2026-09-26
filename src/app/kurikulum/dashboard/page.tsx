'use client';

import React from 'react';
import { 
  Calendar,
  Layers,
  Book,
  Target,
  BarChart3,
  AlertTriangle,
  FolderTree,
  ListChecks,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function KurikulumDashboard() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Beranda Kurikulum</h1>
            <span className="font-body text-[13px] text-slate-500 font-medium">Manajemen Struktur & Pelaksanaan Pembelajaran</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-[13px] font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-slate-400" />
              Tahun Ajaran 2026/2027
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-bold">Semester Ganjil</span>
            <span className="text-slate-300">•</span>
            <span className="text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md font-semibold">
              Status Akademik Aktif
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-lg p-3">
            <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Layers size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kelengkapan Struktur</span>
              <span className="font-body text-sm font-medium text-slate-700 mt-0.5">
                <span className="text-green-600 font-bold">85% Tervalidasi</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTIK UTAMA KURIKULUM */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-700" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Statistik Struktur Akademik (Semester Aktif)</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Book size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-display font-bold text-slate-900 leading-none">24</span>
              <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider mt-1">Mata Pelajaran</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FolderTree size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-display font-bold text-slate-900 leading-none">128</span>
              <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider mt-1">Total Bab (Modul)</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <ListChecks size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-display font-bold text-slate-900 leading-none">384</span>
              <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider mt-1">Total Topik</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Target size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-display font-bold text-slate-900 leading-none">62</span>
              <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider mt-1">Capaian Pembelajaran</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. STATUS KELENGKAPAN MATA PELAJARAN */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange-600" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Perhatian: Struktur Belum Lengkap</h2>
          </div>
          <Link href="/kurikulum/struktur" className="text-[12px] text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Lihat Semua Struktur <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3 whitespace-nowrap">Mata Pelajaran</th>
                  <th className="px-5 py-3 whitespace-nowrap">Tingkat & Jurusan</th>
                  <th className="px-5 py-3 whitespace-nowrap">Guru Pengampu</th>
                  <th className="px-5 py-3 whitespace-nowrap">Isu Ditemukan</th>
                  <th className="px-5 py-3 whitespace-nowrap text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900">Pemrograman Perangkat Bergerak</td>
                  <td className="px-5 py-4 text-slate-600">XII RPL</td>
                  <td className="px-5 py-4 text-slate-600">Budi Santoso, S.Kom</td>
                  <td className="px-5 py-4">
                    <span className="bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded text-[11px] font-bold">Belum ada CP</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href="/kurikulum/mata-pelajaran/1" className="inline-flex items-center justify-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                      Detail Mapel
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900">Desain Grafis Percetakan</td>
                  <td className="px-5 py-4 text-slate-600">XI Multimedia</td>
                  <td className="px-5 py-4 text-slate-600">Siti Aminah, S.Sn</td>
                  <td className="px-5 py-4">
                    <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded text-[11px] font-bold">Topik Kosong di Bab 3</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href="/kurikulum/mata-pelajaran/2" className="inline-flex items-center justify-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                      Detail Mapel
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}
