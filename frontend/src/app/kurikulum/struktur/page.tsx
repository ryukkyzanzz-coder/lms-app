'use client';

import React from 'react';
import { 
  Search, 
  ChevronRight,
  FolderTree,
  ListChecks,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function StrukturKurikulumPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Struktur Kurikulum</h1>
          <p className="font-body text-[13px] text-slate-500 font-medium mt-1">Pantau hierarki akademik Mata Pelajaran, Bab, dan Topik</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari mata pelajaran, kode, atau jurusan..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="h-10 px-3 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-sm flex-1 sm:w-40">
            <option value="">Semua Tingkat</option>
            <option value="X">Kelas X</option>
            <option value="XI">Kelas XI</option>
            <option value="XII">Kelas XII</option>
          </select>
          <select className="h-10 px-3 bg-white border border-slate-200/60 rounded-lg text-[13px] text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-sm flex-1 sm:w-48">
            <option value="">Semua Jurusan</option>
            <option value="RPL">Rekayasa Perangkat Lunak</option>
            <option value="TKJ">Teknik Komputer Jaringan</option>
            <option value="MM">Multimedia</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-4 w-12 text-center">No</th>
                <th className="px-5 py-4">Mata Pelajaran & Kode</th>
                <th className="px-5 py-4">Tingkat & Jurusan</th>
                <th className="px-5 py-4 text-center">Struktur</th>
                <th className="px-5 py-4">Guru Pengampu</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-5 py-4 text-center font-medium text-slate-400">1</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-semibold text-slate-900">Pemrograman Web</span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded w-fit">MP-RPL-1201</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">XII</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">RPL</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center" title="Bab">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold"><FolderTree size={14} className="text-slate-400"/> 12</div>
                    </div>
                    <div className="flex flex-col items-center" title="Topik">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold"><ListChecks size={14} className="text-slate-400"/> 48</div>
                    </div>
                    <div className="flex flex-col items-center" title="CP">
                      <div className="flex items-center gap-1 text-green-600 font-semibold"><Target size={14} className="text-green-500"/> 6</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">HS</div>
                    <span className="font-medium text-slate-700">Drs. Hendra Setiawan</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href="/kurikulum/mata-pelajaran/1" className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span>Lihat Detail</span>
                    <ChevronRight size={14} />
                  </Link>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-5 py-4 text-center font-medium text-slate-400">2</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-semibold text-slate-900">Basis Data</span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded w-fit">MP-RPL-1102</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">XI</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">RPL</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center" title="Bab">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold"><FolderTree size={14} className="text-slate-400"/> 10</div>
                    </div>
                    <div className="flex flex-col items-center" title="Topik">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold"><ListChecks size={14} className="text-slate-400"/> 35</div>
                    </div>
                    <div className="flex flex-col items-center" title="CP">
                      <div className="flex items-center gap-1 text-green-600 font-semibold"><Target size={14} className="text-green-500"/> 4</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">HS</div>
                    <span className="font-medium text-slate-700">Drs. Hendra Setiawan</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href="/kurikulum/mata-pelajaran/2" className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span>Lihat Detail</span>
                    <ChevronRight size={14} />
                  </Link>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="px-5 py-3 border-t border-slate-200/60 bg-slate-50 flex items-center justify-between text-[12px] text-slate-500">
          <span>Menampilkan 1-10 dari 24 mata pelajaran</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">Sebelummya</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-blue-50 text-blue-700 font-medium">1</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-600">2</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-600">3</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-600">Selanjutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}
