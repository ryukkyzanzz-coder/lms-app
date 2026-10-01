'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaTugasPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Context */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Portal Siswa</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tugas & Penilaian</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                Tugas & Penilaian
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Daftar tugas, praktikum, dan ujian yang perlu Anda selesaikan.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-xl border border-border w-full lg:w-auto shrink-0 justify-around sm:justify-start">
              <div className="flex flex-col px-3 border-r border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Tugas Aktif
                </span>
                <span className="text-lg font-bold text-destructive leading-tight mt-0.5">2</span>
              </div>
              <div className="flex flex-col px-3 border-r border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Tuntas
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-tight mt-0.5">14</span>
              </div>
              <div className="flex flex-col px-3">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Rata-rata
                </span>
                <span className="text-lg font-bold text-primary leading-tight mt-0.5">88.5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            type="text" 
            placeholder="Cari nama tugas atau mata pelajaran..." 
            className="h-9 pl-9 pr-3 text-xs sm:text-sm bg-card"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Button 
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            className="text-xs font-semibold whitespace-nowrap"
          >
            Semua Tugas
          </Button>
          <Button 
            onClick={() => setFilter('active')}
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            className="text-xs font-semibold whitespace-nowrap"
          >
            Belum Dikerjakan (2)
          </Button>
          <Button 
            onClick={() => setFilter('done')}
            variant={filter === 'done' ? 'default' : 'outline'}
            size="sm"
            className="text-xs font-semibold whitespace-nowrap"
          >
            Selesai Dinilai
          </Button>
        </div>
      </div>

      {/* 3. Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Task 1 */}
        <Card className="border border-border shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
          <CardContent className="p-5 lg:p-6 flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="font-semibold text-[10px]">RPL-301</Badge>
                  <Badge variant="outline" className="font-semibold text-[10px]">Praktikum</Badge>
                </div>
                <Badge variant="destructive" className="gap-1 font-semibold text-[10px]">
                  <AlertCircle className="size-3" />
                  Mendesak
                </Badge>
              </div>
              
              <Link href="/siswa/tugas/tugas-03">
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-2">
                  Tugas 03: Implementasi Autentikasi JWT & Middleware Express.js
                </h3>
              </Link>
              
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                Pemrograman Web & Perangkat Bergerak — Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
              <div className="flex items-center gap-2 text-destructive">
                <Clock className="size-4 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Sisa 4 Hari</span>
                  <span className="text-[11px] text-muted-foreground">Batas: 30 Sep 2026, 23:59</span>
                </div>
              </div>
              <Button render={<Link href="/siswa/tugas/tugas-03" />} size="sm" className="gap-2 text-xs font-semibold">
                <span>Kerjakan Tugas</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Quiz 2 */}
        <Card className="border border-border shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
          <CardContent className="p-5 lg:p-6 flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="font-semibold text-[10px]">RPL-301</Badge>
                  <Badge variant="outline" className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">Quiz CBT</Badge>
                </div>
                <Badge variant="secondary" className="gap-1 font-semibold text-[10px]">
                  <Clock className="size-3" />
                  Belum Dikerjakan
                </Badge>
              </div>
              
              <Link href="/siswa/tugas/quiz-02">
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-2">
                  Quiz: Pemahaman Asinkron JS (Promise & Async/Await)
                </h3>
              </Link>
              
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                Evaluasi formatif mandiri untuk materi JavaScript Lanjutan. 15 Soal Pilihan Ganda (25 Menit).
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4 shrink-0 text-muted-foreground/70" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Sisa 6 Hari</span>
                  <span className="text-[11px] text-muted-foreground">Batas: 1 Okt 2026, 15:00</span>
                </div>
              </div>
              <Button render={<Link href="/siswa/tugas/quiz-02" />} size="sm" className="gap-2 text-xs font-semibold">
                <span>Mulai Quiz</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completed Task 3 */}
        <Card className="border border-border/80 bg-muted/20 shadow-sm opacity-85 flex flex-col justify-between">
          <CardContent className="p-5 lg:p-6 flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-semibold text-[10px]">RPL-302</Badge>
                  <Badge variant="outline" className="font-semibold text-[10px]">Tugas Teori</Badge>
                </div>
                <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold text-[10px]">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  Dinilai
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground leading-tight mb-2">
                Tugas 02: Desain Skema Database Relasional (ERD)
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                Basis Data & Pemodelan Relasional — Membuat ERD untuk sistem perpustakaan sekolah.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                    Nilai Akhir
                  </span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-tight">92.0</span>
                </div>
                <div className="w-px h-7 bg-border" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                    Diserahkan
                  </span>
                  <span className="text-xs font-semibold text-foreground leading-tight mt-0.5">Tepat Waktu</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                Lihat Ulasan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
