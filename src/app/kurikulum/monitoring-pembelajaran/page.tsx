'use client';

import React from 'react';
import { 
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function MonitoringPembelajaranPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Monitoring Pembelajaran & Evaluasi CP</h1>
          <p className="font-body text-[13px] text-slate-500 font-medium mt-1">Evaluasi Capaian Pembelajaran vs KBM vs Serapan Nilai Siswa.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari Capaian Pembelajaran atau Mata Pelajaran..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Kesesuaian Matriks */}
      <div className="flex flex-col gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-4 w-12 text-center">No</th>
                  <th className="px-5 py-4 w-[300px]">Capaian Pembelajaran (Target)</th>
                  <th className="px-5 py-4">Mata Pelajaran (Mapping)</th>
                  <th className="px-5 py-4 text-center">Implementasi Materi</th>
                  <th className="px-5 py-4 text-center">Instrumen Penilaian</th>
                  <th className="px-5 py-4 text-center">Serapan KKM</th>
                  <th className="px-5 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
                
                <tr className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-4 text-center font-medium text-slate-400">1</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase w-fit">CP-RPL-F-01</span>
                      <p className="font-medium text-slate-800 line-clamp-2">Siswa mampu menerapkan mekanisme autentikasi berbasis token (JWT)...</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-900">Pemrograman Web</span>
                      <span className="text-[11px] text-slate-500">Bab 02 (2 Topik)</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-blue-600">2 Materi</span>
                      <span className="text-[10px] text-slate-500">100% dari target</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-orange-600">1 Tugas</span>
                      <span className="text-[10px] text-slate-500">Kurang 1 Quiz</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-green-700">82%</span>
                      <span className="text-[10px] text-slate-500">Diatas KKM (75)</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded text-[11px] font-bold">
                      <CheckCircle size={12}/> Memenuhi
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-4 text-center font-medium text-slate-400">2</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase w-fit">CP-RPL-F-02</span>
                      <p className="font-medium text-slate-800 line-clamp-2">Siswa mampu merancang dan mengimplementasikan arsitektur RESTful API...</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-900">Pemrograman Web</span>
                      <span className="text-[11px] text-slate-500">Bab 01 (3 Topik)</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-orange-600">1 Materi</span>
                      <span className="text-[10px] text-slate-500">33% dari target</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-red-600">0 Instrumen</span>
                      <span className="text-[10px] text-slate-500">Belum Ada Penilaian</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-slate-400">-</span>
                      <span className="text-[10px] text-slate-500">Belum ada nilai</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-100 px-2 py-1 rounded text-[11px] font-bold">
                      <AlertCircle size={12}/> Gap Implementasi
                    </span>
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
