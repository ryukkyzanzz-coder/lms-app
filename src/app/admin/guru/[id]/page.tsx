'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Award, BookOpen, Clock, Info, Book, FileText, CheckSquare, Activity, ChevronRight
} from 'lucide-react';
import { MASTER_GURU } from '@/lib/data/academic';

export default function DetailGuruPage() {
  const params = useParams();
  const router = useRouter();
  const guruId = params.id as string;
  const [activeTab, setActiveTab] = useState<'info' | 'akademik' | 'aktivitas'>('info');

  const guru = MASTER_GURU.find(g => g.id === guruId);

  if (!guru) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Guru tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/guru')} className="mt-4 text-emerald-700 font-medium">
          Kembali ke Daftar Guru
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-emerald-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/guru" className="hover:text-emerald-900 transition-colors">Guru</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-emerald-900 font-semibold">{guru.nama}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}</h1>
              <span className={`border text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                guru.status.includes('Aktif') 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${guru.status.includes('Aktif') ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                {guru.status}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NIP:</span>
                <span className="font-semibold text-slate-900">{guru.nip}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Award size={15} className="text-emerald-700" />
                <span>{guru.bidang}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-emerald-700" />
                <span>{guru.totalJp} JP/Minggu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-1.5 flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'info' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Info size={18} />
            <span>IDENTITAS GURU</span>
          </button>
          <button 
            onClick={() => setActiveTab('akademik')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'akademik' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen size={18} />
            <span>MATA PELAJARAN & KELAS</span>
          </button>
          <button 
            onClick={() => setActiveTab('aktivitas')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'aktivitas' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity size={18} />
            <span>AKTIVITAS & PENILAIAN</span>
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
                    <span className="font-semibold text-slate-900">{guru.nama}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Nomor Induk Pegawai (NIP)</span>
                    <span className="font-semibold text-slate-900 font-mono">{guru.nip}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Gelar Akademik</span>
                    <span className="font-semibold text-slate-900">{guru.gelar || '-'}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Inisial Sistem</span>
                    <span className="font-semibold text-slate-900 font-mono">{guru.inisial}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status Sertifikasi</span>
                    <span className={`font-semibold ${guru.statusSertifikasi ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {guru.statusSertifikasi ? 'Sudah Tersertifikasi' : 'Belum Tersertifikasi'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status SK</span>
                    <span className="font-semibold text-slate-900">{guru.statusSk}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'akademik' && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Beban Mengajar Aktif</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-emerald-800 font-medium">Bidang Pengampu</span>
                      <span className="text-lg font-bold text-emerald-900">{guru.bidang}</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-slate-500 font-medium">Mata Pelajaran Utama</span>
                      <span className="text-lg font-bold text-slate-900">{guru.mapelUtama}</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-1">
                      <span className="text-xs text-slate-500 font-medium">Total Jam Pelajaran</span>
                      <span className="text-lg font-bold text-slate-900">{guru.totalJp} JP / Minggu</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900">Kelas yang Diampu (Rombel)</h3>
                  </div>
                  <div className="p-4">
                    {guru.rombelDiampu && guru.rombelDiampu.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {guru.rombelDiampu.map((r, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800">
                            {r}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        Belum ada kelas yang ditugaskan kepada guru ini.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'aktivitas' && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900">Materi, Tugas, Kuis & Penilaian</h3>
                  </div>
                  <div className="p-12 text-center text-slate-500 text-sm">
                    <Activity size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="font-semibold text-slate-700 mb-1">Data Aktivitas Pembelajaran Belum Tersedia.</p>
                    <p>Guru belum mempublikasikan materi atau melakukan penilaian pada sistem saat ini.</p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
