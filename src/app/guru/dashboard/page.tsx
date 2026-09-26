'use client';

import React from 'react';
import { 
  Calendar, 
  ClipboardCheck, 
  Printer, 
  Clock, 
  CheckCircle, 
  Monitor, 
  ClipboardList, 
  Info, 
  ExternalLink, 
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  FileText,
  Send,
  DoorOpen,
  PieChart,
  Shield
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Selamat datang kembali, Pak Hendra</h1>
            <span className="font-body text-[13px] text-slate-500 font-medium">NIP. 19850412 201001 1 018</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-[13px] font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-slate-400" />
              Sabtu, 26 September 2026
            </span>
            <span className="text-slate-300">•</span>
            <span>Semester Ganjil TA 2026/2027</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">Minggu Efektif Ke-11</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-lg p-3">
            <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <ClipboardCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kurikulum Merdeka SMK</span>
              <span className="font-body text-sm font-medium text-slate-700 mt-0.5">
                Target Silabus: <span className="text-green-600 font-bold">68% Tercapai</span>
              </span>
            </div>
          </div>
          <button className="h-[66px] px-4 flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 rounded-lg text-slate-700 font-medium text-[13px] transition-colors shadow-sm">
            <Printer size={18} />
            <span>Jurnal Guru</span>
          </button>
        </div>
      </div>

      {/* 2. HARI INI: JADWAL & OPERASIONAL MENGAJAR */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-blue-700" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Hari Ini: Jadwal & Operasional Mengajar</h2>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">3 Sesi Terjadwal • Shift Pagi</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Item 1: Selesai */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between opacity-80">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle size={14} />
                  Telah Selesai
                </span>
                <span className="text-[13px] font-semibold text-slate-500 line-through">07.00 – 08.30 WIB</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">XII RPL 1</div>
                <h3 className="font-display text-[17px] font-bold text-slate-400 mt-1">Pemrograman Web</h3>
                <p className="flex items-center gap-1.5 text-[13px] text-slate-500 mt-2">
                  <Monitor size={15} />
                  Lab Komputer 2 (32/32 Hadir)
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-600 rounded-lg py-2 text-[13px] font-medium transition-colors">
                <ClipboardList size={16} />
                Lihat Presensi & Jurnal Kelas
              </button>
            </div>
          </div>

          {/* Item 2: Sedang Berlangsung */}
          <div className="bg-white border-2 border-blue-600 rounded-xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Sekarang (Berlangsung 35 mnt)
                </span>
                <span className="text-[13px] font-bold text-blue-700">08.45 – 10.15 WIB</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>XI RPL 2</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 capitalize">Sesi Teori & Praktik</span>
                </div>
                <h3 className="font-display text-[17px] font-bold text-slate-900 mt-1">Basis Data</h3>
                <p className="flex items-center gap-1.5 text-[13px] text-slate-700 mt-2 font-medium">
                  <DoorOpen size={15} className="text-blue-600" />
                  Ruang Teori 12 (34 Siswa)
                </p>
              </div>
              <div className="mt-2 bg-blue-50/50 p-2.5 rounded-lg flex items-start gap-2 text-[12px] text-blue-800 border border-blue-100">
                <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">Modul Aktif: Agregasi SQL (COUNT, SUM, AVG)</span>
              </div>
            </div>
            <div className="mt-5">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg py-2.5 text-[13px] font-semibold transition-colors shadow-sm">
                <ExternalLink size={16} />
                Masuk & Buka Kelas Sekarang
              </button>
            </div>
          </div>

          {/* Item 3: Berikutnya */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  <ArrowRight size={14} />
                  Berikutnya
                </span>
                <span className="text-[13px] font-semibold text-slate-700">10.30 – 12.00 WIB</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">XII RPL 2</div>
                <h3 className="font-display text-[17px] font-bold text-slate-900 mt-1">Pemrograman Web</h3>
                <p className="flex items-center gap-1.5 text-[13px] text-slate-600 mt-2">
                  <Monitor size={15} />
                  Lab Komputer 1 (33 Siswa)
                </p>
              </div>
              <div className="mt-2 bg-slate-50 p-2.5 rounded-lg text-[12px] text-slate-600 border border-slate-200/60 font-medium">
                Praktikum: Validasi Request & Token JWT
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg py-2 text-[13px] font-medium transition-colors">
                <FileText size={16} />
                Buka Rencana Sesi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PERLU TINDAKAN */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Perlu Tindakan (Action Items Prioritas)</h2>
          </div>
          <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">4 Item</span>
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Action 1 */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-4 lg:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ClipboardCheck size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[15px] font-semibold text-slate-900">12 tugas menunggu diperiksa</span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold">XII RPL 1</span>
                </div>
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                  Tugas: Implementasi REST API <span className="text-slate-300 mx-1">•</span> 
                  <span className="text-red-600 font-medium">Batas waktu pengumpulan ditutup kemarin (25 Sep, 23.59)</span>
                </p>
              </div>
            </div>
            <button className="shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg px-4 py-2 text-[13px] font-medium transition-colors shadow-sm">
              <ClipboardCheck size={16} />
              Periksa Berkas Siswa (12)
            </button>
          </div>

          {/* Action 2 */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-4 lg:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[15px] font-semibold text-slate-900">5 siswa belum mengumpulkan tugas</span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold">XI RPL 2</span>
                </div>
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                  Tugas: Normalisasi Database 3NF <span className="text-slate-300 mx-1">•</span> 
                  <span className="text-slate-700 font-medium">Tenggat: Hari ini 23.59 WIB (Tersisa 14 jam)</span>
                </p>
              </div>
            </div>
            <button className="shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors shadow-sm">
              <Send size={16} />
              Kirim Pengingat ke 5 Siswa
            </button>
          </div>
        </div>
      </div>

      {/* 4. KELAS YANG SAYA AJAR */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-blue-700" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Kelas yang Saya Ajar (Semester Ini)</h2>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">Total: 3 Rombel • 102 Siswa Binaan</span>
        </div>
        
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3 whitespace-nowrap">Mata Pelajaran & Rombel</th>
                  <th className="px-5 py-3 whitespace-nowrap">Total Siswa</th>
                  <th className="px-5 py-3 whitespace-nowrap">Jadwal Mingguan</th>
                  <th className="px-5 py-3 whitespace-nowrap w-[250px]">Ketercapaian Modul</th>
                  <th className="px-5 py-3 whitespace-nowrap text-center">Tugas Aktif</th>
                  <th className="px-5 py-3 whitespace-nowrap text-right">Aksi Operasional</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700 divide-y divide-slate-100">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-display text-[14px] font-semibold text-slate-900">Pemrograman Web</span>
                      <span className="text-[11px] text-slate-500 font-medium mt-0.5">XII RPL 1 • Konsentrasi Keahlian</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 font-mono">32</span> Siswa
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 text-[12px] text-slate-600">
                      <span>Senin (07.00 – 08.30)</span>
                      <span>Rabu (09.00 – 10.30)</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-medium">
                        <span className="text-slate-600">8 / 12 Topik</span>
                        <span className="text-blue-700 font-bold">67%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded text-[11px] font-bold">2 tugas</span>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                      <span>Buka Ruang Kelas</span>
                      <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-display text-[14px] font-semibold text-slate-900">Basis Data</span>
                      <span className="text-[11px] text-slate-500 font-medium mt-0.5">XI RPL 2 • Konsentrasi Keahlian</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 font-mono">34</span> Siswa
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 text-[12px] text-slate-600">
                      <span>Selasa (10.00 – 11.30)</span>
                      <span>Kamis (07.00 – 08.30)</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-medium">
                        <span className="text-slate-600">6 / 10 Topik</span>
                        <span className="text-blue-700 font-bold">60%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-bold">1 tugas</span>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors shadow-sm">
                      <span>Buka Ruang Kelas</span>
                      <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* 5. KETERCAPAIAN TARGET */}
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <PieChart size={20} className="text-green-600" />
            <h2 className="font-display text-[15px] font-semibold text-slate-900">Ketercapaian Target Kurikulum Sekolah</h2>
          </div>
          <div className="text-[12px] text-slate-500 font-medium">
            <span>Kriteria Kelulusan Minimal (KKM): <strong className="text-slate-700">75</strong></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">Tingkat XII RPL</span>
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[11px] font-bold">67% Target</span>
              </div>
              <h3 className="font-display text-[16px] font-bold text-slate-900 mt-1">Pemrograman Web</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Capaian: 8 dari 12 Topik Instruksional terlaksana. Sisa 4 topik terjadwal sebelum Ujian Sumatif Akhir Semester (SAS).
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500 font-medium">Realisasi Jam Pelajaran (JP)</span>
                <span className="font-bold text-slate-900">48 / 72 JP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">Tingkat XI RPL</span>
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[11px] font-bold">60% Target</span>
              </div>
              <h3 className="font-display text-[16px] font-bold text-slate-900 mt-1">Basis Data</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Capaian: 6 dari 10 Topik Instruksional terlaksana. Sesuai dengan roadmap silabus mingguan Kurikulum Merdeka.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500 font-medium">Realisasi Jam Pelajaran (JP)</span>
                <span className="font-bold text-slate-900">36 / 60 JP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-blue-700 shrink-0" />
            <span className="text-[13px] text-slate-600 font-medium">
              Laporan evaluasi silabus resmi akan dikirim otomatis ke Waka Kurikulum pada <strong className="text-slate-900">30 September 2026</strong>.
            </span>
          </div>
          <button className="shrink-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2 text-[12px] font-semibold transition-colors shadow-sm">
            Unduh Rekap Format Kemenristekbud
          </button>
        </div>
      </div>
    </div>
  );
}
