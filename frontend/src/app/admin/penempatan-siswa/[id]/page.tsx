'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  User, BookOpen, Clock, Building, History, CheckCircle2, ChevronRight, MapPin, GraduationCap
} from 'lucide-react';
import { MASTER_SISWA_SAMPEL, MASTER_KELAS, TAHUN_AJARAN_AKTIF } from '@/lib/data/academic';

export default function DetailPenempatanSiswaPage() {
  const params = useParams();
  const router = useRouter();
  const siswaId = params.id as string;

  const siswa = MASTER_SISWA_SAMPEL.find(s => s.id === siswaId);

  if (!siswa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Siswa tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/penempatan-siswa')} className="mt-4 text-emerald-700 font-medium">
          Kembali ke Penempatan Siswa
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
              <Link href="/admin/dashboard" className="hover:text-emerald-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/penempatan-siswa" className="hover:text-emerald-900 transition-colors">Penempatan Siswa</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-emerald-900 font-semibold">Detail Penempatan</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-slate-900 tracking-tight font-bold">{siswa.nama}</h1>
              <span className={`border text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                siswa.status === 'Aktif' || siswa.status === 'Mutasi Masuk'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${siswa.status === 'Aktif' || siswa.status === 'Mutasi Masuk' ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                {siswa.status}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NISN:</span>
                <span className="font-semibold text-slate-900">{siswa.nisn}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-mono text-slate-500">NIS:</span>
                <span className="font-semibold text-slate-900">{siswa.nis}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <GraduationCap size={15} className="text-emerald-700" />
                <span>Kelas {siswa.tingkat} {siswa.jurusanSingkat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-12 flex flex-col gap-6">
            
            {/* Informasi Penempatan Terkini */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <MapPin size={18} className="text-slate-400" />
                Alokasi Rombongan Belajar (Aktif)
              </h3>
              
              {kelasInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Tahun Ajaran</span>
                    <span className="font-semibold text-slate-900">{TAHUN_AJARAN_AKTIF.tahun} ({TAHUN_AJARAN_AKTIF.semester})</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Kelas / Rombel</span>
                    <span className="font-semibold text-emerald-700 text-base">{kelasInfo.nama}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Program / Konsentrasi Keahlian</span>
                    <span className="font-semibold text-slate-900">{kelasInfo.jurusan}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Wali Kelas</span>
                    <span className="font-semibold text-slate-900">{kelasInfo.waliKelas}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Fase & Tingkat</span>
                    <span className="font-semibold text-slate-900">Kelas {kelasInfo.tingkat} - {kelasInfo.fase}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Ruang Kelas Fisik</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <Building size={14} className="text-slate-400" />
                      {kelasInfo.ruangFisik}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 border border-slate-100 rounded-lg">
                  Siswa belum dialokasikan ke dalam rombongan belajar pada tahun ajaran ini.
                </div>
              )}
            </div>

            {/* Riwayat Penempatan */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                <History size={18} className="text-slate-500" />
                <h3 className="font-bold text-slate-900">Riwayat Penempatan Siswa</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-3 px-6">Tahun Ajaran</th>
                      <th className="py-3 px-6">Semester</th>
                      <th className="py-3 px-6">Kelas</th>
                      <th className="py-3 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                    {/* Menggunakan data aktif sebagai riwayat saat ini. Data historis nyata akan dimuat dari backend saat tersedia. */}
                    {kelasInfo ? (
                      <tr className="hover:bg-slate-50/80 transition-colors bg-emerald-50/20">
                        <td className="py-3 px-6 font-semibold">{TAHUN_AJARAN_AKTIF.tahun}</td>
                        <td className="py-3 px-6">{TAHUN_AJARAN_AKTIF.semester}</td>
                        <td className="py-3 px-6 font-bold text-emerald-800">{kelasInfo.nama}</td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Aktif Sekarang
                          </span>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-medium text-sm">
                          Belum ada riwayat penempatan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
