'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ChevronRight, 
  RefreshCw, 
  FileText, 
  Users, 
  BadgeCheck, 
  DoorOpen, 
  BookOpen, 
  CheckCircle2, 
  ClipboardCheck, 
  BookMarked,
  School,
  AlertCircle,
  PersonStanding,
  ArrowRight,
  ClipboardList,
  UserX,
  Terminal,
  Network,
  Palette,
  Car,
  Eye
} from 'lucide-react';

export default function KepsekDashboard() {
  return (
    <div className="w-full flex flex-col">
      {/* Sticky Academic Context & Read-Only Banner */}
      <div className="px-4 lg:px-8 py-3 bg-blue-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm border-b border-blue-100/50">
        <div className="flex items-center gap-3 text-blue-800">
          <ShieldCheck size={24} className="text-blue-700" />
          <div className="flex flex-col">
            <span className="font-body text-[11px] uppercase font-bold tracking-wider text-blue-700">Status Akses: Pemantauan Institusional</span>
            <p className="font-body text-xs text-slate-600">Mode Pemantauan Eksekutif: Seluruh data disajikan secara read-only untuk audit mutu akademik, evaluasi kurikulum, dan pengawasan manajerial.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-body text-[11px] font-semibold text-slate-700">Data Terkunci: Hak Akses Kepala Sekolah</span>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Page Context & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-body text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              <span>Beranda</span>
              <ChevronRight size={14} />
              <span className="text-blue-700 font-bold">Dashboard Eksekutif</span>
            </div>
            <h1 className="font-display text-2xl text-blue-900 font-bold tracking-tight">Ringkasan Kondisi Akademik & Pengawasan Sekolah</h1>
            <p className="font-body text-sm text-slate-600 max-w-3xl">Monitoring terpusat ketercapaian kurikulum, kepatuhan tugas, dan keaktifan kegiatan belajar mengajar TA 2026/2027 Semester Ganjil.</p>
          </div>
          
          {/* Top Quick Actions (Read-Only Operations) */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/60 rounded-lg text-slate-600">
              <RefreshCw size={16} className="text-green-600" />
              <div className="flex flex-col">
                <span className="font-body text-[11px] font-bold text-slate-800">Sinkronisasi Dapodik</span>
                <span className="font-body text-[10px] text-slate-500">Hari ini, 06.00 WIB</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg font-body text-sm font-medium hover:bg-blue-800 transition-all shadow-sm">
              <FileText size={18} />
              <span>Unduh Rekap Laporan Eksekutif (PDF)</span>
            </button>
          </div>
        </div>

        {/* Institutional Key Metric Cards (Row 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Siswa Aktif */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Populasi Siswa</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <Users size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl text-blue-900 tracking-tight font-bold">1,248 <span className="font-body text-sm font-normal text-slate-500">Siswa</span></div>
              <div className="flex items-center gap-1.5 text-green-700 font-body text-[11px] font-semibold">
                <CheckCircle2 size={14} />
                <span>100% Terdaftar Dapodik Kemdikbud</span>
              </div>
            </div>
            <div className="pt-2 bg-slate-50 p-2 rounded-lg flex justify-between items-center text-slate-600">
              <span className="font-body text-[11px]">Kehadiran Rata-rata</span>
              <span className="font-body text-xs font-bold text-slate-800">96.4%</span>
            </div>
          </div>

          {/* Total Guru */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Tenaga Pendidik</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <BadgeCheck size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl text-blue-900 tracking-tight font-bold">78 <span className="font-body text-sm font-normal text-slate-500">Guru & Staf</span></div>
              <div className="flex items-center gap-1.5 text-green-700 font-body text-[11px] font-semibold">
                <CheckCircle2 size={14} />
                <span>100% Terverifikasi NUPTK</span>
              </div>
            </div>
            <div className="pt-2 bg-slate-50 p-2 rounded-lg flex justify-between items-center text-slate-600">
              <span className="font-body text-[11px]">68 Produktif / Umum</span>
              <span className="font-body text-xs font-bold text-slate-800">10 BK & Laboran</span>
            </div>
          </div>

          {/* Rombel & Ruang */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Kapasitas Kelas</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <DoorOpen size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl text-blue-900 tracking-tight font-bold">36 <span className="font-body text-sm font-normal text-slate-500">Rombel</span></div>
              <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px]">
                <School size={14} />
                <span>Tingkat X, XI, XII SMK</span>
              </div>
            </div>
            <div className="pt-2 bg-slate-50 p-2 rounded-lg flex justify-between items-center text-slate-600">
              <span className="font-body text-[11px]">Konsentrasi</span>
              <span className="font-body text-xs font-bold text-slate-800">RPL • TKJ • DKV • TKR</span>
            </div>
          </div>

          {/* Mata Pelajaran */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Kurikulum Merdeka</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl text-blue-900 tracking-tight font-bold">54 <span className="font-body text-sm font-normal text-slate-500">Mapel Aktif</span></div>
              <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px]">
                <BookMarked size={14} />
                <span>Beban 48 JP / Minggu</span>
              </div>
            </div>
            <div className="pt-2 bg-slate-50 p-2 rounded-lg flex justify-between items-center text-slate-600">
              <span className="font-body text-[11px]">Struktur Beban Ajar</span>
              <span className="font-body text-xs font-bold text-green-700">Optimal Terjadwal</span>
            </div>
          </div>
        </div>

        {/* Academic Quality & Compliance Indicators (Row 2 Visual Bento) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Capaian Mutu Akademik */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Evaluasi Capaian</span>
                <h3 className="font-display text-lg text-blue-900 mt-1 font-bold">Rata-rata Capaian Mutu Akademik</h3>
                <p className="font-body text-sm text-slate-600 mt-1">Berdasarkan kompilasi nilai formatif & sumatif lintas rombel</p>
              </div>
              <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded text-blue-700 font-display text-lg font-bold">83.6 <span className="text-slate-400 font-body text-xs font-normal">/ 100</span></span>
            </div>
            
            {/* Inline Visual Gauge / Distribution */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-body text-[11px]">
                <span className="text-slate-500">KKM/KKTP Nasional: <strong className="text-slate-800">75.0</strong></span>
                <span className="text-green-700 font-semibold">92.4% Siswa Melampaui Target</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-blue-700 h-full" style={{ width: '83.6%' }}></div>
                <div className="bg-blue-100 h-full" style={{ width: '16.4%' }}></div>
              </div>
              <div className="flex justify-between text-slate-400 font-body text-[10px] pt-1">
                <span>0 (Bawah Kriteria)</span>
                <span>75 (Batas KKTP)</span>
                <span>100 (Sempurna)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <span className="font-body text-[10px] text-slate-500 block">Siswa Tuntas</span>
                <span className="font-display text-base text-green-700 font-bold">1,153</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <span className="font-body text-[10px] text-slate-500 block">Remedial/Review</span>
                <span className="font-display text-base text-amber-600 font-bold">95</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <span className="font-body text-[10px] text-slate-500 block">Standar Deviasi</span>
                <span className="font-display text-base text-slate-700 font-bold">± 4.2</span>
              </div>
            </div>
          </div>

          {/* Rasio & Kepatuhan Silabus/Tugas */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rasio Kepatuhan Tugas */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Kepatuhan Tugas</span>
                <ClipboardCheck size={18} className="text-blue-700" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-slate-900">87.2%</div>
                <p className="font-body text-xs text-slate-600 mt-1 leading-relaxed">14,280 dari 16,376 tugas dikumpulkan tepat waktu oleh siswa.</p>
              </div>
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-full rounded-full" style={{ width: '87.2%' }}></div>
                </div>
                <div className="flex justify-between font-body text-[11px] text-slate-500">
                  <span>Tertunda: 2,096</span>
                  <span className="text-green-700 font-semibold">Tepat Waktu</span>
                </div>
              </div>
            </div>

            {/* Keterlaksanaan Modul Ajar Silabus */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Keterlaksanaan Modul</span>
                <BookOpen size={18} className="text-blue-700" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-slate-900">78.5%</div>
                <p className="font-body text-xs text-slate-600 mt-1 leading-relaxed">Realisasi materi pengajaran per pekan ke-9 dari target 80%.</p>
              </div>
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '78.5%' }}></div>
                </div>
                <div className="flex justify-between font-body text-[11px] text-slate-500">
                  <span>Deviasi: -1.5%</span>
                  <span className="text-slate-700 font-semibold">Target 80% (Pkn 9)</span>
                </div>
              </div>
            </div>
            
            {/* Aktivitas KBM Hari Ini (Full width inside right column) */}
            <div className="sm:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center">
                  <School size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm text-blue-700 font-bold">97.8% KBM Berlangsung Aktif Hari Ini</span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <p className="font-body text-xs text-slate-600 mt-1">35 dari 36 Rombel melaksanakan sesi tatap muka teori & praktikum lab terjadwal.</p>
                </div>
              </div>
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-body text-[11px] text-slate-500">1 Rombel Penyesuaian</span>
                <span className="font-body text-xs text-slate-700 font-medium">XII DKV 1 (Prakerin Industri)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: PERLU PERHATIAN EKSEKUTIF (Alert Items) */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded bg-red-50 text-red-600">
                <AlertCircle size={20} />
              </div>
              <h2 className="font-display text-xl text-blue-900 font-bold uppercase tracking-tight">Perlu Perhatian Eksekutif</h2>
              <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full font-body text-[11px] font-bold">3 Temuan Audit</span>
            </div>
            <span className="font-body text-[11px] text-slate-500">Analisis anomali otomatisasi sistem LMS terhadap indikator keterlambatan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Alert 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4 hover:border-red-200 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-body text-[10px] font-bold">Kepatuhan Kritis</span>
                  <span className="font-body text-[10px] text-slate-400">Pekan ke-9</span>
                </div>
                <h4 className="font-display text-sm text-slate-900 font-bold leading-snug">Peringatan Kepatuhan Tugas Rombel XII RPL 2</h4>
                <p className="font-body text-xs text-slate-600 leading-relaxed">Tingkat pengumpulan tugas praktikum hanya 62.4%. Tugas 03 'Pemrograman Web Express.js' tertinggal 18 siswa.</p>
              </div>
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-body text-[11px]">
                  <PersonStanding size={14} />
                  <span>Guru: <strong className="text-slate-700">Budi Pratama, S.Kom.</strong></span>
                </div>
                <Link href="/kepsek/perlu-perhatian" className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-50 text-blue-700 rounded-lg font-body text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <span>Lihat Detail Audit Kelas</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4 hover:border-amber-200 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-body text-[10px] font-bold">Deviasi Silabus</span>
                  <span className="font-body text-[10px] text-slate-400">Pekan ke-9</span>
                </div>
                <h4 className="font-display text-sm text-slate-900 font-bold leading-snug">Keterlambatan Modul Silabus Basis Data XI RPL 1</h4>
                <p className="font-body text-xs text-slate-600 leading-relaxed">Modul Bab 03 'Normalisasi Basis Data Relasional' tertunda 1 pekan dari target kalender kurikulum sekolah.</p>
              </div>
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-body text-[11px]">
                  <PersonStanding size={14} />
                  <span>Guru: <strong className="text-slate-700">Siti Aulia, S.Kom.</strong></span>
                </div>
                <Link href="/kepsek/perlu-perhatian" className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-50 text-blue-700 rounded-lg font-body text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <span>Periksa Progres Silabus</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4 hover:border-red-200 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-body text-[10px] font-bold">At-Risk Akademik</span>
                  <span className="font-body text-[10px] text-slate-400">Lintas Rombel</span>
                </div>
                <h4 className="font-display text-sm text-slate-900 font-bold leading-snug">14 Siswa Teridentifikasi Berisiko Akademik Tinggi</h4>
                <p className="font-body text-xs text-slate-600 leading-relaxed">Memiliki &gt;3 tugas tertunggak dan presensi kehadiran &lt;85% pada lintas mata pelajaran produktif & adaptif.</p>
              </div>
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-body text-[11px]">
                  <ClipboardList size={14} />
                  <span>Perlu Rujukan: <strong className="text-slate-700">Guru BP/BK</strong></span>
                </div>
                <Link href="/kepsek/perlu-perhatian" className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-50 text-blue-700 rounded-lg font-body text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <span>Buka Rekap Siswa Perlu Bimbingan</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section: KOMPARASI & KONDISI AKADEMIK PER KONSENTRASI KEAHLIAN */}
        <div className="space-y-4 pt-4 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl text-blue-900 font-bold tracking-tight">Komparasi & Kondisi Akademik Per Konsentrasi Keahlian</h2>
              <p className="font-body text-sm text-slate-600 mt-1">Evaluasi menyeluruh ketuntasan silabus, rasio kepatuhan tugas, dan nilai rata-rata tiap rumpun jurusan.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body text-[11px] text-slate-500">Filter Tingkat:</span>
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-body text-[11px] font-semibold">Semua Kelas (X, XI, XII)</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-body text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <th className="py-4 px-6 font-semibold">Konsentrasi Keahlian</th>
                    <th className="py-4 px-4 text-center font-semibold">Jumlah Rombel</th>
                    <th className="py-4 px-4 font-semibold">Ketuntasan Silabus</th>
                    <th className="py-4 px-4 font-semibold">Pengumpulan Tugas</th>
                    <th className="py-4 px-4 text-right font-semibold">Rata-rata Nilai</th>
                    <th className="py-4 px-4 text-center font-semibold">Status Audit Mutu</th>
                    <th className="py-4 px-6 text-center font-semibold">Aksi Pantau</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-body text-sm">
                  {/* RPL */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                          <Terminal size={20} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-slate-900">Rekayasa Perangkat Lunak (RPL)</div>
                          <div className="font-body text-[11px] text-slate-500">Bidang Teknologi Informasi • 420 Siswa</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">12 Rombel</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">84.2%</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '84.2%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-700">91.0%</span>
                        <span className="font-body text-[11px] text-slate-400">(Tinggi)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-display text-lg font-bold">85.4</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">Prima</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link href="/kepsek/kondisi-akademik" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>

                  {/* TKJ */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                          <Network size={20} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-slate-900">Teknik Komputer & Jaringan (TKJ)</div>
                          <div className="font-body text-[11px] text-slate-500">Infrastruktur Jaringan & Cloud • 412 Siswa</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">12 Rombel</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">79.5%</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '79.5%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">86.4%</span>
                        <span className="font-body text-[11px] text-slate-400">(Normal)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-display text-lg font-bold">81.2</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">Normal</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link href="/kepsek/kondisi-akademik" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>

                  {/* DKV */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                          <Palette size={20} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-slate-900">Desain Komunikasi Visual (DKV)</div>
                          <div className="font-body text-[11px] text-slate-500">Seni Digital & Multimedia • 216 Siswa</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">6 Rombel</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">81.0%</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '81.0%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">88.5%</span>
                        <span className="font-body text-[11px] text-slate-400">(Normal)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-display text-lg font-bold">83.8</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">Normal</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link href="/kepsek/kondisi-akademik" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>

                  {/* TKR */}
                  <tr className="hover:bg-red-50/30 transition-colors group">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                          <Car size={20} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-slate-900">Teknik Kendaraan Ringan (TKR)</div>
                          <div className="font-body text-[11px] text-slate-500">Otomotif & Permesinan • 200 Siswa</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">6 Rombel</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-red-600">72.4%</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: '72.4%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-600">78.2%</span>
                        <span className="font-body text-[11px] text-red-500">(Rendah)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-display text-lg font-bold text-red-700">76.5</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">Perlu Review</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link href="/kepsek/kondisi-akademik" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
