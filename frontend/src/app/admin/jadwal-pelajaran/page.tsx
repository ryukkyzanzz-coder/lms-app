'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, CalendarDays, Users, BookOpen, Clock, ChevronLeft, ChevronRight, AlertCircle, Calendar
} from 'lucide-react';
import { MASTER_KELAS, MASTER_GURU, TAHUN_AJARAN_AKTIF } from '@/lib/data/academic';

export default function DaftarJadwalPelajaranPage() {
  const [activeTab, setActiveTab] = useState<'kelas' | 'guru'>('kelas');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHari, setFilterHari] = useState('all');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('all');
  
  // Data Jadwal belum tersedia dari backend (academic.ts)
  // Menampilkan empty state sesuai instruksi "JANGAN membuat mock data hanya untuk mengisi UI"
  const isDataAvailable = false;

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col w-full gap-5">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
              <Link href="/admin/dashboard" className="hover:text-blue-900 transition-colors">Beranda</Link>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="hover:text-blue-900 transition-colors cursor-pointer">Pembelajaran</span>
              <span className="text-[12px] text-slate-300">/</span>
              <span className="text-blue-900 font-semibold">Jadwal Pelajaran</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl text-slate-900 tracking-tight font-bold">Jadwal Pelajaran</h1>
              <span className="bg-amber-50 border border-amber-100 text-amber-800 text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                Monitoring KBM
              </span>
            </div>
            <p className="font-body text-sm text-slate-500">
              Pemantauan jadwal Kegiatan Belajar Mengajar (KBM) Tahun Ajaran {TAHUN_AJARAN_AKTIF.tahun} Semester {TAHUN_AJARAN_AKTIF.semester}.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-1.5 flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => { setActiveTab('kelas'); setSelectedEntityId('all'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
              activeTab === 'kelas' ? 'bg-amber-100 text-amber-900 shadow-sm border border-amber-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Users size={18} />
            <span>JADWAL PER KELAS</span>
          </button>
          <button 
            onClick={() => { setActiveTab('guru'); setSelectedEntityId('all'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
              activeTab === 'guru' ? 'bg-amber-100 text-amber-900 shadow-sm border border-amber-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <BookOpen size={18} />
            <span>JADWAL PER GURU</span>
          </button>
        </div>

        {/* Control Toolbar */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-5 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                className="w-full h-9 pl-9 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/70 rounded text-[13px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-600 focus:border-transparent transition-all" 
                placeholder="Cari mata pelajaran atau ruangan..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-4">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-amber-600 focus:bg-white cursor-pointer"
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(e.target.value)}
              >
                {activeTab === 'kelas' ? (
                  <>
                    <option value="all">Pilih Rombongan Belajar</option>
                    {MASTER_KELAS.map(k => (
                      <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value="all">Pilih Guru Pengampu</option>
                    {MASTER_GURU.map(g => (
                      <option key={g.id} value={g.id}>{g.nama}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="lg:col-span-3">
              <select 
                className="w-full h-9 px-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 text-[13px] font-medium rounded focus:outline-none focus:ring-1 focus:ring-amber-600 focus:bg-white cursor-pointer"
                value={filterHari}
                onChange={(e) => setFilterHari(e.target.value)}
              >
                <option value="all">Semua Hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Master Content (Schedule View) */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
          {!isDataAvailable ? (
            <div className="p-16 flex flex-col items-center justify-center text-center border-b border-slate-100">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4">
                <CalendarDays size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Data Jadwal Pelajaran Belum Tersedia</h3>
              <p className="text-sm text-slate-500 max-w-md">
                Modul jadwal pelajaran saat ini sedang dalam proses sinkronisasi dengan sistem kurikulum. Data belum dapat dimonitor.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto p-4">
              {/* Tampilan table jadwal mingguan akan dimuat di sini setelah API siap */}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
