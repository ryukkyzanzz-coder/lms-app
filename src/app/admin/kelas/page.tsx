'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Download, PlusCircle, DoorOpen, Users, Award, 
  RefreshCcw, X, Eye, Edit, UserPlus, MoreVertical, CheckCircle2,
  Terminal, ChevronLeft, ChevronRight, Clock
} from 'lucide-react';
import { MASTER_KELAS, Kelas } from '@/lib/data/academic';

export default function DaftarKelasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTahunAjaran, setFilterTahunAjaran] = useState('20261');
  const [filterTingkat, setFilterTingkat] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredKelas = useMemo(() => {
    return MASTER_KELAS.filter(item => {
      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.waliKelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.kode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTingkat = filterTingkat === 'all' || item.tingkat === filterTingkat;
      const matchJurusan = filterJurusan === 'all' || item.jurusanSingkat === filterJurusan;
      // In sample data, status is string like 'Aktif, Kuota Normal'.
      const matchStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && item.status.toLowerCase().includes('aktif')) ||
                         (filterStatus === 'archived' && !item.status.toLowerCase().includes('aktif'));
                         
      return matchSearch && matchTingkat && matchJurusan && matchStatus;
    });
  }, [searchQuery, filterTahunAjaran, filterTingkat, filterJurusan, filterStatus]);

  const totalPages = Math.ceil(filteredKelas.length / pageSize) || 1;
  const paginatedList = filteredKelas.slice((page - 1) * pageSize, page * pageSize);

  const resetFilter = () => {
    setFilterTahunAjaran('all');
    setFilterTingkat('all');
    setFilterJurusan('all');
    setFilterStatus('all');
  };

  const totalAktif = MASTER_KELAS.filter(k => k.status.toLowerCase().includes('aktif')).length;
  const totalKapasitas = MASTER_KELAS.reduce((sum, k) => sum + k.kapasitas, 0);
  const totalTerisi = MASTER_KELAS.reduce((sum, k) => sum + k.terisi, 0);
  const kapasitasPersen = ((totalTerisi / totalKapasitas) * 100).toFixed(1);

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header & Context Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="hover:text-blue-900 transition-colors cursor-pointer">Data Sekolah</span>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Kelas</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Kelas</h1>
              <span className="bg-blue-50 border border-blue-100 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Kurikulum Merdeka
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Kelola data rombongan belajar (rombel), penetapan wali kelas, dan kuota penempatan akademik siswa.
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
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Kelas Aktif</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalAktif}</span>
                <span className="text-sm text-slate-500 font-medium">Rombel</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] text-slate-500 font-medium">100% Terisi Kuota Normal</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
              <DoorOpen size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Kapasitas Kuota Siswa</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalTerisi}</span>
                <span className="text-sm text-slate-500">/ {totalKapasitas} Siswa</span>
              </div>
              <div className="flex items-center gap-2 mt-2 w-full max-w-[140px]">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 rounded-full" style={{ width: `${kapasitasPersen}%` }}></div>
                </div>
                <span className="text-[11px] font-bold text-blue-700">{kapasitasPersen}%</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 ml-2">
              <Users size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Wali Kelas Terdaftar</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{totalAktif}</span>
                <span className="text-sm text-slate-500 font-medium">Guru</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-bold">SK Penetapan Lengkap</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <Award size={24} />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Status Validasi Dapodik</span>
              <div className="flex items-center gap-1.5 mt-1">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <span className="font-display text-[15px] text-emerald-700 font-bold">Terverifikasi</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-slate-500">
                <Clock size={13} className="text-slate-400" />
                <span className="text-[11px] font-medium">Hari ini • 07:30 WIB</span>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl">
              <RefreshCcw size={24} />
            </div>
          </div>
        </div>

        {/* Control & Filter Toolbar Card */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-4 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 focus:border-transparent transition-all shadow-xs" 
                placeholder="Cari nama rombel, wali kelas, atau kode..." 
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
                <option value="20261">TA 2026/2027 Ganjil (Aktif)</option>
                <option value="20252">TA 2025/2026 Genap</option>
                <option value="all">Semua Tahun Ajaran</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterTingkat}
                onChange={(e) => setFilterTingkat(e.target.value)}
              >
                <option value="all">Semua Tingkat (X, XI, XII)</option>
                <option value="X">Kelas X (Fase E)</option>
                <option value="XI">Kelas XI (Fase F)</option>
                <option value="XII">Kelas XII (Fase F)</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="all">Semua Jurusan</option>
                <option value="RPL">Rekayasa Perangkat Lunak</option>
                <option value="TJKT">Teknik Jaringan Komputer</option>
                <option value="DKV">Desain Komunikasi Visual</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white cursor-pointer shadow-xs"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif (KBM Berjalan)</option>
                <option value="archived">Non-Aktif / Diarsipkan</option>
              </select>
            </div>
          </div>
          
          {(filterTahunAjaran !== 'all' || filterTingkat !== 'all' || filterJurusan !== 'all' || filterStatus !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 uppercase font-bold mr-1">Filter Aktif:</span>
              
              {filterTahunAjaran !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-full">
                  <span>Tahun Ajaran: {filterTahunAjaran === '20261' ? '2026/2027 Ganjil' : '2025/2026 Genap'}</span>
                  <button type="button" onClick={() => setFilterTahunAjaran('all')} className="hover:text-red-600">
                    <X size={13} />
                  </button>
                </span>
              )}
              {filterTingkat !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-full">
                  <span>Tingkat: {filterTingkat}</span>
                  <button type="button" onClick={() => setFilterTingkat('all')} className="hover:text-red-600">
                    <X size={13} />
                  </button>
                </span>
              )}
              {filterJurusan !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-full">
                  <span>Jurusan: {filterJurusan}</span>
                  <button type="button" onClick={() => setFilterJurusan('all')} className="hover:text-red-600">
                    <X size={13} />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-full">
                  <span>Status: {filterStatus === 'active' ? 'Aktif' : 'Non-Aktif'}</span>
                  <button type="button" onClick={() => setFilterStatus('all')} className="hover:text-red-600">
                    <X size={13} />
                  </button>
                </span>
              )}
              
              <button 
                type="button" 
                onClick={resetFilter}
                className="text-[11px] text-blue-700 hover:text-blue-900 underline ml-1 font-semibold transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Master Table Card */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Kelas & Kode</th>
                  <th className="py-3 px-4">Tingkat Kurikulum</th>
                  <th className="py-3 px-4">Konsentrasi Keahlian</th>
                  <th className="py-3 px-4">Wali Kelas</th>
                  <th className="py-3 px-4 min-w-[170px]">Kapasitas Siswa</th>
                  <th className="py-3 px-4">Tahun Ajaran</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400 font-medium">
                      Tidak ada kelas yang ditemukan berdasarkan filter.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map(kls => {
                    const percentage = Math.round((kls.terisi / kls.kapasitas) * 100);
                    return (
                      <tr key={kls.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-blue-900">{kls.nama}</span>
                            <span className="text-[11px] font-mono font-medium text-slate-400">#{kls.kode}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 text-[11px] font-semibold text-slate-700">
                            Kelas {kls.tingkat} • {kls.fase}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 font-medium text-[13px] text-slate-800">
                            <Terminal size={14} className="text-blue-700" />
                            <span>{kls.jurusan}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-slate-900">{kls.waliKelas}</span>
                            <span className="text-[11px] text-slate-500">NIP {kls.waliKelasNip}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-slate-900">{kls.terisi} / {kls.kapasitas} Siswa</span>
                              <span className="text-slate-500 font-bold">{percentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${percentage === 100 ? 'bg-emerald-600' : 'bg-blue-700'}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[12px] font-semibold text-slate-600">2026/2027 Ganjil</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                            kls.status.toLowerCase().includes('aktif')
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {kls.status.toLowerCase().includes('aktif') && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            )}
                            {kls.status.toLowerCase().includes('aktif') ? 'Aktif' : 'Non-Aktif'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1 text-slate-400">
                            <Link href={`/admin/kelas/${kls.id}`} className="p-1 hover:text-blue-700 hover:bg-slate-100 rounded transition-colors" title="Detail Kelas">
                              <Eye size={16} />
                            </Link>
                            <Link href={`/admin/kelas/${kls.id}/siswa`} className="p-1 hover:text-emerald-700 hover:bg-slate-100 rounded transition-colors" title="Lihat Anggota Rombel">
                              <Users size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div>
                Menampilkan <strong className="text-slate-900">{(page - 1) * pageSize + 1}</strong> - <strong className="text-slate-900">{Math.min(page * pageSize, filteredKelas.length)}</strong> dari <strong className="text-slate-900">{filteredKelas.length}</strong> kelas
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
