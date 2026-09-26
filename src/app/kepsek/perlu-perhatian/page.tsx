'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ShieldAlert, 
  Verified, 
  AlertTriangle,
  BarChart2,
  CheckSquare,
  Users,
  Monitor,
  Calendar,
  Eye,
  Send,
  ListTodo,
  FileEdit,
  Building,
  BookOpen,
  History,
  Info,
  BadgeAlert,
  CalendarClock
} from 'lucide-react';

export default function PerluPerhatianPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* Breadcrumb & Command Band */}
      <div className="w-full bg-white px-4 lg:px-8 py-4 shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-body text-[11px] text-slate-500 font-semibold tracking-wider uppercase flex-wrap">
              <span className="hover:text-blue-700 cursor-pointer transition-colors">Beranda</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="hover:text-blue-700 cursor-pointer transition-colors">Monitoring Akademik</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-blue-700 font-bold">Perlu Perhatian</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
              <h1 className="font-display text-2xl text-slate-900 font-bold tracking-tight">Pusat Perhatian & Mitigasi Risiko Akademik</h1>
            </div>
            <p className="font-body text-sm text-slate-600 max-w-4xl mt-1">
              Identifikasi anomali KBM, ketertinggalan silabus, rendahnya kepatuhan tugas, dan siswa berisiko akademik untuk tindakan pembinaan dini secara faktual.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/60 shrink-0">
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status Validasi</span>
              <span className="font-display text-sm text-blue-700 font-bold flex items-center gap-1 mt-0.5">
                <Verified size={16} className="text-green-600" />
                Sinkron 08:30 WIB
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Indeks Kerentanan</span>
              <span className="font-display text-sm text-red-600 font-bold flex items-center gap-1 mt-0.5">
                4 Prioritas Terbuka
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Statutory Notice Banner */}
      <div className="w-full bg-blue-50/50 px-4 lg:px-8 py-3 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldAlert size={18} className="text-blue-700 shrink-0" />
            <p className="font-body text-xs leading-snug">
              <strong className="font-bold text-blue-800">Tampilan Instrumen Pengawasan Manajerial:</strong> Tampilan ini merupakan instrumen pengawasan manajerial. Kepala Sekolah dapat meneruskan temuan audit ke Wakil Kepala Bidang Kurikulum atau Guru BP/BK.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 font-body text-[11px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 whitespace-nowrap">
            No. Regulasi: PERMENDIKBUDRISTEK No. 47/2023
          </div>
        </div>
      </div>

      {/* Main Content Layout Area */}
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Executive Metric Snapshot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Isu Terdeteksi</span>
              <BarChart2 size={18} className="text-blue-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-slate-900">8</span>
              <span className="font-body text-xs text-slate-500 font-bold">anomali aktif</span>
            </div>
            <div className="mt-1 font-body text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600"></span> 4 membutuhkan supervisi
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] text-slate-500 uppercase tracking-wider font-bold">Tingkat Retensi Tugas</span>
              <CheckSquare size={18} className="text-blue-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-slate-900">88.2%</span>
              <span className="font-body text-xs text-red-600 font-bold">▼ -4.1%</span>
            </div>
            <div className="mt-1 font-body text-[11px] text-slate-600 font-medium">
              Rombel kejuruan RPL terendah
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] text-slate-500 uppercase tracking-wider font-bold">Siswa Butuh Intervensi</span>
              <Users size={18} className="text-red-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-red-600">14</span>
              <span className="font-body text-xs text-slate-500 font-bold">siswa kritis</span>
            </div>
            <div className="mt-1 font-body text-[11px] text-slate-600 font-medium">
              Presensi &lt;85% & tunggakan tugas
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] text-slate-500 uppercase tracking-wider font-bold">Kapasitas Fasilitas Lab</span>
              <Monitor size={18} className="text-green-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-slate-900">98.0%</span>
              <span className="font-body text-xs text-slate-600 font-bold">Batas Optimal</span>
            </div>
            <div className="mt-1 font-body text-[11px] text-slate-600 font-medium">
              Lab Komputer 2 kritis tabrakan jam
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-body text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'all' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>Semua Isu Terdeteksi</span>
              <span className={`${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'} px-1.5 py-0.5 rounded text-[10px]`}>8</span>
            </button>
            <button 
              onClick={() => setActiveTab('siswa')}
              className={`px-3 py-1.5 rounded-lg font-body text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'siswa' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>Siswa Berisiko</span>
              <span className={`${activeTab === 'siswa' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'} px-1.5 py-0.5 rounded text-[10px]`}>3</span>
            </button>
            <button 
              onClick={() => setActiveTab('guru')}
              className={`px-3 py-1.5 rounded-lg font-body text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'guru' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>Dewan Guru & Silabus</span>
              <span className={`${activeTab === 'guru' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'} px-1.5 py-0.5 rounded text-[10px]`}>2</span>
            </button>
            <button 
              onClick={() => setActiveTab('rombel')}
              className={`px-3 py-1.5 rounded-lg font-body text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'rombel' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>Rombongan Belajar</span>
              <span className={`${activeTab === 'rombel' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'} px-1.5 py-0.5 rounded text-[10px]`}>2</span>
            </button>
            <button 
              onClick={() => setActiveTab('sarana')}
              className={`px-3 py-1.5 rounded-lg font-body text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'sarana' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>Kurikulum & Sarana Lab</span>
              <span className={`${activeTab === 'sarana' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'} px-1.5 py-0.5 rounded text-[10px]`}>1</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 px-2 shrink-0">
            <span className="font-body text-[11px] font-bold text-slate-500 mr-1">Tingkat Keparahan:</span>
            <span className="bg-red-100 text-red-700 font-body text-[10px] font-bold px-2 py-0.5 rounded">Tinggi</span>
            <span className="bg-amber-100 text-amber-700 font-body text-[10px] font-bold px-2 py-0.5 rounded">Sedang</span>
            <span className="bg-slate-100 text-slate-600 font-body text-[10px] font-bold px-2 py-0.5 rounded">Rendah</span>
          </div>
        </div>

        {/* Main Grid: Attention Cards and Disposition Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-10">
          
          {/* Left Pane (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Card 1: Kategori Siswa - Prioritas Tinggi */}
            {(activeTab === 'all' || activeTab === 'siswa') && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-red-700 uppercase tracking-wider">
                    <BadgeAlert size={16} />
                    Prioritas Tinggi • Kategori: Siswa Berisiko Akademik
                  </div>
                  <span className="font-mono text-[10px] text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold">ID: RSK-2026-SIS-091</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-lg text-slate-900 font-bold">
                        14 Siswa Memiliki Tunggakan &gt;3 Tugas & Presensi di Bawah 85%
                      </h2>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 text-red-700 border border-red-100 font-body text-[10px] font-bold uppercase">
                        Peringatan Drop-Out
                      </span>
                    </div>
                    <p className="font-body text-sm text-slate-600 leading-relaxed">
                      Kombinasi ketidakhadiran berkepanjangan dan tunggakan penilaian sumatif formatif melebihi ambang batas toleransi kurikulum kompetensi keahlian.
                    </p>
                  </div>
                  
                  {/* Factual Student Sampling Table */}
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-500">Sampel Kasus Kritis (Deteksi Awal):</span>
                      <span className="font-body text-[11px] text-blue-700 font-bold">Total 14 Terverifikasi</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white border border-slate-200/60 p-3 rounded-lg shadow-sm flex items-center justify-between">
                        <div>
                          <div className="font-display text-sm text-slate-900 font-bold">Dimas Wahyu Pratama</div>
                          <div className="font-body text-[10px] text-slate-500 font-semibold mt-0.5">NIS: 2408102 • Kelas XII TKJ 1</div>
                        </div>
                        <div className="text-right">
                          <span className="font-body text-[10px] text-red-600 font-bold block bg-red-50 px-1.5 py-0.5 rounded mb-0.5 inline-block">4 Tugas Bolong</span>
                          <span className="font-body text-[11px] text-slate-600 font-semibold block">Presensi: 81.2%</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200/60 p-3 rounded-lg shadow-sm flex items-center justify-between">
                        <div>
                          <div className="font-display text-sm text-slate-900 font-bold">Aditya Pratama</div>
                          <div className="font-body text-[10px] text-slate-500 font-semibold mt-0.5">NIS: 2409204 • Kelas XI RPL 2</div>
                        </div>
                        <div className="text-right">
                          <span className="font-body text-[10px] text-red-600 font-bold block bg-red-50 px-1.5 py-0.5 rounded mb-0.5 inline-block">3 Tugas Bolong</span>
                          <span className="font-body text-[11px] text-red-600 font-bold block">Presensi: 78.0%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                    <div className="space-y-1.5">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dampak Akademik Nyata</span>
                      <p className="font-body text-xs text-slate-700 leading-relaxed font-medium">
                        Terancam tidak memenuhi kriteria kenaikan fase (Fase F) / syarat kelulusan e-Rapor Kurikulum Merdeka serta pembatalan penempatan PKL Industri.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tindakan Rekomendasi Sistem</span>
                      <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-blue-800 font-body text-xs font-semibold flex items-start gap-2">
                        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Rujuk segera ke Guru Bimbingan Konseling (BK) dan Wali Kelas untuk penerbitan surat panggilan wali murid tahap pertama.</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px] font-bold">
                      <Calendar size={14} /> Terdeteksi sejak 3 hari lalu
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5">
                        <Eye size={14} /> Lihat Daftar Lengkap
                      </button>
                      <button className="px-3 py-1.5 bg-blue-700 text-white hover:bg-blue-800 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm">
                        <Send size={14} /> Disposisikan ke Tim BK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Kategori Rombel - Prioritas Sedang */}
            {(activeTab === 'all' || activeTab === 'rombel') && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <ListTodo size={16} />
                    Prioritas Sedang • Kategori: Rombongan Belajar (Kelas)
                  </div>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">ID: RSK-2026-RMB-014</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-lg text-slate-900 font-bold">
                        Tingkat Kepatuhan Pengumpulan Tugas Rendah — Rombel XII RPL 2
                      </h2>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-100 font-body text-[10px] font-bold uppercase">
                        62.4% Submisi
                      </span>
                    </div>
                    <p className="font-body text-sm text-slate-600 leading-relaxed">
                      Sebanyak 18 dari 34 siswa belum mengumpulkan <em className="font-semibold text-slate-800">Tugas 03 Pemrograman Web (REST API Express.js)</em> yang telah jatuh tempo 48 jam yang lalu.
                    </p>
                  </div>

                  <div className="space-y-2 py-2">
                    <div className="flex justify-between font-body text-xs font-bold">
                      <span className="text-slate-800">Progres Submisi Rombel (16 Selesai / 18 Tertunggak)</span>
                      <span className="text-red-600">62.4% Kepatuhan</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-blue-600 h-full" style={{ width: '47%' }}></div>
                      <div className="bg-red-500 h-full" style={{ width: '53%' }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-lg">
                    <div className="space-y-1.5">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Akar Masalah Teridentifikasi</span>
                      <p className="font-body text-xs text-slate-700 leading-relaxed font-medium">
                        Kendala kompatibilitas dependensi lingkungan development <code>Node.js v20 LTS</code> dan runtime NPM di komputer pribadi/laptop rumah siswa.
                      </p>
                      <div className="pt-2 text-slate-500 font-body text-[11px] font-semibold space-y-0.5">
                        <div><strong className="text-slate-700">Guru Pengampu:</strong> Budi Pratama, S.Kom.</div>
                        <div><strong className="text-slate-700">Wali Kelas:</strong> Drs. Bambang Sutrisno</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tindakan Rekomendasi Sistem</span>
                      <div className="bg-white border border-slate-200/60 shadow-sm p-3 rounded-lg text-slate-800 font-body text-xs font-semibold flex items-start gap-2">
                        <CheckSquare size={16} className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Delegasikan ke Waka Kurikulum untuk koordinasi jam klinik praktikum tambahan mandiri di Lab Komputer 1 pada sore hari.</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px] font-bold">
                      <CalendarClock size={14} /> Tenggat Waktu: 26 Feb 2026, 23:59 WIB
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5">
                        <ListTodo size={14} /> Daftar Tertunggak
                      </button>
                      <button className="px-3 py-1.5 bg-blue-700 text-white hover:bg-blue-800 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm">
                        <FileEdit size={14} /> Kirim Supervisi ke Guru
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Sarana */}
            {(activeTab === 'all' || activeTab === 'sarana') && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <Building size={16} />
                    Prioritas Sedang • Kategori: Kurikulum & Sarana Lab
                  </div>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">ID: RSK-2026-FAS-005</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-lg text-slate-900 font-bold">
                        Pemanfaatan Kapasitas Lab Komputer 2 Mencapai Batas Maksimum
                      </h2>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-100 font-body text-[10px] font-bold uppercase">
                        98% Utilisasi
                      </span>
                    </div>
                    <p className="font-body text-sm text-slate-600 leading-relaxed">
                      Utilisasi ruang praktikum mencapai 42 Jam Pelajaran (JP) terpakai dari 48 JP kapasitas efektif per pekan, menyebabkan penjadwalan praktikum kejuruan bentrok antar-rombel TKJ dan RPL.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between font-body text-[10px] font-bold">
                      <span className="text-slate-500 uppercase tracking-wider">Distribusi Jam Laboratorium (Senin - Sabtu):</span>
                      <span className="text-red-600">Sisa Kuota: 6 JP Fleksibel</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2 text-center font-body text-[10px]">
                      <div className="bg-blue-700 text-white py-1.5 rounded-md font-bold shadow-sm">Senin (8/8 JP)</div>
                      <div className="bg-blue-700 text-white py-1.5 rounded-md font-bold shadow-sm">Selasa (8/8 JP)</div>
                      <div className="bg-blue-700 text-white py-1.5 rounded-md font-bold shadow-sm">Rabu (8/8 JP)</div>
                      <div className="bg-blue-700 text-white py-1.5 rounded-md font-bold shadow-sm">Kamis (8/8 JP)</div>
                      <div className="bg-blue-600 text-white py-1.5 rounded-md font-bold shadow-sm">Jumat (6/8 JP)</div>
                      <div className="bg-slate-200 text-slate-600 py-1.5 rounded-md font-bold shadow-sm">Sabtu (4/8 JP)</div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px] font-bold">
                      <Building size={14} /> Lokasi: Gedung B Kejuruan, Lantai 2
                    </div>
                    <button className="px-3 py-1.5 bg-blue-700 text-white hover:bg-blue-800 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm">
                      <Calendar size={14} /> Tinjau Roster Lab
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Card 4: Kategori Guru & Silabus */}
            {(activeTab === 'all' || activeTab === 'guru') && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <BookOpen size={16} />
                    Prioritas Rendah • Kategori: Ketercapaian Kurikulum Guru
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded font-bold">ID: RSK-2026-KUR-042</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-lg text-slate-900 font-bold">
                        Keterlambatan Progres Silabus — Basis Data XI RPL 1
                      </h2>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-body text-[10px] font-bold uppercase">
                        Deviasi -9%
                      </span>
                    </div>
                    <p className="font-body text-sm text-slate-600 leading-relaxed">
                      Progres materi berjalan 66% berbanding target kalender akademik 75% pada pekan ke-8 berjalan. Terdapat ketertinggalan 1 topik kunci: <strong className="text-slate-800">Normalisasi Transaksi 3NF & Skema Relasi</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-lg">
                    <div className="space-y-2">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Catatan Guru Pengampu</span>
                      <div className="bg-white border border-slate-200/60 p-3 rounded font-body text-xs text-slate-800 italic shadow-sm">
                        “Alokasi 2 tatap muka sebelumnya tersita untuk kegiatan remedial intensif asesmen formatif SQL DDL/DML karena 45% siswa belum mencapai KKTP minimum.”
                      </div>
                      <div className="text-slate-600 font-body text-[11px] font-semibold pt-1">
                        Guru Pengampu: Siti Aulia, S.Kom. • NIP. 19840912 201101 2 018
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="font-body text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tindakan Rekomendasi Sistem</span>
                      <p className="font-body text-xs text-slate-800 font-medium leading-relaxed bg-white border border-slate-200/60 p-3 rounded shadow-sm">
                        Penyesuaian modul pembelajaran asynchronous melalui LMS atau penggabungan materi Normalisasi langsung ke modul studi kasus projek sistem kasir.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500 font-body text-[11px] font-bold">
                      <BookOpen size={14} /> Capaian Pembelajaran: Elemen 3 - Pemodelan Data
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5">
                        <BookOpen size={14} /> Tinjau Rencana Belajar
                      </button>
                      <button className="px-3 py-1.5 bg-blue-700 text-white hover:bg-blue-800 rounded-lg font-body text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm">
                        <Send size={14} /> Teruskan ke Waka Kurikulum
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>

          {/* Right Pane: Audit Disposition Trail (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History size={20} className="text-blue-700" />
                  <h3 className="font-display text-base text-slate-900 font-bold">Buku Disposisi Pengawasan</h3>
                </div>
                <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">Arsip Audit</span>
              </div>
              <p className="font-body text-xs text-slate-500 font-medium leading-relaxed">
                Rekam jejak instruksi tindak lanjut manajerial Kepala Sekolah kepada para Wakil Kepala Sekolah dan Koordinator Program Keahlian.
              </p>

              {/* Timeline Entries */}
              <div className="space-y-5 pt-2 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
                
                {/* Log Item 1 */}
                <div className="relative pl-6 space-y-1">
                  <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                  <div className="flex items-center justify-between font-body text-[10px] font-bold">
                    <span className="text-green-700 uppercase tracking-wider">Telah Ditindaklanjuti</span>
                    <span className="text-slate-400">Kemarin, 14:15 WIB</span>
                  </div>
                  <div className="font-display text-sm text-slate-900 font-bold leading-tight">
                    Disposisi Audit Presensi Kelas XII TKJ
                  </div>
                  <div className="font-body text-xs text-slate-600 leading-relaxed pb-1">
                    Instruksi dari <strong className="text-slate-800">Drs. H. Wardoyo, M.Pd.</strong> kepada <em className="text-slate-800">Waka Kesiswaan (M. Taufiq, S.Pd.)</em> untuk pemanggilan 4 wali murid.
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg font-body text-[11px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-slate-800">Respons Waka Kesiswaan:</strong> “Konseling kelompok telah dijadwalkan Kamis pagi pukul 09.00 di Ruang BK.”
                  </div>
                </div>

                {/* Log Item 2 */}
                <div className="relative pl-6 space-y-1">
                  <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                  <div className="flex items-center justify-between font-body text-[10px] font-bold">
                    <span className="text-blue-700 uppercase tracking-wider">Dalam Proses Penelaahan</span>
                    <span className="text-slate-400">24 Feb 2026</span>
                  </div>
                  <div className="font-display text-sm text-slate-900 font-bold leading-tight">
                    Sinkronisasi Bobot Asesmen Kurikulum Merdeka
                  </div>
                  <div className="font-body text-xs text-slate-600 leading-relaxed">
                    Diteruskan ke <em className="text-slate-800">Waka Kurikulum</em> terkait deviasi format asesmen sumatif lingkup materi di Jurusan RPL.
                  </div>
                </div>

                {/* Log Item 3 */}
                <div className="relative pl-6 space-y-1">
                  <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100"></div>
                  <div className="flex items-center justify-between font-body text-[10px] font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Selesai Berita Acara</span>
                    <span className="text-slate-400">19 Feb 2026</span>
                  </div>
                  <div className="font-display text-sm text-slate-900 font-bold leading-tight">
                    Penataan Jadwal Ulang Lab Komputer Jaringan
                  </div>
                  <div className="font-body text-xs text-slate-600 leading-relaxed">
                    Penerbitan SK rotasi penggunaan bengkel simulator jaringan Mikrotik bersama Kepala Bengkel TKJ.
                  </div>
                </div>

              </div>

              {/* Fast Action */}
              <div className="pt-3 border-t border-slate-100">
                <button className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-body text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <FileEdit size={16} /> Buat Disposisi Pengawasan Baru
                </button>
              </div>
            </div>

            {/* Ministerial Alignment Reference Box */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <BookOpen size={18} />
                <span className="font-display text-sm font-bold">Kriteria Ketuntasan Minimal</span>
              </div>
              <p className="font-body text-[11px] text-slate-600 leading-relaxed font-medium">
                Berdasarkan Keputusan BSKAP No. 033/H/KR/2024, evaluasi ketertinggalan siswa vokasi SMK dititikberatkan pada uji unjuk kerja kompetensi teknis sebelum pelaksanaan Asesmen Akhir Semester.
              </p>
              <div className="pt-2 divide-y divide-slate-200">
                <div className="flex items-center justify-between py-2 font-body text-[10px] text-slate-700">
                  <span className="font-bold">Batas Presensi KBM Tatap Muka:</span>
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-1.5 py-0.5 rounded">85.0%</span>
                </div>
                <div className="flex items-center justify-between py-2 font-body text-[10px] text-slate-700">
                  <span className="font-bold">Kepatuhan Portofolio Kejuruan:</span>
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-1.5 py-0.5 rounded">≥ 75% Portofolio</span>
                </div>
                <div className="flex items-center justify-between py-2 font-body text-[10px] text-slate-700">
                  <span className="font-bold">Toleransi Deviasi Kalender Silabus:</span>
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-1.5 py-0.5 rounded">Maks. 2 Pekan KBM</span>
                </div>
              </div>
            </div>

            {/* Direct Phone/Hotline Intervensi BK */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm space-y-2">
              <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Kanal Cepat Koordinasi BK</span>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="font-display text-sm text-slate-900 font-bold">Dra. Hj. Nurjanah (Koord. BK)</div>
                  <div className="font-body text-[11px] text-slate-500 font-semibold mt-0.5">Piket Ruang Konseling 1</div>
                </div>
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-body text-[10px] font-bold">Tersedia</span>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
