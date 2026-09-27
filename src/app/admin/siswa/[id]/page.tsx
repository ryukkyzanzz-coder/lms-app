'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, BookOpen, Calendar, Info, Award, FileText, CheckSquare, Activity, ChevronRight
} from 'lucide-react';
import { MASTER_SISWA_SAMPEL, MASTER_KELAS } from '@/lib/data/academic';

export default function DetailSiswaPage() {
  const params = useParams();
  const router = useRouter();
  const siswaId = params.id as string;
  const [activeTab, setActiveTab] = useState<'info' | 'akademik' | 'aktivitas' | 'nilai'>('info');

  const siswa = MASTER_SISWA_SAMPEL.find(s => s.id === siswaId);

  if (!siswa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Siswa tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/siswa')} className="mt-4 text-blue-700 font-medium">
          Kembali ke Daftar Siswa
        </button>
      </div>
    );
  }

  const kelasInfo = MASTER_KELAS.find(k => k.id === siswa.kelasId);

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/siswa" className="hover:text-blue-900 transition-colors">Siswa</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">{siswa.nama}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{siswa.nama}</h1>
              <span className={`border text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                siswa.status === 'Aktif' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${siswa.status === 'Aktif' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                {siswa.status}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NIS:</span>
                <span className="font-semibold text-slate-900">{siswa.nis}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NISN:</span>
                <span className="font-semibold text-slate-900">{siswa.nisn}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Users size={15} className="text-blue-700" />
                <span>Kelas {siswa.tingkat} {siswa.jurusanSingkat}</span>
              </div>
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
            <span>INFORMASI SISWA</span>
          </button>
          <button 
            onClick={() => setActiveTab('akademik')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'akademik' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen size={18} />
            <span>PENEMPATAN & MAPEL</span>
          </button>
          <button 
            onClick={() => setActiveTab('aktivitas')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'aktivitas' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity size={18} />
            <span>AKTIVITAS (TUGAS & KUIS)</span>
          </button>
          <button 
            onClick={() => setActiveTab('nilai')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'nilai' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award size={18} />
            <span>NILAI & CAPAIAN</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-12 flex flex-col gap-6">
            
            {activeTab === 'info' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Biodata Singkat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Nama Lengkap</span>
                    <span className="font-semibold text-slate-900">{siswa.nama}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Jenis Kelamin</span>
                    <span className="font-semibold text-slate-900">{siswa.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Nomor Induk Siswa Nasional (NISN)</span>
                    <span className="font-semibold text-slate-900 font-mono">{siswa.nisn}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Nomor Induk Siswa (NIS)</span>
                    <span className="font-semibold text-slate-900 font-mono">{siswa.nis}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status Data Dapodik</span>
                    <span className="font-semibold text-emerald-700">{siswa.statusDapodik}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'akademik' && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Penempatan Rombongan Belajar</h3>
                  {kelasInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col gap-1">
                        <span className="text-xs text-blue-800 font-medium">Kelas / Rombel</span>
                        <span className="text-lg font-bold text-blue-900">{kelasInfo.nama}</span>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-1">
                        <span className="text-xs text-slate-500 font-medium">Konsentrasi Keahlian</span>
                        <span className="text-lg font-bold text-slate-900">{kelasInfo.jurusan}</span>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-1">
                        <span className="text-xs text-slate-500 font-medium">Wali Kelas</span>
                        <span className="text-lg font-bold text-slate-900">{kelasInfo.waliKelas}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-lg border border-slate-100">
                      Siswa belum ditempatkan dalam rombongan belajar manapun pada tahun ajaran aktif.
                    </div>
                  )}
                </div>
                
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900">Mata Pelajaran yang Diikuti</h3>
                  </div>
                  <div className="p-12 text-center text-slate-500 text-sm">
                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="font-semibold text-slate-700 mb-1">Data Mata Pelajaran Belum Tersedia</p>
                    <p>Sistem sedang sinkronisasi data kurikulum dan rombongan belajar.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'aktivitas' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Aktivitas Pembelajaran (Materi, Tugas, Kuis)</h3>
                </div>
                <div className="p-12 text-center text-slate-500 text-sm">
                  <Activity size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="font-semibold text-slate-700 mb-1">Belum ada aktivitas pembelajaran yang tersedia.</p>
                  <p>Siswa belum mengikuti penugasan atau kuis pada semester ini.</p>
                </div>
              </div>
            )}

            {activeTab === 'nilai' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Rekapitulasi Nilai & Capaian</h3>
                </div>
                <div className="p-12 text-center text-slate-500 text-sm">
                  <Award size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="font-semibold text-slate-700 mb-1">Data Nilai Belum Tersedia.</p>
                  <p>Penilaian belum dipublikasikan oleh guru pengampu mata pelajaran.</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
