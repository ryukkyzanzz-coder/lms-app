'use client';

import React from 'react';
import { useTeacher } from '@/lib/guru/teacher-context';
import { DoorOpen, BookOpen } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

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
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <DoorOpen size={12} className="text-primary" />
            <span>Rombongan Belajar (Kelas)</span>
          </label>
        )}
        <div>
          {isLoadingClasses ? (
            <Skeleton className="h-8 w-full sm:w-[220px]" />
          ) : (
            <Select
              value={selectedKelasId || ''}
              onValueChange={(val) => setSelectedKelasId((val as string) || null)}
              disabled={availableClasses.length === 0}
            >
              <SelectTrigger className="w-full sm:w-[220px] bg-card text-card-foreground">
                <SelectValue placeholder={availableClasses.length === 0 ? 'Tidak ada kelas diampu' : 'Pilih Kelas'} />
              </SelectTrigger>
              <SelectContent>
                {availableClasses.length === 0 ? (
                  <SelectItem value="_empty" disabled>
                    Tidak ada kelas diampu
                  </SelectItem>
                ) : (
                  availableClasses.map((cls) => (
                    <SelectItem key={cls._id} value={cls._id}>
                      {cls.nama} ({cls.program})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* 2. Subject Selector */}
      <div className="flex flex-col gap-1">
        {showLabels && (
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <BookOpen size={12} className="text-primary" />
            <span>Mata Pelajaran</span>
          </label>
        )}
        <div>
          {isLoadingSubjects ? (
            <Skeleton className="h-8 w-full sm:w-[240px]" />
          ) : (
            <Select
              value={selectedMapelId || ''}
              onValueChange={(val) => setSelectedMapelId((val as string) || null)}
              disabled={availableSubjects.length === 0}
            >
              <SelectTrigger className="w-full sm:w-[240px] bg-card text-card-foreground">
                <SelectValue placeholder={availableSubjects.length === 0 ? 'Tidak ada mapel diampu' : 'Pilih Mapel'} />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.length === 0 ? (
                  <SelectItem value="_empty" disabled>
                    Tidak ada mapel diampu
                  </SelectItem>
                ) : (
                  availableSubjects.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.nama} ({sub.kode})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
