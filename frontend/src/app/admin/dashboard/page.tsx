'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar,
  Layers,
  Users,
  Award,
  BookOpen,
  DoorOpen,
  CheckCircle2,
  Download,
  RefreshCw,
  History,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { 
  TAHUN_AJARAN_AKTIF,
  MASTER_KELAS,
  MASTER_GURU,
  MASTER_MATA_PELAJARAN,
  STATUS_KESIAPAN_AKADEMIK,
  AKTIVITAS_OPERASIONAL_TERKINI 
} from '@/lib/data/academic';

export default function AdminDashboardPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const handleSyncDapodik = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('Sinkronisasi data Dapodik & Pusdatin berhasil. Seluruh 864 NISN dan 48 NIP telah terverifikasi.');
      setTimeout(() => setSyncNotice(null), 5000);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* 1. BREADCRUMB & HEADER WORKSPACE */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Beranda</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-900 font-semibold">Ringkasan Operasional Admin</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              Beranda
            </h1>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200/60">
              SIAKAD INTI v4.2
            </span>
          </div>
          <p className="font-body text-[13px] text-slate-500 max-w-3xl leading-relaxed">
            Ringkasan data operasional sekolah — Pusat kendali satu data terpadu SMK CITRA NEGARA. Mengelola keutuhan data induk rombel, siswa, guru pengampu, serta sinkronisasi kurikulum operasional secara terpadu.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button 
            type="button"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + "Kategori,Total,Status\nSiswa,864,Aktif\nGuru,48,Aktif\nKelas,24,Aktif\nMapel,38,Tervalidasi";
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "rekap_operasional_smk1.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-lg border border-slate-200 shadow-sm transition-colors"
          >
            <Download size={14} className="text-slate-500" />
            <span>Ekspor Rekap (.csv)</span>
          </button>
          
          <button 
            type="button"
            onClick={handleSyncDapodik}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium text-xs rounded-lg shadow-sm transition-colors disabled:opacity-70"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi Dapodik'}</span>
          </button>

          <Link
            href="/admin/profil-struktur"
            className="inline-flex items-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200/60 transition-colors"
            title="Lihat Profil Struktur & Relasi Data"
          >
            <Layers size={16} />
          </Link>
        </div>
      </div>

      {/* Sync notification alert if triggered */}
      {syncNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-lg flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* 2. STRIP KONTEKS AKADEMIK & INTEGRASI SATU DATA */}
      <div className="bg-white border border-slate-200/60 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-blue-900">
            <Calendar size={15} className="text-blue-700" />
            <span>Tahun Ajaran: {TAHUN_AJARAN_AKTIF.tahun}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Semester: <strong className="text-blue-900">{TAHUN_AJARAN_AKTIF.semester}</strong> (Aktif)</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <FileCheck size={14} className="text-slate-400" />
            <span>Kurikulum: {TAHUN_AJARAN_AKTIF.kurikulumDefault}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[11px]">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Pusdatin Terhubung
          </span>
          <span className="text-slate-400 text-[11px]">SK KBM No. 421.5/2026/SMK.01</span>
        </div>
      </div>

      {/* 3. METRIC CARDS COMPACT (4 KARTU BENTO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Siswa */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Siswa</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-slate-900 leading-none">864</span>
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              100% Terpetakan
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>448 L • 416 P</span>
            <span className="font-mono text-slate-600">X: 288 | XI: 288 | XII: 288</span>
          </div>
        </div>

        {/* Card 2: Tenaga Pendidik (Guru) */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Guru</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-slate-900 leading-none">48</span>
            <span className="inline-flex items-center text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Pendidik & Konselor
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>42 Kejuruan • 6 BK</span>
            <span className="text-emerald-700 font-semibold">39 Bersertifikasi</span>
          </div>
        </div>

        {/* Card 3: Rombongan Belajar (Kelas) */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Kelas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DoorOpen size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-slate-900 leading-none">24</span>
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              Rombel Aktif
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Rata-rata 36 Siswa/Kls</span>
            <span className="font-mono text-slate-600">8 X | 8 XI | 8 XII</span>
          </div>
        </div>

        {/* Card 4: Mata Pelajaran */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Mata Pelajaran</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-slate-900 leading-none">38</span>
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              100% Ada Pengampu
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>24 Kejuruan • 14 Umum</span>
            <span className="text-blue-700 font-semibold">Kurikulum Merdeka</span>
          </div>
        </div>

      </div>

      {/* 4. KELAS AKTIF (TABEL RINGKAS OPERASIONAL) */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <DoorOpen size={16} />
            </div>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Kelas Aktif
              </h2>
              <span className="text-[11px] text-slate-500">Status keterisian rombongan belajar semester ganjil</span>
            </div>
          </div>
          <Link 
            href="/admin/data-sekolah?tab=kelas"
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Buka Semua Rombel (24)</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Kelas</th>
                <th className="py-3 px-4">Tingkat</th>
                <th className="py-3 px-4">Jurusan</th>
                <th className="py-3 px-4">Wali Kelas</th>
                <th className="py-3 px-4">Siswa</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {MASTER_KELAS.slice(0, 6).map((kls) => {
                const percentage = Math.round((kls.terisi / kls.kapasitas) * 100);
                return (
                  <tr key={kls.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-5 font-semibold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0"></span>
                      <span>{kls.nama}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      Kelas {kls.tingkat} <span className="text-[10px] text-slate-400 font-mono">({kls.fase})</span>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">
                      {kls.jurusan}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {kls.waliKelas}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${percentage === 100 ? 'bg-emerald-600' : 'bg-blue-700'}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[11px] text-slate-600">
                          {kls.terisi}/{kls.kapasitas} ({percentage}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        kls.status.includes('Penuh') 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {kls.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Link 
                        href={`/admin/data-sekolah?tab=kelas&search=${encodeURIComponent(kls.nama)}`}
                        className="text-blue-900 hover:text-blue-700 font-semibold text-xs hover:underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. GURU AKTIF & DISTRIBUSI SISWA (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri (7 Col): Tenaga Pendidik (Guru Aktif) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award size={18} className="text-blue-900" />
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Guru Aktif
              </h2>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[11px] font-medium">
                48 GTK Terdata
              </span>
            </div>
            <Link 
              href="/admin/data-sekolah?tab=guru" 
              className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {MASTER_GURU.map((guru) => (
              <div key={guru.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {guru.inisial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-900 text-xs truncate">
                      {guru.nama}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5">
                      NIP: {guru.nip} • {guru.bidang}
                    </span>
                    <span className="text-[11px] text-blue-800 font-medium truncate mt-0.5">
                      {guru.mapelUtama}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {guru.rombelDiampu.join(', ')}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900 bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-100">
                      {guru.totalJp} JP
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 size={11} />
                    {guru.statusSk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan (5 Col): Distribusi & Penempatan Siswa */}
        <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-xl shadow-sm p-5 flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-900" />
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Distribusi Siswa
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">864 Peserta Didik</span>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Tingkat XII */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Tingkat XII (Fase F - Akhir)</span>
                <span className="font-mono text-slate-600">288 Siswa (8 Rombel)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-900 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>RPL: 138 • TJKT: 72 • DKV: 78</span>
                <span className="text-emerald-700 font-medium">100% Kuota Terisi</span>
              </div>
            </div>

            {/* Tingkat XI */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Tingkat XI (Fase F - Konsentrasi)</span>
                <span className="font-mono text-slate-600">288 Siswa (8 Rombel)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>RPL: 142 • TJKT: 74 • DKV: 72</span>
                <span className="text-emerald-700 font-medium">100% Kuota Terisi</span>
              </div>
            </div>

            {/* Tingkat X */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Tingkat X (Fase E - Fondasi Kejuruan)</span>
                <span className="font-mono text-slate-600">288 Siswa (8 Rombel)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>PPLG: 144 • TJKT: 72 • DKV: 72</span>
                <span className="text-emerald-700 font-medium">100% Kuota Terisi</span>
              </div>
            </div>

          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3.5 flex items-start gap-3 text-xs text-blue-900">
            <ShieldCheck size={18} className="text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Seluruh rombel terkonfirmasi memenuhi batas minimal 20 siswa dan maksimal 36 siswa sesuai Permendikbud Standar Sarana & Prasarana.
            </p>
          </div>
        </div>

      </div>

      {/* 6. MATA PELAJARAN AKTIF (TABEL PENGAMPU) */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <BookOpen size={16} />
            </div>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Mata Pelajaran Aktif
              </h2>
              <span className="text-[11px] text-slate-500">Penugasan pengampu mata pelajaran semester ganjil</span>
            </div>
          </div>
          <Link 
            href="/admin/data-sekolah?tab=mapel"
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Buka Semua Mapel (38)</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Mata Pelajaran</th>
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Tingkat</th>
                <th className="py-3 px-4">Guru</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {MASTER_MATA_PELAJARAN.map((mp) => (
                <tr key={mp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-900">
                    {mp.nama}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60 font-semibold text-slate-700">
                      {mp.kode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    Kelas {mp.tingkat} • {mp.fase}
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-medium">
                    {mp.guruPengampuNama}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">
                    {mp.rombelTarget.join(', ')} ({mp.jpPerMinggu} JP)
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {mp.statusSk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. STATUS DATA AKADEMIK & AKTIVITAS TERBARU (2-COLUMN GRID) */}
      <div id="status-akademik" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri (6 Col): Status Data Akademik */}
        <div className="lg:col-span-6 bg-white border border-slate-200/60 rounded-xl shadow-sm p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Status Data Akademik
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px]">
              100% Valid
            </span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {STATUS_KESIAPAN_AKADEMIK.map((item, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs">
                      {item.kategori}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-100">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Integritas Basis Data: <strong>0 Anomali</strong></span>
            <Link 
              href="/admin/profil-struktur"
              className="text-blue-900 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Jalankan Audit Relasi</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Kolom Kanan (6 Col): Aktivitas Perubahan Data Operasional Terkini */}
        <div className="lg:col-span-6 bg-white border border-slate-200/60 rounded-xl shadow-sm p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <History size={18} className="text-blue-900" />
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Aktivitas Terbaru
              </h2>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Jejak Log Audit Administratif</span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {AKTIVITAS_OPERASIONAL_TERKINI.map((akt) => (
              <div key={akt.id} className="py-2.5 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-xs">{akt.judul}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                      {akt.kategori}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{akt.waktu}, {akt.jam}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {akt.deskripsi}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Pelaksana: {akt.pelaksana}</span>
                  {akt.noReferensi && <span className="font-mono text-slate-500">Ref: {akt.noReferensi}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan 5 aktivitas tercatat pekan ini</span>
            <span className="text-slate-400 text-[11px]">Audit Trail Aktif</span>
          </div>
        </div>

      </div>

    </div>
  );
}
