'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Download, Award, BookOpen, Clock, ShieldCheck, CheckCircle2, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MASTER_GURU } from '@/lib/data/academic';

export default function DaftarGuruPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBidang, setFilterBidang] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filteredGuru = useMemo(() => {
    return MASTER_GURU.filter(item => {
      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nip.includes(searchQuery);
      const matchBidang = filterBidang === 'all' || item.bidang === filterBidang;
      const matchStatus = filterStatus === 'all' || item.status.includes(filterStatus);
                         
      return matchSearch && matchBidang && matchStatus;
    });
  }, [searchQuery, filterBidang, filterStatus]);

  const totalPages = Math.ceil(filteredGuru.length / pageSize) || 1;
  const paginatedList = filteredGuru.slice((page - 1) * pageSize, page * pageSize);

  const totalGuru = MASTER_GURU.length;
  const totalAktif = MASTER_GURU.filter(g => g.status.includes('Aktif')).length;
  const totalTersertifikasi = MASTER_GURU.filter(g => g.statusSertifikasi).length;
  const totalKejuruan = MASTER_GURU.filter(g => g.bidang.includes('Kejuruan')).length;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header & Context Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="hover:text-blue-900 transition-colors cursor-pointer">Data Akademik</span>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Guru</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Data Guru</h1>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Tenaga Pendidik
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Monitoring data tenaga pendidik, penugasan, dan jam pelajaran (JP).
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[13px] font-semibold rounded-lg transition-colors">
              <Download size={16} className="text-slate-500" />
              <span>Ekspor Data (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Guru</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalGuru}</span>
                <span className="text-sm text-slate-500 font-medium">Orang</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <Award size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Guru Aktif Mengajar</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalAktif}</span>
                <span className="text-sm text-slate-500 font-medium">Orang</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 ml-2">
              <CheckCircle2 size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Guru Kejuruan (Produktif)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalKejuruan}</span>
                <span className="text-sm text-slate-500 font-medium">Orang</span>
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <BookOpen size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Sudah Sertifikasi</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalTersertifikasi}</span>
                <span className="text-sm text-slate-500 font-medium">Orang</span>
              </div>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* Control & Filter Toolbar Card */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-4 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-900 focus:border-transparent transition-all shadow-xs" 
                placeholder="Cari nama guru atau NIP..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterBidang}
                onChange={(e) => setFilterBidang(e.target.value)}
              >
                <option value="all">Semua Bidang</option>
                <option value="Kejuruan RPL">Kejuruan RPL</option>
                <option value="Kejuruan TJKT">Kejuruan TJKT</option>
                <option value="Kejuruan DKV">Kejuruan DKV</option>
                <option value="Umum">Umum</option>
                <option value="BK">Bimbingan Konseling (BK)</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Aktif Mengajar</option>
                <option value="Cuti">Cuti / Tugas Luar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Master Table Card */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Guru & NIP</th>
                  <th className="py-3 px-4">Bidang / Mapel Utama</th>
                  <th className="py-3 px-4">Beban Mengajar</th>
                  <th className="py-3 px-4">Sertifikasi</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                      Tidak ada guru yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((guru, idx) => (
                    <tr key={guru.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-medium">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[13px] font-bold text-slate-900">{guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}</span>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{guru.nip}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-emerald-900">{guru.bidang}</span>
                          <span className="text-[11px] text-slate-500">{guru.mapelUtama}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className={guru.totalJp >= 24 ? "text-emerald-600" : "text-amber-500"} />
                          <span className={`font-semibold ${guru.totalJp >= 24 ? "text-emerald-700" : "text-amber-600"}`}>
                            {guru.totalJp} JP
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{guru.rombelDiampu.length} Rombel</div>
                      </td>
                      <td className="py-3 px-4">
                        {guru.statusSertifikasi ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700">
                            <ShieldCheck size={14} /> Tersertifikasi
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          guru.status.includes('Aktif')
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {guru.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/guru/${guru.id}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-emerald-700 rounded transition-colors text-[11px] font-bold">
                          <Eye size={14} />
                          <span>Detail</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div>
                Menampilkan <strong className="text-slate-900">{(page - 1) * pageSize + 1}</strong> - <strong className="text-slate-900">{Math.min(page * pageSize, filteredGuru.length)}</strong> dari <strong className="text-slate-900">{filteredGuru.length}</strong> guru
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} />
                  <span>Sebelumnya</span>
                </button>
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="px-2 py-1 bg-emerald-900 text-white rounded font-bold">{page}</span>
                  <span className="text-slate-400">/</span>
                  <span className="px-2 py-1 text-slate-700">{totalPages}</span>
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
