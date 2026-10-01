'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  TrendingUp, 
  Users, 
  Clock, 
  Search, 
  Pin,
  GraduationCap,
  Calendar,
  User,
  FileText,
  Code,
  ExternalLink,
  Eye,
  BarChart2,
  Bell,
  Edit,
  MoreVertical,
  ClipboardList,
  Download,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Plus
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PengumumanPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'published' | 'scheduled' | 'draft'>('semua');
  const [selectedClass, setSelectedClass] = useState('XII RPL 1');
  const [selectedSemester, setSelectedSemester] = useState('ganjil');

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* ACADEMIC CONTEXT HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/guru/kelas" />}>
                  Kelas Saya
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/guru/kelas" />}>
                  XII RPL 1
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pengumuman Kelas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Pengumuman Kelas
            </h1>
            <span className="text-muted-foreground font-normal hidden sm:inline">—</span>
            <span className="text-xl font-semibold text-foreground/80 hidden sm:inline">
              Pemrograman Web
            </span>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary ml-auto sm:ml-0">
              Kurikulum Merdeka
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Sampaikan informasi resmi, pembaruan silabus, jadwal praktikum lab, dan instruksi asesmen kepada peserta didik di rombel Anda.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Button variant="outline" className="gap-2">
            <Users className="size-4 text-primary" />
            <span className="hidden sm:inline">Sinkronisasi Orang Tua</span>
            <span className="sm:hidden">Sinkron Ortu</span>
          </Button>
          <Button className="gap-2">
            <Plus className="size-4" />
            <span>Buat Pengumuman Baru</span>
          </Button>
        </div>
      </div>

      {/* KPI STATS SUMMARY ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengumuman</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Megaphone className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">14</span>
              <span className="text-xs font-semibold text-muted-foreground">Rilis</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium mt-1">
              8 Aktif • 4 Terjadwal • 2 Arsip
            </span>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tingkat Keterbacaan</CardTitle>
            <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
              <TrendingUp className="size-3.5" /> +3.5%
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">91.2%</span>
              <span className="text-xs font-medium text-muted-foreground">rerata</span>
            </div>
            <Progress value={91.2} className="h-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              29 dari 32 siswa aktif membaca
            </span>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Target Kelas Aktif</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">3</span>
              <span className="text-xs font-semibold text-muted-foreground">Rombel</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">
              XII RPL 1 (Utama), XII RPL 2, X PPLG 1
            </span>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Broadcast Terdekat</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="text-base font-semibold text-foreground truncate" title="Praktikum Lab 2">
              Praktikum Lab 2
            </span>
            <div className="flex items-center gap-1.5 bg-muted/60 border rounded px-2 py-1 w-fit">
              <Calendar className="size-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                Rabu, 30 Sep • 06.30 WIB
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FILTER & CONTROL TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
          <Button 
            variant={activeTab === 'semua' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('semua')}
            className="rounded-full gap-2"
          >
            Semua Pengumuman
            <Badge variant={activeTab === 'semua' ? 'secondary' : 'outline'} className="text-[10px] px-1.5 py-0 h-4">
              14
            </Badge>
          </Button>
          <Button 
            variant={activeTab === 'published' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('published')}
            className="rounded-full gap-2"
          >
            Dipublikasikan
            <Badge variant={activeTab === 'published' ? 'secondary' : 'outline'} className="text-[10px] px-1.5 py-0 h-4">
              8
            </Badge>
          </Button>
          <Button 
            variant={activeTab === 'scheduled' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('scheduled')}
            className="rounded-full gap-2"
          >
            Terjadwal
            <Badge variant={activeTab === 'scheduled' ? 'secondary' : 'outline'} className="text-[10px] px-1.5 py-0 h-4">
              4
            </Badge>
          </Button>
          <Button 
            variant={activeTab === 'draft' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('draft')}
            className="rounded-full gap-2"
          >
            Draft Guru
            <Badge variant={activeTab === 'draft' ? 'secondary' : 'outline'} className="text-[10px] px-1.5 py-0 h-4">
              2
            </Badge>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input 
              type="text" 
              className="w-full sm:w-[220px] lg:w-[260px] pl-9"
              placeholder="Cari judul, topik..." 
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedClass} onValueChange={(val) => val && setSelectedClass(val)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSemester} onValueChange={(val) => val && setSelectedSemester(val)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ganjil">Semester Ganjil</SelectItem>
                <SelectItem value="genap">Semester Genap</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT LISTING */}
      <div className="flex flex-col gap-6">
        {/* ITEM 1: PINNED / RESMI PENTING */}
        <Card className="relative overflow-hidden pl-2 border-l-4 border-l-destructive">
          <CardHeader className="gap-3 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="destructive" className="gap-1 uppercase tracking-wider text-[10px]">
                  <Pin className="size-3 rotate-45" />
                  Pengumuman Resmi Penting • Pinned
                </Badge>
                <Badge variant="outline" className="gap-1 text-[11px]">
                  <GraduationCap className="size-3" />
                  Target: XII RPL 1
                </Badge>
                <Badge variant="outline" className="gap-1.5 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 text-[11px]">
                  <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                  Dipublikasikan
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium shrink-0">
                <Clock className="size-3.5 text-muted-foreground" />
                <span>28 Sep 2026, 08:30</span>
                <span className="text-muted-foreground/40">•</span>
                <span className="flex items-center gap-1 text-foreground font-medium">
                  <User className="size-3.5 text-muted-foreground" />
                  Dafiand
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <CardTitle className="text-lg font-semibold leading-snug">
                Perubahan Jam Praktikum Lab & Persiapan Uji Kompetensi REST API Postman
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                Diberitahukan kepada seluruh siswa kelas XII RPL 1 bahwa sesi laboratorium pada hari Rabu, 30 September dialihkan ke Lab Komputer 2 (IP Static V-LAN). Seluruh siswa wajib memastikan starter template Express.js telah di-clone dan Postman Desktop Client sudah terinstal versi 11.4+. Keterlambatan toleransi maksimal 10 menit.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link 
                href="#" 
                className="flex items-center gap-3 border rounded-lg p-3 hover:border-destructive/40 hover:bg-muted/40 transition-colors sm:w-[320px]"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold text-foreground truncate">Panduan_Lab_Komputer_2_Config.pdf</span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">1.8 MB • Unduh Dokumen</span>
                </div>
                <Download className="size-4 text-muted-foreground shrink-0" />
              </Link>
              
              <Link 
                href="#" 
                className="flex items-center gap-3 border rounded-lg p-3 hover:border-primary/40 hover:bg-muted/40 transition-colors sm:w-[320px]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Code className="size-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold text-foreground truncate">rest-starter-kit</span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">Repositori Resmi Template</span>
                </div>
                <ExternalLink className="size-4 text-muted-foreground shrink-0" />
              </Link>
            </div>

            <div className="bg-muted/50 border rounded-lg p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Eye className="size-4 text-primary" />
                    29 / 32 Siswa Telah Membaca (90.6%)
                  </span>
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    3 Belum Membaca
                  </Badge>
                </div>
                <Progress value={90.6} className="h-1.5" />
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-muted-foreground">Menunggu konfirmasi:</span>
                  <span className="font-semibold text-foreground">Ahmad Fauzi, Rizky Pratama, Zulfikar</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 shrink-0 xl:pl-6 xl:border-l">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <BarChart2 className="size-3.5 text-muted-foreground" />
                  <span>Detail Pembaca</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10">
                  <Bell className="size-3.5" />
                  <span>Kirim Pengingat (3)</span>
                </Button>
                <Button variant="outline" size="icon-sm">
                  <Edit className="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ITEM 2: DIPUBLIKASIKAN (TUGAS / DEADLINE) */}
        <Card className="relative overflow-hidden pl-2">
          <CardHeader className="gap-3 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-1 uppercase tracking-wider text-[10px]">
                  <ClipboardList className="size-3 text-primary" />
                  Tenggat & Asesmen
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  XII RPL 1
                </Badge>
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 text-[11px]">
                  Terbaca: 31/32 (96.8%)
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium shrink-0">
                <Clock className="size-3.5 text-muted-foreground" />
                <span>25 Sep 2026, 14:00</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <CardTitle className="text-base font-semibold leading-snug">
                Pemberitahuan Tenggat Waktu Pengumpulan Tugas 03: Otentikasi JWT & Middleware
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                Tenggat waktu submission repositori Git dan dokumentasi Postman Runner berakhir malam ini pukul 23.59 WIB. Kebijakan toleransi keterlambatan (grace period) 24 jam dengan penalti potongan 10 poin otomatis pada sistem rekap nilai LMS.
              </CardDescription>
            </div>
          </CardHeader>

          <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-muted/40 px-3 py-1.5 rounded-md border w-fit">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Notifikasi Push & Email Siswa Terkirim</span>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm">
                Lihat
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Copy className="size-3.5 text-muted-foreground" />
                <span className="hidden md:inline">Duplikasi ke XII RPL 2</span>
                <span className="md:hidden">Duplikasi</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* BOTTOM OPERATIONAL DISCIPLINE BANNER */}
      <Alert className="bg-primary/5 border-primary/20 flex items-start gap-4">
        <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <AlertTitle className="text-sm font-semibold text-foreground">
            Kebijakan Komunikasi & Notifikasi Multi-Peran
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
            Pengumuman yang dipublikasikan secara otomatis memicu <strong className="font-semibold text-foreground">push notification</strong> pada aplikasi mobile Murid, portal orang tua, dan tercatat dalam buku log kegiatan mengajar guru untuk supervisi Kurikulum & Kepala Sekolah.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
