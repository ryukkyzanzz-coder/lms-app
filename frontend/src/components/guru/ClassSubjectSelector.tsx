'use client';

import React from 'react';
import { useTeacher } from '@/lib/guru/teacher-context';
import { DoorOpen, BookOpen, ChevronDown, Loader2 } from 'lucide-react';

interface ClassSubjectSelectorProps {
  className?: string;
  showLabels?: boolean;
}

export default function ClassSubjectSelector({
  className = '',
  showLabels = true,
}: ClassSubjectSelectorProps) {
  const {
    availableClasses,
    availableSubjects,
    selectedKelasId,
    selectedMapelId,
    setSelectedKelasId,
    setSelectedMapelId,
    isLoadingClasses,
    isLoadingSubjects,
  } = useTeacher();

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      {/* 1. Class Selector */}
      <div className="flex flex-col gap-1">
        {showLabels && (
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <DoorOpen size={12} className="text-blue-700" />
            <span>Rombongan Belajar (Kelas)</span>
          </label>
        )}
        <div className="relative">
          {isLoadingClasses ? (
            <div className="h-10 px-3 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-400">
              <Loader2 size={14} className="animate-spin text-blue-700" />
              <span>Memuat kelas...</span>
            </div>
          ) : (
            <>
              <select
                value={selectedKelasId || ''}
                onChange={(e) => setSelectedKelasId(e.target.value || null)}
                disabled={availableClasses.length === 0}
                className="w-full sm:w-[220px] appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/80 rounded-lg text-sm text-slate-800 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow disabled:bg-slate-50 disabled:text-slate-400"
              >
                {availableClasses.length === 0 ? (
                  <option value="">Tidak ada kelas diampu</option>
                ) : (
                  availableClasses.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.nama} ({cls.program})
                    </option>
                  ))
                )}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </>
          )}
        </div>
      </div>

      {/* 2. Subject Selector */}
      <div className="flex flex-col gap-1">
        {showLabels && (
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <BookOpen size={12} className="text-blue-700" />
            <span>Mata Pelajaran</span>
          </label>
        )}
        <div className="relative">
          {isLoadingSubjects ? (
            <div className="h-10 px-3 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-400">
              <Loader2 size={14} className="animate-spin text-blue-700" />
              <span>Memuat mapel...</span>
            </div>
          ) : (
            <>
              <select
                value={selectedMapelId || ''}
                onChange={(e) => setSelectedMapelId(e.target.value || null)}
                disabled={availableSubjects.length === 0}
                className="w-full sm:w-[240px] appearance-none h-10 pl-3 pr-8 bg-white border border-slate-200/80 rounded-lg text-sm text-slate-800 font-medium focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-shadow disabled:bg-slate-50 disabled:text-slate-400"
              >
                {availableSubjects.length === 0 ? (
                  <option value="">Tidak ada mapel diampu</option>
                ) : (
                  availableSubjects.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.nama} ({sub.kode})
                    </option>
                  ))
                )}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
