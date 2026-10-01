'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Monitor,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaMateriPage() {
  const [mapel, setMapel] = useState('pwb');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Context */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Portal Siswa</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Materi Pembelajaran</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                Materi Pembelajaran & Modul Praktikum Kejuruan
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Silabus terpadu kompetensi Rekayasa Perangkat Lunak (RPL) - Kelas XII RPL 1
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
            <span className="text-xs font-semibold text-muted-foreground">Mata Pelajaran:</span>
            <Select value={mapel} onValueChange={(val) => val && setMapel(val)}>
              <SelectTrigger className="w-full sm:w-[240px] bg-muted/40">
                <SelectValue placeholder="Pilih Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pwb">Pemrograman Web (Aktif)</SelectItem>
                <SelectItem value="bd">Basis Data & SQL Server</SelectItem>
                <SelectItem value="pbo">PBO Java Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 2. Progress Overview */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                Progres Capaian Silabus — Semester Ganjil
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Berdasarkan penyelesaian modul dan skor ketuntasan tes formatif.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    Modul Selesai
                  </span>
                  <span className="text-sm font-bold text-foreground">8 Materi</span>
                </div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center">
                  <Lock className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    Belum Terbuka
                  </span>
                  <span className="text-sm font-bold text-foreground">4 Materi</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full flex items-center gap-3">
            <Progress value={67} className="flex-1 h-2.5" />
            <span className="text-base font-bold text-primary w-12 text-right">67%</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            type="text" 
            placeholder="Cari judul modul atau topik bab..." 
            className="h-9 pl-9 pr-3 text-xs sm:text-sm bg-card"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="w-full md:w-auto gap-2 text-xs font-semibold">
            <Filter className="size-3.5 text-muted-foreground" />
            <span>Urutkan</span>
          </Button>
        </div>
      </div>

      {/* 4. Module List */}
      <div className="space-y-4">
        {/* Module 8 (Active) */}
        <Card className="border border-border shadow-sm hover:border-primary/50 transition-colors">
          <CardContent className="p-5 flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden shrink-0 relative group">
              <Image 
                unoptimized
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop" 
                alt="Modul 8"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[10px] font-semibold text-foreground">
                12:45 Menit
              </div>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="font-semibold text-[10px] uppercase tracking-wider">
                  Modul 08
                </Badge>
                <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold text-[10px] gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Sedang Dipelajari
                </Badge>
              </div>
              
              <Link href="/siswa/materi/modul-08">
                <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-1.5">
                  Arsitektur RESTful API & Setup Node.js Express
                </h3>
              </Link>
              
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                Pengenalan konsep arsitektur REST, statelessness, standar status code HTTP, dan setup proyek awal menggunakan Express.js serta Nodemon.
              </p>
              
              <div className="flex items-center gap-4 mt-auto flex-wrap text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <PlayCircle className="size-3.5 text-primary" /> 4 Video Interaktif
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <FileText className="size-3.5 text-muted-foreground" /> 2 Handout PDF
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Monitor className="size-3.5 text-muted-foreground" /> 1 Tugas Lab
                </span>
              </div>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-border mt-4 md:mt-0">
              <div className="flex flex-col items-center md:mb-2">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-0.5">
                  Progres Saya
                </span>
                <span className="text-lg font-bold text-primary leading-none">25%</span>
              </div>
              <Button render={<Link href="/siswa/materi/modul-08" />} size="sm" className="gap-1.5 text-xs font-semibold">
                <span>Lanjutkan Belajar</span>
                <PlayCircle className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Module 7 (Completed) */}
        <Card className="border border-border shadow-sm hover:border-border/80 transition-colors opacity-85">
          <CardContent className="p-5 flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden shrink-0 relative group">
              <Image 
                unoptimized
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop" 
                alt="Modul 7"
                width={300}
                height={200}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px]">
                <div className="size-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="size-5" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-semibold uppercase">
                  Modul 07
                </Badge>
                <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold text-[10px] gap-1">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  Selesai Dipelajari
                </Badge>
              </div>
              
              <Link href="/siswa/materi/modul-07">
                <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-1.5">
                  Lifecycle React.js & Hooks Lanjutan (useEffect)
                </h3>
              </Link>
              
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                Memahami daur hidup komponen fungsional di React dan penggunaan useEffect untuk fetching data API eksternal.
              </p>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-border mt-4 md:mt-0">
              <div className="flex flex-col items-center md:mb-2">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-0.5">
                  Skor Formatif
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-none">92.0</span>
              </div>
              <Button render={<Link href="/siswa/materi/modul-07" />} variant="outline" size="sm" className="text-xs font-semibold">
                Ulas Kembali
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Module 9 (Locked) */}
        <Card className="border border-border/60 bg-muted/30 opacity-75">
          <CardContent className="p-5 flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-muted-foreground">
              <Lock className="size-7" />
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-semibold uppercase text-muted-foreground">
                  Modul 09
                </Badge>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-muted-foreground leading-tight mb-1.5">
                Autentikasi JWT & Middleware pada Express.js
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground/80 line-clamp-2 mb-3">
                Materi terkunci. Selesaikan Modul 08 beserta kuis formatifnya terlebih dahulu untuk membuka akses ke materi ini.
              </p>
            </div>
            
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 shrink-0 md:pl-5 md:border-l border-border mt-4 md:mt-0">
              <Button disabled variant="outline" size="sm" className="text-xs font-semibold gap-1.5 text-muted-foreground cursor-not-allowed">
                <span>Terkunci</span>
                <Lock className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
