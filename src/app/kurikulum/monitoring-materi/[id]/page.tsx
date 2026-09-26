'use client';

import React from 'react';
import { 
  ArrowLeft,
  CheckCircle,
  FileText,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DetailImplementasiMapelPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4">
        <Link href="/kurikulum/monitoring-materi" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-900 w-fit transition-colors">
          <ArrowLeft size={14} />
          <span>Kembali ke Monitoring Materi</span>
        </Link>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">XII RPL 1</span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Drs. Hendra Setiawan</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Detail Implementasi: Pemrograman Web</h1>
        </div>
      </div>

      {/* Drill-down Structure */}
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-[15px] font-semibold text-slate-900">Drill-down Topik → Materi → Aktivitas</h2>
        
        <div className="flex flex-col gap-3">
          
          {/* Bab 3 */}
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bab 03</span>
                <h3 className="font-display text-[15px] font-bold text-slate-900 mt-0.5">Authentication</h3>
              </div>
            </div>
            
            <div className="flex flex-col p-4 pl-8 gap-4 bg-white">
              
              {/* Topik 1 */}
              <div className="flex items-start gap-4 p-3 border border-slate-200/60 rounded-lg bg-slate-50/50">
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                    Topik: Implementasi JWT
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Terimplementasi</span>
                  </h4>
                  
                  {/* Mapping to Materi & Tugas */}
                  <div className="flex flex-col gap-2 mt-3 pl-4 border-l-2 border-slate-200">
                    
                    <div className="flex items-start gap-3">
                      <FileText size={16} className="text-blue-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-700">Materi: Membangun Sistem Login dengan JWT</span>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle size={12}/> Dipublikasikan</span>
                          <span>•</span>
                          <span>32/32 Siswa membaca</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                      <ClipboardList size={16} className="text-orange-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-700">Tugas: REST API Authentication</span>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle size={12}/> Aktif</span>
                          <span>•</span>
                          <span>28/32 Siswa mengumpulkan</span>
                          <span>•</span>
                          <span>12 Menunggu diperiksa</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Topik 2 */}
              <div className="flex items-start gap-4 p-3 border border-slate-200/60 rounded-lg bg-slate-50/50">
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                    Topik: Middleware Otorisasi
                    <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Implementasi Parsial</span>
                  </h4>
                  
                  {/* Mapping to Materi & Tugas */}
                  <div className="flex flex-col gap-2 mt-3 pl-4 border-l-2 border-slate-200">
                    
                    <div className="flex items-start gap-3">
                      <FileText size={16} className="text-slate-400 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-700">Materi: Role-based Access Control (RBAC)</span>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 text-orange-600 font-semibold"><AlertCircle size={12}/> Draft (Belum Dipublikasikan)</span>
                          <span>•</span>
                          <span>0 Aktivitas</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                      <AlertCircle size={16} className="text-red-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-red-600">Belum ada instrumen penilaian (Tugas/Quiz) untuk topik ini.</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
