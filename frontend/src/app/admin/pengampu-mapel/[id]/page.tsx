'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, BookOpen, Clock, ShieldCheck, CheckCircle2, ChevronRight, FileText, Layers, Target, Info
} from 'lucide-react';
import { MASTER_MATA_PELAJARAN, TAHUN_AJARAN_AKTIF } from '@/lib/data/academic';

export default function DetailPengampuPage() {
  const params = useParams();
  const router = useRouter();
  const pengampuId = params.id as string;

  const data = MASTER_MATA_PELAJARAN.find(m => m.id === pengampuId);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Data penugasan tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/pengampu-mapel')} className="mt-4 text-blue-700 font-medium">
          Kembali ke Daftar Pengampu
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
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/pengampu-mapel" className="hover:text-blue-900 transition-colors">Pengampu Mapel</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Detail Penugasan</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{data.guruPengampuNama}</h1>
              <span className={`border text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                data.statusSk === 'Tervalidasi' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${data.statusSk === 'Tervalidasi' ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                SK {data.statusSk}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NIP:</span>
                <span className="font-semibold text-slate-900">{data.guruPengampuNip}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Info size={15} className="text-blue-700" />
                <span>{TAHUN_AJARAN_AKTIF.tahun} ({TAHUN_AJARAN_AKTIF.semester})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-12 flex flex-col gap-6">
            
            {/* Informasi Akademik */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <BookOpen size={18} className="text-slate-400" />
                Informasi Penugasan Mata Pelajaran
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Mata Pelajaran</span>
                  <span className="font-semibold text-slate-900">{data.nama}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Kode Mapel</span>
                  <span className="font-semibold text-slate-900 font-mono">{data.kode}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Fase & Tingkat</span>
                  <span className="font-semibold text-slate-900">Kelas {data.tingkat} - {data.fase}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Konsentrasi Keahlian</span>
                  <span className="font-semibold text-slate-900">{data.jurusanSingkat}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Alokasi Beban (JP)</span>
                  <span className="font-semibold text-blue-700">{data.jpPerMinggu} Jam Pelajaran (JP) / Minggu</span>
                </div>
              </div>
            </div>

            {/* Target Rombel */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                <Users size={18} className="text-slate-500" />
                <h3 className="font-bold text-slate-900">Daftar Kelas yang Diampu</h3>
              </div>
              <div className="p-6">
                {data.rombelTarget && data.rombelTarget.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.rombelTarget.map((r, i) => (
                      <div key={i} className="flex flex-col p-4 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-sm text-slate-500 font-medium mb-1">Rombongan Belajar</span>
                        <span className="text-lg font-bold text-slate-900 flex items-center justify-between">
                          {r}
                          <Layers size={16} className="text-blue-600" />
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 border border-slate-100 rounded-lg">
                    Guru belum ditugaskan ke rombongan belajar manapun untuk mata pelajaran ini.
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
