'use client';

import React from 'react';
import { 
  ChevronRight, 
  Printer, 
  ShieldAlert, 
  School,
  TrendingUp,
  BookOpen,
  ClipboardList,
  MessageSquareCheck,
  Laptop,
  Megaphone,
  Filter,
  Eye,
  FileBox,
  BarChart,
  Search,
  BadgeAlert,
  BellRing
} from 'lucide-react';

export default function AktivitasPembelajaranPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* Breadcrumb & Top Actions */}
      <div className="w-full bg-white px-4 lg:px-8 py-3 shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-[11px] text-slate-500 font-semibold tracking-wider uppercase flex-wrap">
            <span className="hover:text-blue-700 cursor-pointer transition-colors">Beranda</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="hover:text-blue-700 cursor-pointer transition-colors">Monitoring Akademik</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-blue-700 font-bold">Aktivitas Pembelajaran</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-body text-[11px]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sinkronisasi Dapodik: 3 Menit Lalu
            </span>
            <div className="hidden md:block w-px h-4 bg-slate-200"></div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors font-body text-xs font-semibold">
              <Printer size={16} className="text-blue-600" />
              Cetak BAP Log
            </button>
          </div>
        </div>
      </div>

      {/* Operational Advisory Banner */}
      <div className="w-full bg-blue-50/50 px-4 lg:px-8 py-3 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldAlert size={18} />
            </div>
            <p className="font-body text-xs text-slate-700 leading-relaxed">
              <strong className="text-blue-800 mr-1">Log Pemantauan Aktivitas KBM:</strong>
              Rekapitulasi transaksi operasional pembelajaran, publikasi materi, penugasan, dan penilaian oleh dewan guru secara real-time. Mode Audit Eksekutif aktif (Read-Only).
            </p>
          </div>
          <span className="hidden lg:inline-block font-body text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shrink-0 uppercase tracking-wider">
            SK Dirjen Vokasi No. 44/2026
          </span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Title & Executive Overview Card */}
        <div className="relative bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                <School size={14} />
                SMK Negeri / Swasta Kejuruan Unggulan
              </div>
              <h1 className="font-display text-3xl text-slate-900 font-bold tracking-tight">
                Aktivitas Pembelajaran & Kedisiplinan KBM
              </h1>
              <p className="font-body text-sm text-slate-600">
                Audit kronologis dan analitik kepatuhan pengajaran guru serta responsivitas siswa dalam ekosistem LMS SMK Nusantara.
              </p>
            </div>
            
            {/* Mini Visual Widget: Total Indeks Kepatuhan */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
              <div className="relative flex items-center justify-center w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                  <path className="text-green-600 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="96, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-lg text-slate-900 font-bold">96%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] uppercase font-bold text-slate-500 tracking-wider">Indeks Kepatuhan Guru</span>
                <span className="font-body text-sm text-slate-800 font-bold">Target SPM: 90%</span>
                <span className="font-body text-[11px] text-green-700 font-semibold flex items-center gap-1 mt-0.5">
                  <TrendingUp size={12} /> Sesuai Silabus Kemendikbud
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Activity Metric Counters (5 Grid items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><BookOpen size={18} /></span>
              <span className="font-body text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">+89 Baru</span>
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="font-display text-2xl font-bold text-slate-900">412</div>
              <div className="font-body text-xs text-blue-700 font-bold">Materi & Modul Ajar</div>
              <div className="font-body text-[11px] text-slate-500">Bulan ini dipublikasikan</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><ClipboardList size={18} /></span>
              <span className="font-body text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">94.8%</span>
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="font-display text-2xl font-bold text-slate-900">286</div>
              <div className="font-body text-xs text-blue-700 font-bold">Tugas Praktikum</div>
              <div className="font-body text-[11px] text-slate-500">Tuntas rubrik penilaian</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><MessageSquareCheck size={18} /></span>
              <span className="font-body text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">Rerata 2.4 hr</span>
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="font-display text-2xl font-bold text-slate-900">13,840</div>
              <div className="font-body text-xs text-blue-700 font-bold">Koreksi Tugas Guru</div>
              <div className="font-body text-[11px] text-slate-500">Pengumpulan diperiksa</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><Laptop size={18} /></span>
              <span className="font-body text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">98.7% Hadir</span>
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="font-display text-2xl font-bold text-slate-900">74</div>
              <div className="font-body text-xs text-blue-700 font-bold">Asesmen CBT Berjalan</div>
              <div className="font-body text-[11px] text-slate-500">Sesi Quiz & STS aktif</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><Megaphone size={18} /></span>
              <span className="font-body text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">Resmi</span>
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="font-display text-2xl font-bold text-slate-900">158</div>
              <div className="font-body text-xs text-blue-700 font-bold">Warta & Pengumuman</div>
              <div className="font-body text-[11px] text-slate-500">Rilis kelas & bengkel</div>
            </div>
          </div>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-blue-700" />
              <span className="font-display text-base font-bold text-slate-900">Penyaring & Filter Aktivitas</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-[11px] text-slate-500">Menampilkan 120 dari 1,842 transaksi KBM pekan ini</span>
              <button className="font-body text-xs text-blue-700 hover:underline font-semibold">Reset Filter</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-[11px] font-bold text-slate-600">Kategori Aktivitas</label>
              <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-slate-800 font-body text-xs rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="Semua">Semua Kategori</option>
                <option value="Publikasi">Publikasi Materi & Modul</option>
                <option value="Penugasan">Penugasan & Praktikum</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[11px] font-bold text-slate-600">Dewan Guru / Pendidik</label>
              <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-slate-800 font-body text-xs rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="">Semua Guru & Instruktur</option>
                <option value="budi">Budi Pratama, S.Kom. (RPL)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[11px] font-bold text-slate-600">Rombongan Belajar</label>
              <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-slate-800 font-body text-xs rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="">Semua Rombel & Jurusan</option>
                <option value="XII RPL 1">XII RPL 1</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-[11px] font-bold text-slate-600">Rentang Waktu</label>
              <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-slate-800 font-body text-xs rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer">
                <option value="7">7 Hari Terakhir</option>
                <option value="30">Bulan Berjalan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-10">
          
          {/* Left Column: Chronological Audit Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
                <h2 className="font-display text-lg text-slate-900 font-bold">Feed Audit Aktivitas Pembelajaran Real-Time</h2>
              </div>
              <span className="font-body text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-semibold">Diurutkan Waktu Terkini</span>
            </div>

            <div className="space-y-4">
              {/* Entry 1 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 border-l-4 border-l-green-500 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                      <MessageSquareCheck size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">Penilaian Tugas</span>
                        <span className="font-body text-[10px] text-slate-500">• 2 jam yang lalu</span>
                        <span className="font-body text-[10px] text-slate-700 font-bold px-2 py-0.5 rounded bg-slate-100">XII RPL 1</span>
                      </div>
                      <h3 className="font-display text-sm text-slate-900 font-bold">Budi Pratama, S.Kom. menyelesaikan penilaian 34 berkas praktikum</h3>
                      <p className="font-body text-xs text-slate-600 leading-relaxed">
                        Modul pengujian: <strong className="text-slate-800">'Tugas 02: Logika Percabangan & ES6 Syntax'</strong>. Seluruh 34 siswa telah menerima feedback rubrik koding. Rerata perolehan nilai kelas: <span className="font-bold text-green-700 bg-green-50 px-1 py-0.5 rounded">88.4 / 100</span>.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-700 font-body text-[11px] font-bold transition-colors">
                    <Eye size={14} /> Audit Berkas
                  </button>
                </div>
              </div>

              {/* Entry 2 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 border-l-4 border-l-blue-600 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <FileBox size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase tracking-wider">Publikasi Materi</span>
                        <span className="font-body text-[10px] text-slate-500">• Hari ini, 08.15 WIB</span>
                        <span className="font-body text-[10px] text-slate-700 font-bold px-2 py-0.5 rounded bg-slate-100">XI RPL 1</span>
                      </div>
                      <h3 className="font-display text-sm text-slate-900 font-bold">Siti Aulia, S.Kom. menerbitkan materi ajar terstruktur</h3>
                      <p className="font-body text-xs text-slate-600 leading-relaxed">
                        Modul diunggah: <strong className="text-slate-800">'Modul 04: Normalisasi Basis Data 3NF'</strong>. Modul dilengkapi 1 file presentasi interaktif dan repositori GitHub starter database SQL. Target kompetensi kejuruan: Desain Skema ERD.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-700 font-body text-[11px] font-bold transition-colors">
                    <BookOpen size={14} /> Inspeksi Silabus
                  </button>
                </div>
              </div>

              {/* Entry 3 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                      <Laptop size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wider">Pelaksanaan Asesmen</span>
                        <span className="font-body text-[10px] text-slate-500">• Kemarin, 14.10 WIB</span>
                        <span className="font-body text-[10px] text-slate-700 font-bold px-2 py-0.5 rounded bg-slate-100">XII RPL 1</span>
                      </div>
                      <h3 className="font-display text-sm text-slate-900 font-bold">CBT Engine mencatat penyelesaian evaluasi formatif daring</h3>
                      <p className="font-body text-xs text-slate-600 leading-relaxed">
                        Sesi Ujian: <strong className="text-slate-800">'Quiz Formatif: Pemahaman Asinkron JavaScript'</strong>. 34 dari 34 siswa hadir tepat waktu. Rerata ketuntasan kelas mencapai <span className="font-bold text-blue-700">88%</span> (31 tuntas KKM, 3 peserta terjadwal pengayaan singkat).
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-700 font-body text-[11px] font-bold transition-colors">
                    <BarChart size={14} /> Lihat Rekap CBT
                  </button>
                </div>
              </div>

              {/* Entry 4: Peringatan */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-red-200 border-l-4 border-l-red-600 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <BadgeAlert size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 uppercase tracking-wider">Peringatan Kepatuhan</span>
                        <span className="font-body text-[10px] text-slate-500">• 2 hari lalu</span>
                        <span className="font-body text-[10px] text-red-700 font-bold px-2 py-0.5 rounded bg-red-50 border border-red-100">XI TKJ 2</span>
                      </div>
                      <h3 className="font-display text-sm text-red-700 font-bold">Anomali Pengumpulan Tugas Praktikum Melewati Tenggat</h3>
                      <p className="font-body text-xs text-slate-600 leading-relaxed">
                        Sistem mendeteksi <strong className="text-slate-800">'Tugas 01: Konfigurasi Routing MikroTik'</strong> memiliki <span className="text-red-600 font-bold">11 siswa belum mengumpulkan</span> melewati batas waktu yang ditentukan oleh guru pengampu. Disarankan konfirmasi ke wali kelas XI TKJ 2.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-body text-[11px] font-bold transition-colors">
                    <Search size={14} /> Periksa Rombel
                  </button>
                </div>
              </div>

              {/* Entry 5: Pengumuman */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 border-l-4 border-l-amber-400 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Megaphone size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 uppercase tracking-wider">Pengumuman Lab</span>
                        <span className="font-body text-[10px] text-slate-500">• 28 Sep 2026, 08.30 WIB</span>
                        <span className="font-body text-[10px] text-slate-700 font-bold px-2 py-0.5 rounded bg-slate-100">XII RPL 1</span>
                      </div>
                      <h3 className="font-display text-sm text-slate-900 font-bold">Instruksi Penyesuaian Jadwal Lab Software Komputer</h3>
                      <p className="font-body text-xs text-slate-600 leading-relaxed">
                        Budi Pratama, S.Kom. merilis warta: <strong className="text-slate-800">'Perubahan Jam Praktikum Lab & Persiapan Simulasi UKK REST API Postman'</strong>. Siswa diinstruksikan membawa laptop terkonfigurasi Node.js LTS.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-700 font-body text-[11px] font-bold transition-colors">
                    <Eye size={14} /> Tinjau Warta
                  </button>
                </div>
              </div>

              {/* Feed Pagination Footer */}
              <div className="p-3 bg-white rounded-xl flex items-center justify-between shadow-sm border border-slate-200/60">
                <span className="font-body text-[11px] text-slate-500">Menampilkan 5 aktivitas terbaru</span>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 font-body text-[11px] font-bold">Sebelumnya</button>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-700 text-white font-body text-[11px] font-bold">1</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 font-body text-[11px] font-bold">2</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 font-body text-[11px] font-bold">Berikutnya</button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Comparative Teacher Discipline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-base text-slate-900 font-bold">Kepatuhan Guru Mengajar & Memeriksa</h2>
                  <p className="font-body text-[11px] text-slate-500 mt-1">Evaluasi silabus per semester & respon koreksi</p>
                </div>
                <BellRing size={18} className="text-slate-400" />
              </div>

              <div className="space-y-3">
                {/* Guru 1 */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-3 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-sm text-slate-900 font-bold">Budi Pratama, S.Kom.</div>
                      <div className="font-body text-[10px] text-blue-700 font-bold">Pemrograman Web & Perangkat Bergerak</div>
                    </div>
                    <span className="font-body text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">A+ (Sangat Disiplin)</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-body text-[10px] text-slate-500 mb-1">
                        <span>Ketepatan Silabus Modul</span>
                        <strong className="text-slate-800">100%</strong>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-body text-[10px] text-slate-500 mb-1">
                        <span>Kepatuhan Koreksi Tugas</span>
                        <strong className="text-slate-800">98%</strong>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guru 2 */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-3 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-sm text-slate-900 font-bold">Siti Aulia, S.Kom.</div>
                      <div className="font-body text-[10px] text-blue-700 font-bold">Basis Data Relasional & SQL</div>
                    </div>
                    <span className="font-body text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">B+ (Baik)</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-body text-[10px] text-slate-500 mb-1">
                        <span>Ketepatan Silabus Modul</span>
                        <strong className="text-slate-800">92%</strong>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-body text-[10px] text-slate-500 mb-1">
                        <span>Kepatuhan Koreksi Tugas</span>
                        <strong className="text-slate-800">85%</strong>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <button className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-blue-700 font-body text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-slate-200/60">
                <span>Lihat Seluruh Dewan Guru (54 Pendidik)</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
