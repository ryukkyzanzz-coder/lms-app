'use client';

import React from 'react';
import { 
  CheckSquare, 
  Search, 
  BarChart3,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function MonitoringMateriPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Monitoring Materi</h1>
          <p className="font-body text-[13px] text-slate-500 font-medium mt-1">Pantau progres pembuatan dan publikasi materi oleh guru terhadap struktur kurikulum.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-[13px] font-semibold uppercase tracking-wider">
            <BookOpen size={16} />
            Target Materi (Sesuai Topik)
          </div>
          <span className="font-display text-3xl font-bold text-slate-900">384</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 text-[13px] font-semibold uppercase tracking-wider">
            <CheckSquare size={16} />
            Materi Dibuat Guru
          </div>
          <div className="flex items-end gap-2">
            <span className="font-display text-3xl font-bold text-blue-700">215</span>
            <span className="text-[13px] font-medium text-slate-500 mb-1">/ 384 (56%)</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-600 text-[13px] font-semibold uppercase tracking-wider">
            <BarChart3 size={16} />
            Dipublikasikan & Ada Aktivitas
          </div>
          <div className="flex items-end gap-2">
            <span className="font-display text-3xl font-bold text-green-700">180</span>
            <span className="text-[13px] font-medium text-slate-500 mb-1">/ 215 (83%)</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari mata pelajaran atau guru pengampu..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-4 w-12 text-center">No</th>
                <th className="px-5 py-4">Mata Pelajaran & Kelas</th>
                <th className="px-5 py-4">Guru Pengampu</th>
                <th className="px-5 py-4 text-center">Target (Topik)</th>
                <th className="px-5 py-4 text-center">Dibuat</th>
                <th className="px-5 py-4 text-center">Dipublikasikan</th>
                <th className="px-5 py-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
              
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-5 py-4 text-center font-medium text-slate-400">1</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-semibold text-slate-900">Pemrograman Web</span>
                    <span className="text-[11px] text-slate-500">XII RPL 1</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">HS</div>
                    <span className="font-medium text-slate-700">Drs. Hendra Setiawan</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-slate-700">48</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">32</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">28</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href="/kurikulum/monitoring-materi/1" className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                    <span>Lihat Drill-down</span>
                    <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-5 py-4 text-center font-medium text-slate-400">2</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-semibold text-slate-900">Basis Data</span>
                    <span className="text-[11px] text-slate-500">XI RPL 2</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">HS</div>
                    <span className="font-medium text-slate-700">Drs. Hendra Setiawan</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-slate-700">35</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">10</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">8</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href="/kurikulum/monitoring-materi/2" className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                    <span>Lihat Drill-down</span>
                    <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
