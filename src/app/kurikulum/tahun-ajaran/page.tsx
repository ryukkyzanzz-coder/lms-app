'use client';

import React from 'react';
import { 
  History
} from 'lucide-react';

export default function TahunAjaranPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Tahun Ajaran & Semester</h1>
          <p className="font-body text-[13px] text-slate-500 font-medium mt-1">Pantau periode aktif kegiatan akademik sekolah.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Current Active */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white border-2 border-blue-600 rounded-xl p-5 shadow-md flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
            <div className="flex items-center gap-2 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Periode Aktif Saat Ini
            </div>
            
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-3xl font-bold text-slate-900">2026/2027</h2>
              <span className="text-[14px] font-semibold text-slate-600">Semester Ganjil</span>
            </div>

            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Mulai</span>
                <span className="font-medium text-slate-800">14 Juli 2026</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Berakhir (Estimasi)</span>
                <span className="font-medium text-slate-800">18 Desember 2026</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Kurikulum Default</span>
                <span className="font-medium text-slate-800">Kurikulum Merdeka</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-[13px]">
            <History size={20} className="shrink-0 mt-0.5 text-blue-600" />
            <p className="leading-relaxed">
              Mengubah periode aktif akan berdampak pada seluruh akses data Guru dan Siswa. Lakukan perubahan hanya saat pergantian semester resmi.
            </p>
          </div>
        </div>

        {/* Right Col: History Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="font-display text-[15px] font-semibold text-slate-900">Riwayat Tahun Ajaran</h2>
          
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Tahun Ajaran</th>
                    <th className="px-5 py-3">Semester</th>
                    <th className="px-5 py-3">Kurikulum</th>
                    <th className="px-5 py-3 text-center">Status</th>
                    <th className="px-5 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
                  
                  <tr className="hover:bg-slate-50/50 transition-colors bg-blue-50/20">
                    <td className="px-5 py-4 font-bold text-slate-900">2026/2027</td>
                    <td className="px-5 py-4 font-medium text-slate-700">Ganjil</td>
                    <td className="px-5 py-4 text-slate-600">Kurikulum Merdeka</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold">
                        Aktif
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-700">2025/2026</td>
                    <td className="px-5 py-4 font-medium text-slate-600">Genap</td>
                    <td className="px-5 py-4 text-slate-600">Kurikulum Merdeka</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[11px] font-bold">
                        Selesai
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-700">2025/2026</td>
                    <td className="px-5 py-4 font-medium text-slate-600">Ganjil</td>
                    <td className="px-5 py-4 text-slate-600">Kurikulum Merdeka</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[11px] font-bold">
                        Selesai
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
