'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTeacher } from '@/lib/guru/teacher-context';
import { 
  Download, 
  BookOpen, 
  Users, 
  UserCheck, 
  Clock, 
  ClipboardCheck, 
  Search, 
  ChevronDown, 
  Grid, 
  List,
  MonitorSmartphone,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function KelasPage() {
  const {
    availableClasses: classes,
    isLoadingClasses: loading,
    errorClasses: error,
    refetchClasses: loadClasses,
  } = useTeacher();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [tingkatFilter, setTingkatFilter] = useState('all');

  const totalSiswa = classes.reduce((acc, curr) => acc + (curr.siswaIds?.length || 0), 0);
  const totalRombel = classes.length;
  
  // Filter search & tingkat
  const filteredKelas = classes.filter((k) => {
    const matchesSearch =
      k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTingkat =
      tingkatFilter === 'all' || k.tingkat.toUpperCase() === tingkatFilter.toUpperCase();

    return matchesSearch && matchesTingkat;
  });

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* 1. Academic Command Header */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Penugasan Aktif
            </span>
            <span className="text-[12px] text-slate-500 font-medium">SK No. 421/182/SMK.01/2026</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Kelas Saya</h1>
            <p className="text-[13px] text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Daftar rombel dan kompetensi keahlian yang diampu pada Semester Ganjil TA 2026/2027 berdasarkan SK Pembagian Tugas Mengajar Kurikulum.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors shadow-sm">
            <Download size={18} className="text-blue-700" />
            <span>Unduh Jadwal PDF</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors shadow-sm">
            <BookOpen size={18} />
            <span>Jurnal Mengajar Semester</span>
          </button>
        </div>
      </div>

      {/* 2. Operational Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Rombel</span>
            <span className="font-display text-[18px] font-bold text-slate-900 mt-0.5">
              {loading ? '...' : `${totalRombel} Rombel`}
            </span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <UserCheck size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Peserta Didik</span>
            <span className="font-display text-[18px] font-bold text-slate-900 mt-0.5">
              {loading ? '...' : `${totalSiswa} Siswa`}
            </span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Beban Mengajar</span>
            <span className="font-display text-[18px] font-bold text-slate-900 mt-0.5">24 JP / Pekan</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ClipboardCheck size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status Validasi</span>
            <span className="font-display text-[18px] font-bold text-teal-700 mt-0.5">100% Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* 3. Filter & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text" 
              className="w-full md:w-[300px] h-10 pl-9 pr-3 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
              placeholder="Cari rombel atau program..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select className="w-full md:w-auto appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow">
              <option>Semester Ganjil 2026/2027 (Aktif)</option>
              <option>Semester Genap 2025/2026 (Arsip)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              value={tingkatFilter}
              onChange={(e) => setTingkatFilter(e.target.value)}
              className="w-full md:w-auto appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow"
            >
              <option value="all">Semua Tingkat (Kelas X, XI, XII)</option>
              <option value="X">Kelas X (Tingkat 1)</option>
              <option value="XI">Kelas XI (Tingkat 2)</option>
              <option value="XII">Kelas XII (Tingkat 3)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60 w-fit shrink-0">
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-900 shadow-sm border border-slate-200/40' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setViewMode('grid')}
            title="Tampilan Kartu"
          >
            <Grid size={16} />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${viewMode === 'table' ? 'bg-white text-blue-900 shadow-sm border border-slate-200/40' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setViewMode('table')}
            title="Tabel Operasional Detail"
          >
            <List size={16} />
            <span className="hidden sm:inline">Tabel Operasional</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-500 shrink-0" />
            <div className="text-sm text-red-700">
              <strong>Gagal memuat data kelas:</strong> {error}
            </div>
          </div>
          <button
            onClick={loadClasses}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <RotateCcw size={14} />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-6 h-64 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className="w-20 h-4 bg-slate-200 rounded"></div>
                  <div className="w-40 h-6 bg-slate-200 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
              </div>
              <div className="w-full h-8 bg-slate-100 rounded-lg"></div>
              <div className="w-full h-10 bg-slate-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Grid View */}
      {!loading && !error && viewMode === 'grid' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredKelas.length === 0 ? (
            <div className="col-span-1 xl:col-span-2 bg-white border border-slate-200/60 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-sm">
              <DoorOpen size={40} className="text-slate-300" />
              <h3 className="font-display text-base font-bold text-slate-800">Tidak Ada Kelas Ditemukan</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                {searchQuery || tingkatFilter !== 'all'
                  ? 'Tidak ada rombongan belajar yang sesuai dengan kriteria filter pencarian.'
                  : 'Belum ada kelas yang terdaftar untuk penugasan mengajar Anda.'}
              </p>
            </div>
          ) : (
            filteredKelas.map((kelas) => (
              <div 
                key={kelas._id} 
                className="bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col hover:border-blue-200 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="p-6 flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Tingkat {kelas.tingkat}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                          {kelas.status || 'Kelas Aktif'}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {kelas.nama}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium mt-0.5">
                        Kompetensi: {kelas.program}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                      <MonitorSmartphone size={24} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[13px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-400 shrink-0" />
                      <span>{kelas.siswaIds?.length || 0} Siswa Terdaftar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600 shrink-0" />
                      <span>Data Dapodik Valid</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-blue-100">
                      <DoorOpen size={14} />
                      Ruang Rombel Aktif
                    </span>
                  </div>
                </div>
                
                <div className="mt-auto bg-slate-50 border-t border-slate-200/60 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-500 font-medium">Sinkron dengan Sistem Akademik</span>
                  <Link 
                    href={`/guru/kelas/${kelas._id}`} 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800 rounded-lg px-5 py-2 text-[13px] font-semibold transition-colors shadow-sm"
                  >
                    <span>Buka Ruang Kelas</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. Table View */}
      {!loading && !error && viewMode === 'table' && (
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Rombel / Kelas</th>
                  <th className="px-5 py-3">Tingkat</th>
                  <th className="px-5 py-3">Kompetensi Keahlian</th>
                  <th className="px-5 py-3 text-center">Jumlah Siswa</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
                {filteredKelas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                      Tidak ada kelas yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredKelas.map((kelas, idx) => (
                    <tr key={kelas._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-slate-400 text-xs">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <span className="font-display font-semibold text-slate-900 text-[14px]">
                          {kelas.nama}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold">
                          Kelas {kelas.tingkat}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-medium">
                        {kelas.program}
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-slate-800">
                        {kelas.siswaIds?.length || 0}
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[11px] font-bold">
                          {kelas.status || 'Aktif'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/guru/kelas/${kelas._id}`}
                          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors shadow-sm"
                        >
                          <span>Buka</span>
                          <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Validation Note */}
      <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-blue-700 shrink-0" />
          <p className="text-[12px] text-slate-600 leading-relaxed">
            Penetapan rombel dan jam tatap muka sinkron dengan sistem <strong className="text-slate-900">Dapodik</strong> & <strong className="text-slate-900">Tim Kurikulum Sekolah</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
          <span>Status: <strong className="text-green-600">Tersinkronisasi</strong></span>
          <span className="w-px h-3 bg-slate-300"></span>
          <span>ID: #DPK-2026-0926</span>
        </div>
      </div>
    </div>
  );
}
