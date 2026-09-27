'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers,
  DoorOpen,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  FolderTree,
  ListChecks,
  Target,
  CheckCircle2,
  GitFork,
  Database,
  Building2,
  ChevronDown,
  ChevronRight,
  Download,
  CalendarCheck,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { 
  MASTER_KELAS, 
  MASTER_GURU, 
  MASTER_MATA_PELAJARAN, 
  STRUKTUR_KURIKULUM_RELASI,
  TAHUN_AJARAN_AKTIF
} from '@/lib/data/academic';

export default function ProfilStrukturDataPage() {
  const [expandedMapelId, setExpandedMapelId] = useState<string>('mp-rpl-pwpb-12');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      
      {/* 1. TOP ACADEMIC CONTEXT HEADER */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
            <span className="text-slate-300">/</span>
            <Link href="/admin/data-sekolah" className="hover:text-blue-900 transition-colors">Data Sekolah</Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-900 font-semibold">Profil & Struktur Relasi Data</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              Profil Struktur Data Sekolah
            </h1>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-600" />
              Single Source of Truth
            </span>
          </div>
          <p className="font-body text-[13px] text-slate-500 max-w-3xl leading-relaxed">
            Pemetaan menyeluruh arsitektur data satu sumber. Menggambarkan keterhubungan struktural antara Kelas (Rombel), Peserta Didik, Pendidik Pengampu, serta Silabus Kurikulum yang dialirkan secara terpadu ke seluruh peran di SIAKAD & LMS.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/data-sekolah"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-lg border border-slate-200 shadow-sm transition-colors"
          >
            <Building2 size={14} className="text-slate-500" />
            <span>Master Data Sekolah</span>
          </Link>
          <Link
            href="/kurikulum/struktur"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium text-xs rounded-lg shadow-sm transition-colors"
          >
            <FolderTree size={14} />
            <span>Lihat Struktur Kurikulum</span>
          </Link>
        </div>
      </div>

      {/* 2. KPI / DATA INTEGRITY SNAPSHOT MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
            <GitFork size={22} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kelas → Siswa</span>
            <span className="font-display text-lg font-bold text-slate-900 mt-0.5">24 Rombel • 864 Siswa</span>
            <span className="text-[10px] text-emerald-700 font-medium">100% Terpetakan</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Award size={22} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guru → Mapel → Kelas</span>
            <span className="font-display text-lg font-bold text-slate-900 mt-0.5">48 Guru • 38 Mapel</span>
            <span className="text-[10px] text-emerald-700 font-medium">SK Beban KBM Valid</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <FolderTree size={22} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kurikulum → Bab → Topik</span>
            <span className="font-display text-lg font-bold text-slate-900 mt-0.5">128 Bab • 384 Topik</span>
            <span className="text-[10px] text-purple-700 font-medium">Kurikulum Merdeka</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Integritas Entitas</span>
            <span className="font-display text-lg font-bold text-slate-900 mt-0.5">100% Sinkron</span>
            <span className="text-[10px] text-emerald-700 font-medium">0 Konflik Relasi</span>
          </div>
        </div>

      </div>

      {/* 3. RELASI 1: KELAS -> SISWA (HIERARKI KELEMBAGAAN & PENEMPATAN) */}
      <div id="hierarki-rombel" className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Hierarki Kelembagaan Rombongan Belajar & Penempatan Siswa
              </h2>
              <span className="text-[11px] text-slate-500">Relasi: Konsentrasi Keahlian → Tingkat (Fase) → Kelas / Rombel → Siswa & Wali Kelas</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded">
            TA {TAHUN_AJARAN_AKTIF.tahun} • {TAHUN_AJARAN_AKTIF.semester}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-6">
          
          {/* JURUSAN 1: REKAYASA PERANGKAT LUNAK */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/70 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-blue-900 text-white text-[11px] font-bold rounded">
                  RPL
                </span>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">
                    Rekayasa Perangkat Lunak (Pengembangan Perangkat Lunak & Gim)
                  </h3>
                  <span className="text-[11px] text-slate-500">Kode Program: 072 • 6 Rombel Aktif • 216 Peserta Didik</span>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded self-start sm:self-auto">
                Kapasitas Penuh (96.5%)
              </span>
            </div>

            {/* Tingkat XII RPL */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                Tingkat XII (Fase F - Tingkat Akhir)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MASTER_KELAS.filter(k => k.jurusanSingkat === 'RPL' && k.tingkat === 'XII').map(kls => (
                  <div key={kls.id} className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs hover:border-blue-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DoorOpen size={16} className="text-blue-900" />
                        <span className="font-bold text-slate-900 text-sm">{kls.nama}</span>
                        <span className="font-mono text-[10px] text-slate-400">({kls.kode})</span>
                      </div>
                      <span className="text-[11px] font-bold font-mono text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                        {kls.terisi}/{kls.kapasitas} Siswa
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 flex flex-col gap-0.5">
                      <div>Wali Kelas: <strong className="text-slate-800">{kls.waliKelas}</strong></div>
                      <div className="text-[11px] text-slate-500">{kls.ruangFisik}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tingkat XI RPL */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Tingkat XI (Fase F - Pendalaman Keahlian)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MASTER_KELAS.filter(k => k.jurusanSingkat === 'RPL' && k.tingkat === 'XI').map(kls => (
                  <div key={kls.id} className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs hover:border-indigo-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DoorOpen size={16} className="text-indigo-800" />
                        <span className="font-bold text-slate-900 text-sm">{kls.nama}</span>
                        <span className="font-mono text-[10px] text-slate-400">({kls.kode})</span>
                      </div>
                      <span className="text-[11px] font-bold font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                        {kls.terisi}/{kls.kapasitas} Siswa
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 flex flex-col gap-0.5">
                      <div>Wali Kelas: <strong className="text-slate-800">{kls.waliKelas}</strong></div>
                      <div className="text-[11px] text-slate-500">{kls.ruangFisik}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tingkat X PPLG */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Tingkat X (Fase E - Fondasi Kejuruan)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MASTER_KELAS.filter(k => k.jurusanSingkat === 'RPL' && k.tingkat === 'X').map(kls => (
                  <div key={kls.id} className="bg-white border border-slate-200/80 rounded-lg p-3.5 shadow-2xs hover:border-emerald-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DoorOpen size={16} className="text-emerald-800" />
                        <span className="font-bold text-slate-900 text-sm">{kls.nama}</span>
                        <span className="font-mono text-[10px] text-slate-400">({kls.kode})</span>
                      </div>
                      <span className="text-[11px] font-bold font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                        {kls.terisi}/{kls.kapasitas} Siswa
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 flex flex-col gap-0.5">
                      <div>Wali Kelas: <strong className="text-slate-800">{kls.waliKelas}</strong></div>
                      <div className="text-[11px] text-slate-500">{kls.ruangFisik}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* JURUSAN 2 & 3: TJKT & DKV RINGKAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* TJKT */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-teal-800 text-white text-[10px] font-bold rounded">TJKT</span>
                  <h4 className="font-semibold text-xs text-slate-900">Teknik Komputer & Jaringan</h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">71 Siswa (2 Kelas)</span>
              </div>
              <div className="flex flex-col gap-2">
                {MASTER_KELAS.filter(k => k.jurusanSingkat === 'TJKT').map(kls => (
                  <div key={kls.id} className="bg-white border border-slate-200 rounded p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block">{kls.nama}</strong>
                      <span className="text-[10px] text-slate-500">Wali: {kls.waliKelas}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {kls.terisi}/{kls.kapasitas}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DKV */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-rose-800 text-white text-[10px] font-bold rounded">DKV</span>
                  <h4 className="font-semibold text-xs text-slate-900">Desain Komunikasi Visual</h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">36 Siswa (1 Kelas)</span>
              </div>
              <div className="flex flex-col gap-2">
                {MASTER_KELAS.filter(k => k.jurusanSingkat === 'DKV').map(kls => (
                  <div key={kls.id} className="bg-white border border-slate-200 rounded p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block">{kls.nama}</strong>
                      <span className="text-[10px] text-slate-500">Wali: {kls.waliKelas}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {kls.terisi}/{kls.kapasitas}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. RELASI 2: GURU -> MATA PELAJARAN -> KELAS (MATRIKS PENUGASAN AKADEMIK) */}
      <div id="matriks-pengampu" className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Matriks Penugasan Akademik Tenaga Pendidik (SK Beban Mengajar)
              </h2>
              <span className="text-[11px] text-slate-500">Relasi: Guru (NIP) → Kode Kurikulum Mata Pelajaran → Beban Jam (JP) → Target Rombel KBM</span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500">SK No. 800/104/SMK.01/2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Pendidik Pengampu (NIP)</th>
                <th className="py-3 px-4">Mata Pelajaran & Kode</th>
                <th className="py-3 px-4">Tingkat</th>
                <th className="py-3 px-4">Target Rombel KBM</th>
                <th className="py-3 px-4">Beban Alokasi</th>
                <th className="py-3 px-5 text-right">Status Relasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {MASTER_GURU.map((guru) => {
                const mapel = MASTER_MATA_PELAJARAN.find(m => m.guruPengampuNama === guru.nama);
                return (
                  <tr key={guru.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {guru.inisial}
                        </span>
                        <div>
                          <strong className="text-slate-900 block">{guru.nama}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">NIP: {guru.nip}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{guru.mapelUtama}</span>
                        <span className="font-mono text-[10px] text-slate-500">{mapel?.kode || 'MP-RPL-1201'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {mapel?.tingkat ? `Kelas ${mapel.tingkat} (${mapel.fase})` : 'Kelas XII'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {guru.rombelDiampu.map((r, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200/60 rounded font-mono text-[10px] font-semibold text-slate-700">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-100">
                        {guru.totalJp} JP / Pekan
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <CheckCircle2 size={11} />
                        Tervalidasi SK
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RELASI 3: KURIKULUM -> MAPEL -> BAB -> TOPIK -> CP (PENYELARASAN SUMBER DATA) */}
      <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-slate-900">
                Penyelarasan Satu Sumber Data dengan Tim Kurikulum & LMS
              </h2>
              <span className="text-[11px] text-slate-500">Relasi: Kurikulum Merdeka → Mata Pelajaran → Bab (Modul) → Topik Pembelajaran → Capaian Pembelajaran (CP)</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded">
            Pipeline: ACTIVE_STREAM
          </span>
        </div>

        <div className="p-5 flex flex-col gap-6">
          
          {/* Informative Value Stream Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-3.5 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">01 • Hulu Master Data</span>
              <h4 className="font-bold text-slate-900 text-xs">Admin Operasional</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Mendaftarkan Master Kelas (XII RPL 1), kuota siswa, serta menetapkan Budi Pratama sebagai Pengampu Mapel.
              </p>
            </div>

            <div className="border border-indigo-200 bg-indigo-50/40 rounded-xl p-3.5 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">02 • Baku Kurikulum</span>
              <h4 className="font-bold text-slate-900 text-xs">Tim Kurikulum</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Menyusun Silabus Nasional, struktur 12 Bab, 48 Topik, dan 6 Capaian Pembelajaran resmi.
              </p>
            </div>

            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-3.5 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">03 • Hilir Pelaksanaan</span>
              <h4 className="font-bold text-slate-900 text-xs">Guru & Siswa LMS</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Guru menerbitkan modul & tugas praktikum; siswa mengerjakan tugas dan nilai langsung direkap otomatis.
              </p>
            </div>

            <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-3.5 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">04 • Audit Eksekutif</span>
              <h4 className="font-bold text-slate-900 text-xs">Kepala Sekolah</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Memantau kondisi ketercapaian KBM, isu ketuntasan tugas, dan rekapitulasi nilai secara transparan.
              </p>
            </div>

          </div>

          {/* Rincian Struktur Bab, Topik, CP untuk Mata Pelajaran Inti */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Eksplorasi Hierarki Silabus Kurikulum:
            </h3>

            <div className="flex flex-col gap-2">
              {STRUKTUR_KURIKULUM_RELASI.map((str) => {
                const isExpanded = expandedMapelId === str.mapelId;
                return (
                  <div key={str.mapelId} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                    
                    <button
                      type="button"
                      onClick={() => setExpandedMapelId(isExpanded ? '' : str.mapelId)}
                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? <ChevronDown size={16} className="text-blue-900" /> : <ChevronRight size={16} className="text-slate-400" />}
                        <div>
                          <strong className="text-slate-900 text-xs block">{str.mapelNama}</strong>
                          <span className="text-[10px] font-mono text-slate-500">
                            {str.mapelKode} • Tingkat {str.tingkat} ({str.fase}) • {str.jurusanSingkat}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                          <FolderTree size={13} className="text-slate-400" />
                          <span>{str.totalBab} Bab</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                          <ListChecks size={13} className="text-slate-400" />
                          <span>{str.totalTopik} Topik</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          <Target size={13} className="text-emerald-600" />
                          <span>{str.totalCp} CP</span>
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-slate-200 flex flex-col gap-4">
                        
                        {/* Capaian Pembelajaran (CP) */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Target size={14} className="text-emerald-600" />
                            Capaian Pembelajaran (CP) Resmi:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {str.cpList.map((cp, idx) => (
                              <div key={idx} className="bg-slate-50 border border-slate-200/70 p-2.5 rounded text-[11px] text-slate-700">
                                {cp}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Modul & Topik */}
                        <div className="flex flex-col gap-2 mt-1">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <FolderTree size={14} className="text-blue-900" />
                            Rincian Bab (Modul) & Topik Pembelajaran:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {str.babList.map((bab) => (
                              <div key={bab.nomor} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 flex flex-col gap-2">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                                  <span className="font-bold text-xs text-blue-900">Bab 0{bab.nomor}</span>
                                  <span className="text-[10px] font-mono text-slate-500">{bab.totalTopik} Topik</span>
                                </div>
                                <span className="font-semibold text-xs text-slate-900 leading-snug">
                                  {bab.judul}
                                </span>
                                <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-1">
                                  {bab.topikList.map((topik, i) => (
                                    <li key={i}>{topik}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
