'use client';

import React from 'react';
import { 
  ChevronRight, 
  Calendar, 
  Activity, 
  ShieldCheck, 
  RefreshCw,
  FileText,
  Table,
  BookOpen,
  ClipboardCheck,
  Star,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

export default function KondisiAkademikPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Breadcrumb & Top Info */}
      <div className="w-full bg-white px-4 lg:px-8 py-3 shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-[11px] text-slate-500 font-semibold tracking-wider uppercase flex-wrap">
            <span className="hover:text-blue-700 cursor-pointer transition-colors">Beranda</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="hover:text-blue-700 cursor-pointer transition-colors">Monitoring Akademik</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-blue-700 font-bold">Kondisi Akademik</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-blue-700">
              <Calendar size={14} />
              <span className="font-body text-[11px] font-bold">Semester Ganjil 2026/2027</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-body text-[11px] font-bold uppercase tracking-wider">Audit Berjalan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Warning / Audit Context Box */}
        <div className="bg-blue-50/50 rounded-xl p-4 flex items-start gap-4 shadow-sm border border-blue-100/50">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-display text-base font-bold text-blue-900">Mode Audit Akademik Kepala Sekolah</span>
              <span className="bg-white border border-blue-200 text-blue-700 font-body text-[10px] font-bold px-2 py-0.5 rounded-full">Hak Akses: Pengawasan & Penjaminan Mutu</span>
            </div>
            <p className="font-body text-xs text-slate-600">
              Analisis komprehensif ketercapaian standar kompetensi lulusan dan performa KBM per rombongan belajar. Data disajikan secara <strong className="text-slate-800 font-semibold">read-only</strong> tersinkronisasi otomatis dari buku nilai guru & log presensi harian.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end text-right shrink-0">
            <span className="font-body text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sinkronisasi Terakhir</span>
            <span className="font-body text-xs text-slate-700 font-semibold flex items-center gap-1.5 mt-0.5">
              <RefreshCw size={14} className="text-green-600" />
              Hari ini, 09:42 WIB
            </span>
          </div>
        </div>

        {/* Page Title & Export Actions */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <h1 className="font-display text-2xl text-slate-900 font-bold tracking-tight">Monitoring Detail Kondisi Akademik Sekolah</h1>
            <p className="font-body text-sm text-slate-600">
              Evaluasi matriks ketercapaian silabus, kepatuhan tugas, keaktifan ujian CBT, dan rerata capaian belajar semester ganjil TA 2026/2027.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-body text-sm font-semibold shadow-sm transition-all">
              <FileText size={18} className="text-blue-600" />
              <span>Unduh Rekap Eksekutif</span>
            </button>
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-body text-sm font-semibold shadow-sm transition-all">
              <Table size={18} />
              <span>Ekspor Laporan Audit (Excel/PDF)</span>
            </button>
          </div>
        </div>

        {/* Key Aggregate Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Ketercapaian Modul</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-slate-900 font-bold">78.4%</span>
              <span className="font-body text-[11px] text-green-700 font-bold flex items-center">
                <Activity size={12} className="mr-0.5" />+4.2% vs target
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '78.4%' }}></div>
            </div>
            <span className="font-body text-xs text-slate-500 block">182 dari 232 modul ajar tuntas diujikan</span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Kepatuhan Pengumpulan</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <ClipboardCheck size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-slate-900 font-bold">89.6%</span>
              <span className="font-body text-[11px] text-green-700 font-bold flex items-center">
                <CheckCircle2 size={12} className="mr-0.5" />Sangat Baik
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full rounded-full" style={{ width: '89.6%' }}></div>
            </div>
            <span className="font-body text-xs text-slate-500 block">2,410 tugas dikumpulkan tepat waktu</span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Rerata Nilai Sekolah</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Star size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-slate-900 font-bold">86.2</span>
              <span className="font-body text-[10px] bg-slate-100 text-blue-700 font-bold px-2 py-0.5 rounded">KKTP: 75.0</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '86.2%' }}></div>
            </div>
            <span className="font-body text-xs text-slate-500 block">Predikat agregat B+ (Tuntas Mandiri)</span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-red-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase font-bold text-slate-500 tracking-wider">Atensi Intervensi KBM</span>
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-red-600 font-bold">4 Rombel</span>
              <span className="font-body text-[11px] text-red-600 font-bold">Prioritas Supervisi</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full rounded-full" style={{ width: '14%' }}></div>
            </div>
            <span className="font-body text-xs text-slate-500 block">Silabus &lt;65% dan kepatuhan tugas &lt;70%</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="space-y-1.5">
              <label className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tahun Ajaran</label>
              <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-slate-800 font-body text-xs focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="2026/2027 (Ganjil)">2026/2027 (Ganjil)</option>
                <option value="2025/2026 (Genap)">2025/2026 (Genap)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tingkat Kelas</label>
              <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-slate-800 font-body text-xs focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="Semua">Semua Tingkat</option>
                <option value="XII">Tingkat XII (Fase F - Lanjutan)</option>
                <option value="XI">Tingkat XI (Fase F)</option>
                <option value="X">Tingkat X (Fase E)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Konsentrasi Keahlian</label>
              <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-slate-800 font-body text-xs focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                <option value="TKR">Teknik Kendaraan Ringan (TKR)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status Ketuntasan</label>
              <select className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-slate-800 font-body text-xs focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="all">Semua Status Capaian</option>
                <option value="high">Melampaui Target (&gt;85)</option>
                <option value="normal">Sesuai Target (75 - 85)</option>
                <option value="low">Perlu Remedial / Intervensi (&lt;75)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pencarian Mapel</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="w-full h-9 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-body text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-500" 
                  placeholder="Cari mapel, guru..." 
                  defaultValue="RPL"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="font-body text-[11px] text-slate-500 flex items-center gap-1">
              Menampilkan matriks audit terpadu: <strong className="text-blue-700">6 Rombongan Belajar Terpilih</strong> • Berdasarkan Kurikulum Merdeka SMK
            </div>
            <button className="text-blue-700 hover:underline font-body text-[11px] font-bold flex items-center gap-1">
              <RefreshCw size={12} /> Reset Filter ke Standar
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">Matriks Monitoring Rombongan Belajar & Mata Pelajaran</h2>
              <p className="font-body text-xs text-slate-500">Klik tautan baris untuk membuka audit drill-down analitik di panel inspeksi.</p>
            </div>
            <span className="font-body text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">Tingkat XII RPL • 6 Kelas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-body text-[10px] uppercase tracking-wider font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Rombel</th>
                  <th className="py-3 px-4">Mata Pelajaran & Pengampu</th>
                  <th className="py-3 px-4">Silabus</th>
                  <th className="py-3 px-4">Kepatuhan Tugas</th>
                  <th className="py-3 px-4">CBT / Kuis</th>
                  <th className="py-3 px-4 text-center">Rerata</th>
                  <th className="py-3 px-4">Keaktifan</th>
                  <th className="py-3 px-4 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-body text-xs text-slate-700">
                
                {/* Row 1 */}
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-blue-800 block text-sm">XII RPL 1</span>
                    <span className="text-[10px] text-slate-500">Lab Rekayasa 01</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-900 block">Pemrograman Web & Bergerak</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <UserCheck size={12} className="text-slate-400" /> Budi Pratama, S.Kom.
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top min-w-[130px]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold">8/12 Modul</span>
                        <span className="text-blue-700 font-bold">67%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '67%' }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400">Sesuai timeline pekan ke-11</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-green-700 text-sm">94.2%</span>
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-bold">Tepat Waktu</span>
                    </div>
                    <span className="text-[10px] text-slate-500">32 Tepat • 2 Terlambat</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block">2 Selesai</span>
                    <span className="text-[10px] text-slate-500">1 Terjadwal (CBT-03)</span>
                  </td>
                  <td className="py-3 px-4 align-top text-center">
                    <span className="font-display font-bold text-slate-900 text-base block">88.0</span>
                    <span className="text-[10px] text-green-700 font-bold block">[A] Tuntas</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">34/34 Aktif</span>
                    <span className="text-[9px] text-slate-500 block mt-1">Presensi 97.8%</span>
                  </td>
                  <td className="py-3 px-4 align-top text-right">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-[10px] font-bold transition-colors">
                      Detail <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block text-sm">XII RPL 2</span>
                    <span className="text-[10px] text-slate-500">Lab Rekayasa 02</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-900 block">Basis Data & Pemodelan Lanjut</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <UserCheck size={12} className="text-slate-400" /> Siti Aulia, S.Kom.
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top min-w-[130px]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold">6/9 Modul</span>
                        <span className="text-blue-700 font-bold">66%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '66%' }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400">Sesuai timeline pekan ke-11</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-blue-700 text-sm">88.5%</span>
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] font-bold">Baik</span>
                    </div>
                    <span className="text-[10px] text-slate-500">29 Tepat • 4 Terlambat</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block">3 Selesai</span>
                    <span className="text-[10px] text-slate-500">0 Terjadwal</span>
                  </td>
                  <td className="py-3 px-4 align-top text-center">
                    <span className="font-display font-bold text-slate-900 text-base block">85.0</span>
                    <span className="text-[10px] text-green-700 font-bold block">[B+] Tuntas</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">33/33 Aktif</span>
                    <span className="text-[9px] text-slate-500 block mt-1">Presensi 95.1%</span>
                  </td>
                  <td className="py-3 px-4 align-top text-right">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded text-[10px] font-bold transition-colors">
                      Detail <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>

                {/* Row 3 - ERROR / WARNING */}
                <tr className="bg-red-50/30 hover:bg-red-50/60 transition-colors">
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center gap-1">
                      <AlertCircle size={14} className="text-red-600" />
                      <span className="font-bold text-red-700 block text-sm">XII RPL 3</span>
                    </div>
                    <span className="text-[10px] text-red-600 font-bold">Perlu Supervisi</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-900 block">PBO & Arsitektur Java Enterprise</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <UserCheck size={12} className="text-slate-400" /> Drs. Hendra Setiawan
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top min-w-[130px]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-red-700">4/10 Modul</span>
                        <span className="text-red-600 font-bold">40%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-[9px] text-red-500 font-bold">Tertinggal 2 modul ajar</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-red-600 text-sm">62.4%</span>
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-bold">Rendah</span>
                    </div>
                    <span className="text-[10px] text-red-500">18 Tepat • 12 Belum Kumpul</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block">1 Selesai</span>
                    <span className="text-[10px] text-red-600 font-bold">1 Tertunda (Overdue)</span>
                  </td>
                  <td className="py-3 px-4 align-top text-center">
                    <span className="font-display font-bold text-red-700 text-base block">72.4</span>
                    <span className="text-[10px] text-red-600 font-bold block">[C] Di Bawah KKTP</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">30/34 Aktif</span>
                    <span className="text-[9px] text-red-500 font-bold block mt-1">4 Siswa Presensi &lt;75%</span>
                  </td>
                  <td className="py-3 px-4 align-top text-right">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-[10px] font-bold transition-colors">
                      Detail <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block text-sm">XI RPL 1</span>
                    <span className="text-[10px] text-slate-500">Lab Rekayasa 03</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-900 block">Pemodelan Perangkat Lunak & UML</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <UserCheck size={12} className="text-slate-400" /> Rian Hidayat, S.Pd.
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top min-w-[130px]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold">7/10 Modul</span>
                        <span className="text-blue-700 font-bold">70%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400">Sesuai timeline pekan ke-11</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-green-700 text-sm">91.0%</span>
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-bold">Tinggi</span>
                    </div>
                    <span className="text-[10px] text-slate-500">31 Tepat • 3 Terlambat</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="font-bold text-slate-800 block">2 Selesai</span>
                    <span className="text-[10px] text-slate-500">1 Terjadwal</span>
                  </td>
                  <td className="py-3 px-4 align-top text-center">
                    <span className="font-display font-bold text-slate-900 text-base block">86.5</span>
                    <span className="text-[10px] text-green-700 font-bold block">[A-] Tuntas</span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">34/34 Aktif</span>
                    <span className="text-[9px] text-slate-500 block mt-1">Presensi 98.2%</span>
                  </td>
                  <td className="py-3 px-4 align-top text-right">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded text-[10px] font-bold transition-colors">
                      Detail <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
