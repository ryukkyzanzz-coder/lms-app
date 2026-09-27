'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  BarChart3, User, BookOpen, AlertCircle, CheckCircle2, ChevronRight, CheckCircle, XCircle
} from 'lucide-react';
import { MASTER_SISWA_SAMPEL, MASTER_KELAS, TAHUN_AJARAN_AKTIF } from '@/lib/data/academic';

export default function DetailStatusAkademikPage() {
  const params = useParams();
  const router = useRouter();
  const siswaId = params.id as string;

  const siswa = MASTER_SISWA_SAMPEL.find(s => s.id === siswaId);

  if (!siswa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Data tidak ditemukan</h2>
        <button onClick={() => router.push('/admin/status-akademik')} className="mt-4 text-blue-700 font-medium">
          Kembali ke Status Akademik
        </button>
      </div>
    );
  }

  const kelasInfo = MASTER_KELAS.find(k => k.id === siswa.kelasId);

  // Mocking status kelengkapan sesuai instruksi (gunakan state jujur jika data tidak tersedia)
  const isIdentitasLengkap = true;
  const isPenempatanLengkap = !!kelasInfo;
  const isDataAkademikLengkap = true; // Profil akademik (Dapodik terverifikasi)
  const isJadwalLengkap = false; // Karena modul jadwal belum ada
  const isNilaiLengkap = false; // Modul nilai belum lengkap
  const isKehadiranLengkap = false; // Modul kehadiran belum lengkap

  const completenessData = [
    { name: 'Identitas Diri (Dapodik)', status: isIdentitasLengkap },
    { name: 'Penempatan Kelas (Rombel)', status: isPenempatanLengkap },
    { name: 'Data Akademik (Tingkat & Jurusan)', status: isDataAkademikLengkap },
    { name: 'Jadwal Pelajaran', status: isJadwalLengkap },
    { name: 'Rekapitulasi Nilai', status: isNilaiLengkap },
    { name: 'Rekam Kehadiran (Presensi)', status: isKehadiranLengkap },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <Link href="/admin/status-akademik" className="hover:text-blue-900 transition-colors">Status Akademik</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Detail Status Kelengkapan</span>
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
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-12 flex flex-col gap-6">
            
            {/* Identitas Siswa & Status Akademik */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <User size={18} className="text-slate-400" />
                Informasi & Profil Akademik Terkini
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Nama Siswa</span>
                  <span className="font-semibold text-slate-900">{siswa.nama}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Tahun Ajaran Aktif</span>
                  <span className="font-semibold text-slate-900">{TAHUN_AJARAN_AKTIF.tahun} ({TAHUN_AJARAN_AKTIF.semester})</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Nomor Induk Siswa Nasional (NISN)</span>
                  <span className="font-semibold text-slate-900 font-mono">{siswa.nisn}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Status Peserta Didik</span>
                  <span className="font-semibold text-emerald-700">{siswa.status}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Nomor Induk Siswa (NIS)</span>
                  <span className="font-semibold text-slate-900 font-mono">{siswa.nis}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Program / Konsentrasi Keahlian</span>
                  <span className="font-semibold text-slate-900">Kelas {siswa.tingkat} {siswa.jurusanSingkat}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Kelas / Rombel</span>
                  <span className="font-semibold text-blue-800">{siswa.kelasNama || 'Belum Ditempatkan'}</span>
                </div>
              </div>
            </div>

            {/* Matrix Kelengkapan Data */}
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
                <BarChart3 size={18} className="text-slate-500" />
                <h3 className="font-bold text-slate-900">Matriks Kelengkapan Data</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-200/60 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-3 px-6 w-12 text-center">No</th>
                      <th className="py-3 px-6">Modul & Komponen Data</th>
                      <th className="py-3 px-6 text-center">Status Kelengkapan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                    {completenessData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-6 text-center text-slate-400 font-medium">{idx + 1}</td>
                        <td className="py-3 px-6 font-semibold text-slate-800">{item.name}</td>
                        <td className="py-3 px-6 text-center">
                          {item.status ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-100">
                              <CheckCircle size={14} /> Lengkap
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
                              <AlertCircle size={14} /> Belum Tersedia / Kosong
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
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
