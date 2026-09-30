'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, Terminal, Award, ChevronLeft, ChevronRight,
  Search, ArrowRightLeft, UserMinus, UserPlus, 
  CheckCircle2, UserCheck, AlertCircle
} from 'lucide-react';
import { MASTER_KELAS, MASTER_SISWA_SAMPEL, Siswa } from '@/lib/data/academic';

export default function KelolaSiswaKelasPage() {
  const params = useParams();
  const router = useRouter();
  const kelasId = params.id as string;

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

  const [siswaKelas, setSiswaKelas] = useState<Siswa[]>(MASTER_SISWA_SAMPEL.filter(s => s.kelasId === kelasId));
  
  // Bank siswa are students without a class, or from another class
  const bankSiswa = MASTER_SISWA_SAMPEL.filter(s => s.kelasId !== kelasId);

  const percentage = Math.round((siswaKelas.length / kelas.kapasitas) * 100);
  const sisaKuota = kelas.kapasitas - siswaKelas.length;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Navigation & Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1.5">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/kelas" className="hover:text-blue-900 transition-colors">Kelas</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href={`/admin/kelas/${kelas.id}`} className="hover:text-blue-900 transition-colors">{kelas.nama}</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Anggota Rombel</span>
            </nav>
            <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Anggota Kelas: {kelas.nama}</h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Terminal size={16} className="text-blue-700" />
                <span>Konsentrasi: <strong className="text-slate-900">{kelas.jurusan}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Award size={16} className="text-blue-700" />
                <span>Wali Kelas: <strong className="text-slate-900">{kelas.waliKelas}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-[12px] font-bold">
                <Users size={16} />
                <span>Kapasitas: {siswaKelas.length} / {kelas.kapasitas} Siswa</span>
                {sisaKuota > 0 && <span className="text-blue-600 ml-1">(Sisa {sisaKuota} Kuota)</span>}
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="shrink-0 flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Keterisian Ruang</span>
              <span className="font-display text-2xl font-bold text-slate-900">{siswaKelas.length} Siswa</span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} />
                Memenuhi SPM Standar
              </span>
            </div>
          </div>
        </div>

        {/* Dual Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main PANEL: Current Enrolled Class Roster */}
          <div className="lg:col-span-12 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-4 sm:p-5 flex flex-col gap-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="text-[15px] text-slate-900 font-bold">Daftar Siswa dalam Kelas {kelas.nama}</h2>
                    <p className="text-[11px] text-slate-500">Total {siswaKelas.length} Siswa Aktif Terdata di Semester Ganjil</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-blue-700">
                  {siswaKelas.length} Siswa Terdaftar
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded border border-slate-200 text-[13px] focus:outline-none focus:bg-white focus:border-blue-900 transition-all" 
                    placeholder="Cari nama siswa atau NIS..." 
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select className="h-9 px-3 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[12px] font-medium focus:outline-none cursor-pointer">
                    <option value="all">Semua Status</option>
                    <option value="aktif">Status: Aktif</option>
                  </select>
                </div>
              </div>



              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
                    <tr className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-2.5 px-2 text-center w-10">No</th>
                      <th className="py-2.5 px-3">Nama Siswa & NIS</th>
                      <th className="py-2.5 px-2 text-center">L/P</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                    {siswaKelas.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-2 text-center font-mono text-[11px] font-medium text-slate-400">
                          {(idx + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{s.nama}</span>
                            <span className="text-[10px] font-mono text-slate-500">NIS: {s.nisn}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${s.jenisKelamin === 'L' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                            {s.jenisKelamin}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                            Aktif
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <Link href="/admin/siswa" className="p-1 rounded hover:text-blue-700 hover:bg-slate-100 transition-colors text-[11px] font-bold">
                            Lihat Detail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 mt-2">
                <AlertCircle className="text-blue-700 shrink-0 mt-0.5" size={18} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[12px] font-bold text-slate-900">Informasi Penyelarasan Rombel</p>
                  <p className="text-[11px] text-slate-600">
                    Setiap perubahan mutasi atau pengeluaran anggota rombel secara otomatis merevisi kuota rombongan belajar di server pusat dan membuat log histori mutasi siswa.
                  </p>
                </div>
              </div>

            </div>
          </div>


          
        </div>
      </div>
    </div>
  );
}
