'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Download, BookOpen, Clock, ShieldCheck, CheckCircle2, Eye, ChevronLeft, ChevronRight, Layers, GraduationCap
} from 'lucide-react';
import { MASTER_MATA_PELAJARAN } from '@/lib/data/academic';

export default function DaftarMapelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTingkat, setFilterTingkat] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterKategori, setFilterKategori] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filteredMapel = useMemo(() => {
    return MASTER_MATA_PELAJARAN.filter(item => {
      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.kode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTingkat = filterTingkat === 'all' || item.tingkat === filterTingkat;
      const matchJurusan = filterJurusan === 'all' || item.jurusanSingkat === filterJurusan;
      const matchKategori = filterKategori === 'all' || item.kategori === filterKategori;
                         
      return matchSearch && matchTingkat && matchJurusan && matchKategori;
    });
  }, [searchQuery, filterTingkat, filterJurusan, filterKategori]);

  const totalPages = Math.ceil(filteredMapel.length / pageSize) || 1;
  const paginatedList = filteredMapel.slice((page - 1) * pageSize, page * pageSize);

  const totalMapel = MASTER_MATA_PELAJARAN.length;
  const totalTervalidasi = MASTER_MATA_PELAJARAN.filter(m => m.statusSk === 'Tervalidasi').length;
  const totalKejuruan = MASTER_MATA_PELAJARAN.filter(m => m.kategori === 'Kejuruan').length;
  const totalUmum = MASTER_MATA_PELAJARAN.filter(m => m.kategori.includes('Muatan')).length;

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
              <span className="text-blue-900 font-semibold">Mata Pelajaran</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Mata Pelajaran</h1>
              <span className="bg-purple-50 border border-purple-100 text-purple-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Kurikulum & Akademik
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Monitoring data mata pelajaran, kurikulum, dan pengampu.
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
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Mata Pelajaran</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalMapel}</span>
                <span className="text-sm text-slate-500 font-medium">Mapel</span>
              </div>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
              <BookOpen size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Aktif (Tervalidasi)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalTervalidasi}</span>
                <span className="text-sm text-slate-500 font-medium">Mapel</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 ml-2">
              <CheckCircle2 size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Mapel Kejuruan</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalKejuruan}</span>
                <span className="text-sm text-slate-500 font-medium">Mapel</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <Layers size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Mapel Umum</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalUmum}</span>
                <span className="text-sm text-slate-500 font-medium">Mapel</span>
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <GraduationCap size={24} />
            </div>
          </div>
        </div>

        {/* Control & Filter Toolbar Card */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-4 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-purple-900 focus:border-transparent transition-all shadow-xs" 
                placeholder="Cari nama mapel atau kode..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-purple-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterTingkat}
                onChange={(e) => setFilterTingkat(e.target.value)}
              >
                <option value="all">Semua Tingkat</option>
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-purple-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="all">Semua Jurusan</option>
                <option value="RPL">RPL</option>
                <option value="TJKT">TJKT</option>
                <option value="DKV">DKV</option>
                <option value="UMUM">UMUM</option>
              </select>
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-purple-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="Kejuruan">Kejuruan</option>
                <option value="Muatan Nasional">Muatan Nasional</option>
                <option value="Muatan Kewilayahan">Muatan Kewilayahan</option>
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
                  <th className="py-3 px-4">Mata Pelajaran & Kode</th>
                  <th className="py-3 px-4">Kategori & Fase</th>
                  <th className="py-3 px-4">Tingkat / Jurusan</th>
                  <th className="py-3 px-4">Guru Pengampu</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                      Tidak ada mata pelajaran yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((mapel, idx) => (
                    <tr key={mapel.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-medium">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[13px] font-bold text-slate-900">{mapel.nama}</span>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{mapel.kode}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-800">{mapel.kategori}</span>
                          <span className="text-[11px] text-slate-500">{mapel.fase}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center w-max px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 text-[11px] font-semibold text-slate-700">
                            Kelas {mapel.tingkat}
                          </span>
                          <span className="text-[11px] font-semibold text-purple-800 mt-1">{mapel.jurusanSingkat}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{mapel.guruPengampuNama}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                          <span>{mapel.rombelTarget.length} Rombel</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-purple-600 font-medium">{mapel.jpPerMinggu} JP/Minggu</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          mapel.statusSk === 'Tervalidasi'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {mapel.statusSk}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/mapel/${mapel.id}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-purple-700 rounded transition-colors text-[11px] font-bold">
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
                Menampilkan <strong className="text-slate-900">{(page - 1) * pageSize + 1}</strong> - <strong className="text-slate-900">{Math.min(page * pageSize, filteredMapel.length)}</strong> dari <strong className="text-slate-900">{filteredMapel.length}</strong> mata pelajaran
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
                  <span className="px-2 py-1 bg-purple-900 text-white rounded font-bold">{page}</span>
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
