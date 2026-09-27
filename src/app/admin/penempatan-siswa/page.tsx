'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Users, BookOpen, UserCheck, Eye, ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';
import { MASTER_SISWA_SAMPEL, MASTER_KELAS, TAHUN_AJARAN_AKTIF } from '@/lib/data/academic';

export default function DaftarPenempatanSiswaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filteredData = useMemo(() => {
    return MASTER_SISWA_SAMPEL.filter(item => {
      const searchMatch = 
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nisn.includes(searchQuery) ||
        item.nis.includes(searchQuery);
      
      const kelasMatch = filterKelas === 'all' || item.kelasNama === filterKelas;
      const jurusanMatch = filterJurusan === 'all' || item.jurusanSingkat === filterJurusan;
      
      return searchMatch && kelasMatch && jurusanMatch;
    });
  }, [searchQuery, filterKelas, filterJurusan]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedList = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const totalSiswa = MASTER_SISWA_SAMPEL.length;
  const totalDitempatkan = MASTER_SISWA_SAMPEL.filter(s => s.kelasId !== '').length;
  const totalKelas = MASTER_KELAS.length;
  
  // Get unique classes for filter
  const uniqueClasses = Array.from(new Set(MASTER_KELAS.map(k => k.nama))).sort();

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
              <span className="text-blue-900 font-semibold">Penempatan Siswa</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Penempatan Siswa</h1>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Alokasi Rombel
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Monitoring distribusi siswa ke dalam rombongan belajar Tahun Ajaran {TAHUN_AJARAN_AKTIF.tahun}.
            </p>
          </div>
        </div>

        {/* Metric Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Peserta Didik</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalSiswa}</span>
                <span className="text-sm text-slate-500 font-medium">Siswa</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Status Penempatan</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-emerald-700 font-bold">{totalDitempatkan}</span>
                <span className="text-sm text-slate-500 font-medium">Dialokasikan</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <UserCheck size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Rombel Aktif</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalKelas}</span>
                <span className="text-sm text-slate-500 font-medium">Kelas</span>
              </div>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl shrink-0">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-6 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-900 focus:border-transparent transition-all" 
                placeholder="Cari nama siswa, NISN, atau NIS..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:bg-white cursor-pointer"
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
              >
                <option value="all">Semua Kelas</option>
                {uniqueClasses.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:bg-white cursor-pointer"
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="all">Semua Program / Jurusan</option>
                <option value="RPL">RPL (Rekayasa Perangkat Lunak)</option>
                <option value="TJKT">TJKT (Teknik Jaringan Komputer)</option>
                <option value="DKV">DKV (Desain Komunikasi Visual)</option>
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
                  <th className="py-3 px-4">Nama Siswa & Identitas</th>
                  <th className="py-3 px-4">Tingkat / Program</th>
                  <th className="py-3 px-4">Penempatan Kelas</th>
                  <th className="py-3 px-4 text-center">Tahun Ajaran</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                      Data siswa tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-medium">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[13px] font-bold text-slate-900 block">{item.nama}</span>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex gap-2">
                          <span>NISN: {item.nisn}</span>
                          <span>NIS: {item.nis}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-800">Kelas {item.tingkat}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{item.jurusanSingkat}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {item.kelasId ? (
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-1 bg-blue-50 border border-blue-100 text-blue-800 font-bold text-[11px] rounded">
                              {item.kelasNama}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Belum ditempatkan</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-slate-600 font-medium text-[11px]">{TAHUN_AJARAN_AKTIF.tahun}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.status === 'Aktif' || item.status === 'Mutasi Masuk'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/penempatan-siswa/${item.id}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-emerald-700 rounded transition-colors text-[11px] font-bold">
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
