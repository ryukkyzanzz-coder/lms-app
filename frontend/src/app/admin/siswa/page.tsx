'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Download, Users, DoorOpen, Award, CheckCircle2, Eye, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MASTER_SISWA_SAMPEL, MASTER_KELAS } from '@/lib/data/academic';

export default function DaftarSiswaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTahunAjaran, setFilterTahunAjaran] = useState('20261');
  const [filterTingkat, setFilterTingkat] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filteredSiswa = useMemo(() => {
    return MASTER_SISWA_SAMPEL.filter(item => {
      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nisn.includes(searchQuery) ||
                          item.nis.includes(searchQuery);
      const matchTingkat = filterTingkat === 'all' || item.tingkat === filterTingkat;
      const matchJurusan = filterJurusan === 'all' || item.jurusanSingkat === filterJurusan;
      const matchKelas = filterKelas === 'all' || item.kelasId === filterKelas;
      const matchStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && item.status === 'Aktif') ||
                         (filterStatus === 'archived' && item.status !== 'Aktif');
                         
      return matchSearch && matchTingkat && matchJurusan && matchKelas && matchStatus;
    });
  }, [searchQuery, filterTahunAjaran, filterTingkat, filterJurusan, filterKelas, filterStatus]);

  const totalPages = Math.ceil(filteredSiswa.length / pageSize) || 1;
  const paginatedList = filteredSiswa.slice((page - 1) * pageSize, page * pageSize);

  const resetFilter = () => {
    setFilterTahunAjaran('all');
    setFilterTingkat('all');
    setFilterJurusan('all');
    setFilterKelas('all');
    setFilterStatus('all');
  };

  const totalSiswa = MASTER_SISWA_SAMPEL.length;
  const totalAktif = MASTER_SISWA_SAMPEL.filter(s => s.status === 'Aktif').length;
  const jumlahKelas = MASTER_KELAS.length;
  const jumlahJurusan = 3;

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
              <span className="text-blue-900 font-semibold">Siswa</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Data Siswa</h1>
              <span className="bg-blue-50 border border-blue-100 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Direktori Akademik
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Monitoring data siswa, penempatan rombongan belajar, dan aktivitas akademik.
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
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Siswa</span>
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
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Siswa Aktif</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalAktif}</span>
                <span className="text-sm text-slate-500 font-medium">Siswa</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 ml-2">
              <CheckCircle2 size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Jumlah Kelas</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{jumlahKelas}</span>
                <span className="text-sm text-slate-500 font-medium">Rombel</span>
              </div>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
              <DoorOpen size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Jumlah Jurusan</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{jumlahJurusan}</span>
                <span className="text-sm text-slate-500 font-medium">Konsentrasi</span>
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Award size={24} />
            </div>
          </div>
        </div>

        {/* Control & Filter Toolbar Card */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-3 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 focus:border-transparent transition-all shadow-xs" 
                placeholder="Cari nama, NIS..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterTahunAjaran}
                onChange={(e) => setFilterTahunAjaran(e.target.value)}
              >
                <option value="20261">TA 2026/2027</option>
                <option value="all">Semua Tahun</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterTingkat}
                onChange={(e) => setFilterTingkat(e.target.value)}
              >
                <option value="all">Semua Tingkat</option>
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="all">Semua Jurusan</option>
                <option value="RPL">RPL</option>
                <option value="TJKT">TJKT</option>
                <option value="DKV">DKV</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
              >
                <option value="all">Semua Kelas</option>
                {MASTER_KELAS.map(k => (
                  <option key={k.id} value={k.id}>{k.nama}</option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-1">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Status</option>
                <option value="active">Aktif</option>
                <option value="archived">Non-Aktif</option>
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
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">NIS</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Tingkat</th>
                  <th className="py-3 px-4">Jurusan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400 font-medium">
                      Tidak ada siswa yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((siswa, idx) => (
                    <tr key={siswa.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center text-slate-400 font-medium">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[13px] font-bold text-slate-900">{siswa.nama}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-[12px] font-medium text-slate-700">{siswa.nis}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-blue-900">{siswa.kelasNama}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 text-[11px] font-semibold text-slate-700">
                          Kelas {siswa.tingkat}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {siswa.jurusanSingkat}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          siswa.status === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {siswa.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/siswa/${siswa.id}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-blue-700 rounded transition-colors text-[11px] font-bold">
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
                Menampilkan <strong className="text-slate-900">{(page - 1) * pageSize + 1}</strong> - <strong className="text-slate-900">{Math.min(page * pageSize, filteredSiswa.length)}</strong> dari <strong className="text-slate-900">{filteredSiswa.length}</strong> siswa
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
