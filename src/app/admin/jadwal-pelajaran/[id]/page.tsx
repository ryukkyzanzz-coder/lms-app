'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  CalendarDays
} from 'lucide-react';

export default function DetailJadwalPelajaranPage() {
  const params = useParams();
  const router = useRouter();
  const jadwalId = params.id as string;

  // Karena backend belum memiliki entitas data Jadwal yang riil,
  // dan instruksi mengatakan "JANGAN fabricate data",
  // kita selalu menampilkan empty state (tidak ditemukan).
  
  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-amber-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/jadwal-pelajaran" className="hover:text-amber-900 transition-colors">Jadwal Pelajaran</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-amber-900 font-semibold">Detail Sesi</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">Detail Sesi KBM</h1>
            </div>
          </div>
        </div>

        {/* Content Section (Empty State) */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4">
            <CalendarDays size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sesi Jadwal Tidak Ditemukan</h2>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            Data detail untuk sesi jadwal ID <code>{jadwalId}</code> belum tersedia di sistem.
          </p>
          <button onClick={() => router.push('/admin/jadwal-pelajaran')} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors">
            Kembali ke Pemantauan Jadwal
          </button>
        </div>
      </div>
    </div>
  );
}
