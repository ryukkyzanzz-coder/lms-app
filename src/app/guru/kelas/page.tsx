'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAPI } from '../../../lib/api';
import { TeacherDashboardStats } from '../../../types/guru';
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
  Database,
  Code,
  Table,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  AlertTriangle
} from 'lucide-react';

export default function KelasPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [data, setData] = useState<TeacherDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAPI('/teachers/me/dashboard')
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="w-full flex items-center justify-center p-12 text-slate-500 font-medium animate-pulse">Memuat data kelas...</div>;
  }
  
  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 gap-4">
        <AlertTriangle size={32} className="text-red-500" />
        <div className="text-slate-700 font-medium text-center">
          Gagal memuat data kelas. <br />
          <span className="text-sm text-slate-500">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalSiswa = data.kelas.reduce((acc, curr) => acc + curr.jumlahSiswa, 0);
  const totalRombel = data.kelas.length;
  
  // Filter search
  const filteredKelas = data.kelas.filter(k => 
    k.mapel.toLowerCase().includes(searchQuery.toLowerCase()) || 
    k.kelas.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Daftar rombel dan mata pelajaran yang diampu pada Semester Ganjil TA 2026/2027 berdasarkan SK Pembagian Tugas Mengajar Kurikulum.
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
            <span className="font-display text-[18px] font-bold text-slate-900 mt-0.5">{totalRombel} Rombel</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <UserCheck size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Peserta Didik</span>
            <span className="font-display text-[18px] font-bold text-slate-900 mt-0.5">{totalSiswa} Siswa</span>
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
          <div className="w-12 h-12 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
            <ClipboardCheck size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Menunggu Nilai</span>
            <span className="font-display text-[18px] font-bold text-red-600 mt-0.5">{data.perluTindakan.belumDiperiksa} Submisi</span>
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
              placeholder="Cari rombel atau mata pelajaran..." 
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
            <select className="w-full md:w-auto appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow">
              <option>Semua Tingkat (Kelas X, XI, XII)</option>
              <option>Kelas XII (Tingkat 3)</option>
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

      {/* 4. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredKelas.length === 0 && (
            <div className="col-span-1 xl:col-span-2 text-center text-slate-500 p-12 border border-dashed rounded-xl">
              Tidak ada kelas yang ditemukan.
            </div>
          )}
          {filteredKelas.map((kelas, idx) => (
            <div key={kelas.kelasId || idx} className="bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col hover:border-blue-200 hover:shadow-md transition-all overflow-hidden group">
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kelas.kelas}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">Kelas Aktif</span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{kelas.mapel}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MonitorSmartphone size={24} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[13px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400 shrink-0" />
                    <span>{kelas.jumlahSiswa} Siswa</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-600">Ketuntasan Modul Ajar</span>
                    <span className="text-[13px] font-bold text-blue-700 font-mono">{kelas.ketuntasanModul}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${kelas.ketuntasanModul}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-blue-100">
                    <ClipboardCheck size={14} />
                    {kelas.tugasAktif} Tugas Aktif
                  </span>
                </div>
              </div>
              
              <div className="mt-auto bg-slate-50 border-t border-slate-200/60 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 font-medium">Sinkron dengan Dapodik</span>
                <Link href={`/guru/kelas/${kelas.kelasId}?mapel=${kelas.mapel}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800 rounded-lg px-5 py-2 text-[13px] font-semibold transition-colors shadow-sm">
                  <span>Buka Ruang Kelas</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view placeholder */}
      {viewMode === 'table' && (
        <div className="p-12 text-center bg-white border border-slate-200/60 rounded-xl shadow-sm flex flex-col items-center justify-center gap-4">
          <List size={48} className="text-slate-300" />
          <div>
            <h3 className="font-display text-[18px] font-bold text-slate-800">Tampilan Tabel Operasional</h3>
            <p className="text-[13px] text-slate-500 mt-2">Fitur ini masih dalam tahap pengembangan. Pilih tampilan Grid untuk melihat detail kelas.</p>
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
