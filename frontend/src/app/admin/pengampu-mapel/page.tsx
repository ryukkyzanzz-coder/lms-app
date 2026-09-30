'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, BookOpen, Users, Layers, CheckCircle2, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MASTER_MATA_PELAJARAN } from '@/lib/data/academic';

export default function DaftarPengampuMapelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filteredData = useMemo(() => {
    return MASTER_MATA_PELAJARAN.filter(item => {
      const searchMatch = 
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.guruPengampuNama.toLowerCase().includes(searchQuery.toLowerCase());
      
      const jurusanMatch = filterJurusan === 'all' || item.jurusanSingkat === filterJurusan;
      
      return searchMatch && jurusanMatch;
    });
  }, [searchQuery, filterJurusan]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedList = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const totalPengampu = new Set(MASTER_MATA_PELAJARAN.map(m => m.guruPengampuNip)).size;
  const totalMapel = MASTER_MATA_PELAJARAN.length;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="hover:text-blue-900 transition-colors cursor-pointer">Data Akademik</span>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Pengampu Mata Pelajaran</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Pengampu Mata Pelajaran</h1>
              <span className="bg-blue-50 border border-blue-100 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Monitoring Relasi
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Pemantauan alokasi guru terhadap mata pelajaran dan rombongan belajar.
            </p>
          </div>
        </div>

        {/* Metric Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Penugasan Mapel</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalMapel}</span>
                <span className="text-sm text-slate-500 font-medium">Mata Pelajaran</span>
              </div>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
              <BookOpen size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Guru Pengampu</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalPengampu}</span>
                <span className="text-sm text-slate-500 font-medium">Guru</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Status Validasi SK</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-emerald-700 font-bold">100%</span>
                <span className="text-sm text-slate-500 font-medium">Tervalidasi</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-8 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 focus:border-transparent transition-all" 
                placeholder="Cari nama guru atau mata pelajaran..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-4">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer"
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="all">Semua Konsentrasi / Jurusan</option>
                <option value="RPL">RPL (Rekayasa Perangkat Lunak)</option>
                <option value="TJKT">TJKT (Teknik Jaringan Komputer)</option>
                <option value="DKV">DKV (Desain Komunikasi Visual)</option>
                <option value="UMUM">UMUM (Muatan Nasional)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Guru Pengampu</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Rombel Target</th>
                  <th className="py-3 px-4 text-center">Beban (JP)</th>
                  <th className="py-3 px-4 text-center">Status SK</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                      Data pengampu tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-medium">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[13px] font-bold text-slate-900 block">{item.guruPengampuNama}</span>
                        <span className="text-[11px] text-slate-500 font-mono mt-0.5">NIP: {item.guruPengampuNip}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-800">{item.nama}</span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Layers size={10} />
                            Kelas {item.tingkat} {item.jurusanSingkat}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {item.rombelTarget && item.rombelTarget.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {item.rombelTarget.map((r, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-[10px] font-semibold text-slate-700">
                                {r}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold text-blue-700">{item.jpPerMinggu}</span>
                        <span className="text-[10px] text-slate-500 ml-1">JP</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.statusSk === 'Tervalidasi'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {item.statusSk}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/pengampu-mapel/${item.id}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-blue-700 rounded transition-colors text-[11px] font-bold">
                          <Eye size={14} />
                          <span>Lihat Detail</span>
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
                Menampilkan <strong className="text-slate-900">{(page - 1) * pageSize + 1}</strong> - <strong className="text-slate-900">{Math.min(page * pageSize, filteredData.length)}</strong> dari <strong className="text-slate-900">{filteredData.length}</strong> data
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
                  <span className="px-2 py-1 bg-blue-900 text-white rounded font-bold">{page}</span>
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
