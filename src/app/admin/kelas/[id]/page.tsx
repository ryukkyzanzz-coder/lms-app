'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, Award, BookOpen, Calendar, Info, 
  ChevronRight, Edit, Download, Verified, CheckCircle2,
  Terminal, ShieldCheck, UserPlus
} from 'lucide-react';
import { MASTER_KELAS, MASTER_SISWA_SAMPEL, Kelas } from '@/lib/data/academic';

export default function DetailKelasPage() {
  const params = useParams();
  const router = useRouter();
  const kelasId = params.id as string;
  const [activeTab, setActiveTab] = useState<'info' | 'siswa' | 'guru_mapel' | 'jadwal'>('siswa');

  const kelas = MASTER_KELAS.find(k => k.id === kelasId);

  if (!kelas) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Kelas tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/kelas')} className="mt-4 text-blue-700 font-medium">
          Kembali ke Daftar Kelas
        </button>
      </div>
    );
  }

  const siswaKelas = MASTER_SISWA_SAMPEL.filter(s => s.kelasId === kelasId);
  const percentage = Math.round((kelas.terisi / kelas.kapasitas) * 100);

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/kelas" className="hover:text-blue-900 transition-colors">Kelas</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">{kelas.nama}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{kelas.nama}</h1>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {kelas.status}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <Terminal size={15} className="text-blue-700" />
                <span>{kelas.jurusan}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Award size={15} className="text-blue-700" />
                <span>Tingkat: Kelas {kelas.tingkat} (Fase {kelas.fase})</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar size={15} className="text-blue-700" />
                <span>TA 2026/2027 Ganjil</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col w-full">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Kapasitas & Keterisian</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">{kelas.terisi}</span>
                <span className="text-sm text-slate-500">/ {kelas.kapasitas} Siswa</span>
              </div>
              <div className="flex items-center gap-2 mt-2 w-full max-w-[140px]">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${percentage === 100 ? 'bg-emerald-600' : 'bg-blue-700'}`} style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="text-[11px] font-bold text-blue-700">{percentage}%</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Wali Kelas</span>
              <div className="flex flex-col mt-1">
                <span className="font-display text-lg text-slate-900 font-bold leading-tight">{kelas.waliKelas}</span>
                <span className="text-xs text-slate-500 font-mono mt-0.5">NIP {kelas.waliKelasNip}</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1.5">
                <CheckCircle2 size={13} />
                SK Menjabat
              </span>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
              <Award size={24} />
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Mata Pelajaran</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl text-slate-900 font-bold">12</span>
                <span className="text-sm text-slate-500 font-medium">Mapel</span>
              </div>
              <span className="text-[11px] text-blue-700 font-bold mt-1">42 JP / Minggu</span>
            </div>
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl shrink-0 border border-slate-100">
              <BookOpen size={24} />
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Kurikulum & Status</span>
              <div className="mt-1">
                <span className="font-display text-lg text-emerald-700 font-bold leading-tight">100% Selaras</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 font-medium">Sinkron Portal Guru & Siswa</span>
              <span className="text-[10px] text-slate-400 font-mono mt-1">DAPODIK REV-40.26</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl shrink-0">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-1.5 flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'info' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Info size={18} />
            <span>INFORMASI ROMBEL</span>
          </button>
          <button 
            onClick={() => setActiveTab('siswa')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'siswa' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users size={18} />
            <span>DAFTAR SISWA ({kelas.terisi})</span>
          </button>
          <button 
            onClick={() => setActiveTab('guru_mapel')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'guru_mapel' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award size={18} />
            <span>GURU & MATA PELAJARAN</span>
          </button>
          <button 
            onClick={() => setActiveTab('jadwal')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'jadwal' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar size={18} />
            <span>JADWAL PELAJARAN</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {activeTab === 'siswa' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Daftar Siswa Kelas</h3>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1">
                    <Download size={14} />
                    Unduh Absensi
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">NISN</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-4">L/P</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                      {siswaKelas.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                            Belum ada siswa di kelas ini.
                          </td>
                        </tr>
                      ) : (
                        siswaKelas.map((s, idx) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 text-slate-400 font-medium">{idx + 1}</td>
                            <td className="py-3 px-4 font-mono text-slate-600">{s.nisn}</td>
                            <td className="py-3 px-4 font-semibold text-slate-900">{s.nama}</td>
                            <td className="py-3 px-4">{s.jenisKelamin}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4">Informasi Lengkap Rombongan Belajar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Kode Rombel</span>
                    <span className="font-semibold text-slate-900">{kelas.kode}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Fase Kurikulum</span>
                    <span className="font-semibold text-slate-900">Fase {kelas.fase}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Ruang Kelas Fisik</span>
                    <span className="font-semibold text-slate-900">{kelas.ruangFisik}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Wali Kelas</span>
                    <span className="font-semibold text-slate-900">{kelas.waliKelas}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">SK Penetapan Wali Kelas</span>
                    <span className="font-semibold text-blue-700">421.3/045/SK/2026</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Kapasitas Maksimal</span>
                    <span className="font-semibold text-slate-900">{kelas.kapasitas} Siswa</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guru_mapel' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Guru Pengampu Mata Pelajaran</h3>
                </div>
                <div className="p-8 text-center text-slate-500 text-sm">
                  Daftar guru pengampu belum di-assign untuk kelas ini. 
                  (Mengambil data dari Master Mata Pelajaran).
                </div>
              </div>
            )}

            {activeTab === 'jadwal' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Jadwal Mata Pelajaran</h3>
                </div>
                <div className="p-8 text-center text-slate-500 text-sm">
                  Jadwal kelas belum tersedia.
                </div>
              </div>
            )}
            
          </div>

          {/* Right Sidebar Widget */}
          <div className="lg:col-span-4 flex flex-col gap-4">

            
            <div className="bg-slate-800 rounded-xl shadow-sm p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Verified size={20} className="text-blue-400" />
                <h3 className="font-bold text-sm">Status Sinkronisasi</h3>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Data rombel ini telah berhasil dikirim ke server pusat Dapodik tanpa ada galat validasi.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-3 flex flex-col gap-1.5 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Sync:</span>
                  <span className="text-emerald-400">2026-07-15 08:30:12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Checksum:</span>
                  <span className="text-slate-300">a8b9f1...c4d2</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
