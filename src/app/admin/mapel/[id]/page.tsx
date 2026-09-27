'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  BookOpen, Users, FolderTree, Info, Target, Layers, FileText, CheckSquare, Activity, ChevronRight
} from 'lucide-react';
import { MASTER_MATA_PELAJARAN } from '@/lib/data/academic';

export default function DetailMapelPage() {
  const params = useParams();
  const router = useRouter();
  const mapelId = params.id as string;
  const [activeTab, setActiveTab] = useState<'info' | 'struktur' | 'aktivitas'>('info');

  const mapel = MASTER_MATA_PELAJARAN.find(m => m.id === mapelId);

  if (!mapel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Mata Pelajaran tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/mapel')} className="mt-4 text-purple-700 font-medium">
          Kembali ke Daftar Mapel
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
              <Link href="/admin/dashboard" className="hover:text-purple-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/mapel" className="hover:text-purple-900 transition-colors">Mata Pelajaran</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-purple-900 font-semibold">{mapel.nama}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{mapel.nama}</h1>
              <span className={`border text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                mapel.statusSk === 'Tervalidasi' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${mapel.statusSk === 'Tervalidasi' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                {mapel.statusSk}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">Kode:</span>
                <span className="font-semibold text-slate-900">{mapel.kode}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Layers size={15} className="text-purple-700" />
                <span>Kelas {mapel.tingkat} ({mapel.fase})</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <BookOpen size={15} className="text-purple-700" />
                <span>{mapel.kategori} - {mapel.jurusanSingkat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-1.5 flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'info' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Info size={18} />
            <span>INFORMASI & PENGAMPU</span>
          </button>
          <button 
            onClick={() => setActiveTab('struktur')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'struktur' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderTree size={18} />
            <span>STRUKTUR KURIKULUM</span>
          </button>
          <button 
            onClick={() => setActiveTab('aktivitas')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[13px] font-bold transition-all ${
              activeTab === 'aktivitas' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity size={18} />
            <span>AKTIVITAS PEMBELAJARAN</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-12 flex flex-col gap-6">
            
            {activeTab === 'info' && (
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Informasi Mata Pelajaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Nama Mata Pelajaran</span>
                      <span className="font-semibold text-slate-900">{mapel.nama}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Kode Sistem</span>
                      <span className="font-semibold text-slate-900 font-mono">{mapel.kode}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Kategori Kurikulum</span>
                      <span className="font-semibold text-slate-900">{mapel.kategori}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Tingkat / Fase</span>
                      <span className="font-semibold text-slate-900">Kelas {mapel.tingkat} - {mapel.fase}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Beban Mengajar</span>
                      <span className="font-semibold text-purple-700">{mapel.jpPerMinggu} Jam Pelajaran (JP) / Minggu</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Konsentrasi Target</span>
                      <span className="font-semibold text-slate-900">{mapel.jurusanSingkat}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                    <Users size={18} className="text-slate-500" />
                    <h3 className="font-bold text-slate-900">Guru Pengampu & Target Rombel</h3>
                  </div>
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 border border-slate-100 bg-slate-50 rounded-lg p-5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Guru Pengampu</span>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900">{mapel.guruPengampuNama}</span>
                        <span className="text-sm font-mono text-slate-500 mt-1">NIP: {mapel.guruPengampuNip}</span>
                      </div>
                    </div>
                    <div className="flex-1 border border-slate-100 bg-slate-50 rounded-lg p-5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Kelas Target (Rombel)</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {mapel.rombelTarget && mapel.rombelTarget.length > 0 ? (
                          mapel.rombelTarget.map((r, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 shadow-sm">
                              {r}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Belum ada kelas yang ditargetkan.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'struktur' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                  <Target size={18} className="text-slate-500" />
                  <h3 className="font-bold text-slate-900">Bab, Topik, & Capaian Pembelajaran</h3>
                </div>
                <div className="p-12 text-center text-slate-500 text-sm">
                  <FolderTree size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="font-semibold text-slate-700 mb-1">Struktur Kurikulum Belum Dipetakan.</p>
                  <p>Guru pengampu belum menyusun Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP) untuk mata pelajaran ini.</p>
                </div>
              </div>
            )}

            {activeTab === 'aktivitas' && (
              <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                  <Activity size={18} className="text-slate-500" />
                  <h3 className="font-bold text-slate-900">Aktivitas Pembelajaran (Materi, Tugas, Kuis)</h3>
                </div>
                <div className="p-12 text-center text-slate-500 text-sm">
                  <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="font-semibold text-slate-700 mb-1">Belum ada aktivitas pembelajaran.</p>
                  <p>Monitoring aktivitas KBM untuk mata pelajaran ini akan muncul setelah guru mempublikasikan materi atau evaluasi.</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
