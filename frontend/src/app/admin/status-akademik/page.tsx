'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, Users, BookOpen, GraduationCap, Building, FileCheck2, AlertCircle, CheckCircle2, Link as LinkIcon
} from 'lucide-react';
import { 
  STATUS_KESIAPAN_AKADEMIK, MASTER_SISWA_SAMPEL, MASTER_GURU, MASTER_KELAS, MASTER_MATA_PELAJARAN
} from '@/lib/data/academic';

export default function StatusAkademikPage() {
  const totalSiswa = MASTER_SISWA_SAMPEL.length;
  const siswaAktif = MASTER_SISWA_SAMPEL.filter(s => s.status === 'Aktif' || s.status === 'Mutasi Masuk').length;
  const siswaTidakAktif = totalSiswa - siswaAktif;
  const totalGuru = MASTER_GURU.length;
  const totalKelas = MASTER_KELAS.length;
  const totalMapel = MASTER_MATA_PELAJARAN.length;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="hover:text-blue-900 transition-colors cursor-pointer">Monitoring</span>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Status Akademik</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Status Data Akademik</h1>
              <span className="bg-blue-50 border border-blue-100 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Matriks Kesiapan Data
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Evaluasi integritas dan kelengkapan data operasional akademik secara menyeluruh.
            </p>
          </div>
        </div>

        {/* Aggregate Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Siswa</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-slate-900 font-bold">{totalSiswa}</span>
              <Users size={16} className="text-slate-400" />
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-emerald-800 font-bold tracking-wider">Siswa Aktif</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-emerald-900 font-bold">{siswaAktif}</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-rose-800 font-bold tracking-wider">Tdk Aktif/Alumni</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-rose-900 font-bold">{siswaTidakAktif}</span>
              <AlertCircle size={16} className="text-rose-500" />
            </div>
          </div>
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Guru</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-slate-900 font-bold">{totalGuru}</span>
              <GraduationCap size={16} className="text-slate-400" />
            </div>
          </div>
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Kelas</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-slate-900 font-bold">{totalKelas}</span>
              <Building size={16} className="text-slate-400" />
            </div>
          </div>
          <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-1">
            <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Mapel</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-display text-2xl text-slate-900 font-bold">{totalMapel}</span>
              <BookOpen size={16} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Kondisi Data Akademik Master Table */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200/60 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-700" />
              <h3 className="font-bold text-slate-900">Kondisi Kesiapan Data Akademik</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-white border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-4 px-5">Kategori Modul</th>
                  <th className="py-4 px-5 text-center">Total Entri</th>
                  <th className="py-4 px-5 text-center">Data Valid / Lengkap</th>
                  <th className="py-4 px-5">Deskripsi Kondisi</th>
                  <th className="py-4 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                {STATUS_KESIAPAN_AKADEMIK.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-bold text-slate-900 block">{item.kategori}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="font-mono font-semibold text-slate-700">{item.total}</span>
                      <span className="text-[11px] text-slate-500 ml-1">{item.satuan}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-mono font-bold ${item.valid < item.total ? 'text-amber-600' : 'text-emerald-600'}`}>{item.valid}</span>
                          <span className="text-slate-400 text-[10px]">/ {item.total}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className={`h-full rounded-full ${item.persen === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${item.persen}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[12px] text-slate-600 leading-relaxed">{item.deskripsi}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        item.status === 'Lengkap' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        item.status === 'Terhubung' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {item.status === 'Lengkap' && <CheckCircle2 size={12} />}
                        {item.status === 'Terhubung' && <LinkIcon size={12} />}
                        {item.status === 'Perlu Perhatian' && <AlertCircle size={12} />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
