'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home,
  Bell,
  Search,
  Filter,
  Megaphone,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SiswaPengumumanPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-7xl mx-auto">
      {/* 1. ACADEMIC CONTEXT HEADER */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/siswa/dashboard" className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>Portal Siswa</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pengumuman Akademik</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Pusat Informasi &amp; Pengumuman
            </h1>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              1 Belum Dibaca
            </Badge>
          </div>
          
          <CardDescription className="max-w-3xl">
            Informasi resmi dari guru, sekolah, dan pembaruan terkait kelas yang Anda ikuti.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 2. FILTER & SEARCH */}
      <Card>
        <CardContent className="p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
            <Button size="sm" variant="default" className="text-xs">
              Semua (14)
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Belum Dibaca (1)
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Penting
            </Button>
          </div>
          
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Cari pengumuman..." 
                className="pl-9 h-9 text-xs"
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. PENGUMUMAN LIST */}
      <div className="flex flex-col gap-4">
        
        {/* Item 1: Unread / High Priority */}
        <Link href="/siswa/pengumuman/1" className="group block">
          <Card className="hover:border-primary/50 transition-all border-l-4 border-l-primary relative overflow-hidden">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Perubahan Jadwal Praktikum Lab Komputer
                    </h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                      Baru
                    </Badge>
                    <Badge variant="destructive" className="text-[10px] font-semibold">
                      Penting
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-4xl">
                    Diinformasikan kepada seluruh siswa kelas XII RPL 1, dikarenakan adanya maintenance server di Lab 1, jadwal praktikum Pemrograman Web besok (Selasa) dipindah ke Lab Komputer 2. Mohon hadir tepat waktu.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">BP</span>
                      Budi Pratama, S.Kom.
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Hari ini, 08:30 WIB
                    </span>
                    <span>•</span>
                    <span className="text-muted-foreground">
                      Pemrograman Web &amp; Perangkat Bergerak
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                <ChevronRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Item 2: Read */}
        <Link href="/siswa/pengumuman/2" className="group block">
          <Card className="hover:border-primary/50 transition-all opacity-85 hover:opacity-100">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Materi Tambahan: Dokumentasi API Express.js
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-4xl">
                    Bagi yang kesulitan mengerjakan Tugas 03, Bapak sudah mengunggah link referensi tambahan ke dokumentasi resmi Express.js dan contoh implementasi JWT di folder materi. Silakan dipelajari.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">BP</span>
                      Budi Pratama, S.Kom.
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Kemarin, 14:15 WIB
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Item 3: Read - Sekolah */}
        <Link href="/siswa/pengumuman/3" className="group block">
          <Card className="hover:border-primary/50 transition-all opacity-85 hover:opacity-100">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Pembayaran SPP Bulan September 2026
                    </h2>
                    <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wider">
                      Sekolah
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-4xl">
                    Diberitahukan kepada seluruh siswa, pembayaran SPP bulan September maksimal tanggal 10. Bagi yang sudah transfer mohon konfirmasi ke Tata Usaha.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">TU</span>
                      Tata Usaha SMK CITRA NEGARA
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      23 Sep 2026
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

      </div>
      
      {/* 4. Pagination */}
      <div className="flex items-center justify-center gap-1 mt-4">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" className="h-8 w-8 text-xs font-semibold">
          1
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 text-xs font-medium">
          2
        </Button>
        <span className="text-muted-foreground px-2 text-xs">...</span>
        <Button variant="outline" size="icon" className="h-8 w-8 text-xs font-medium">
          5
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}

