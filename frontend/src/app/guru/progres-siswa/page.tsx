'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  RefreshCcw, 
  BookOpen, 
  TrendingUp, 
  ClipboardCheck, 
  BarChart3,
  Users,
  ArrowRight,
  BookMarked,
  Search, 
  LayoutGrid,
  List,
  Clock
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProgresSiswaPage() {
  const [activeTab, setActiveTab] = useState('semua');
  const [selectedBab, setSelectedBab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const students = [
    {
      nis: '2204128',
      no: '#24',
      name: 'Rakha Arkana',
      initials: 'RA',
      classInfo: 'XII RPL 1 • Hadir Penuh',
      materiProgress: 92,
      materiCount: '11 / 12 Modul',
      assignmentSubmissions: '8/8',
      assignmentStatus: 'Tepat Waktu',
      assignmentVariant: 'default' as const,
      avgGrade: 88.0,
      lastActivityTime: '15 mnt lalu',
      lastActivityAction: 'Membaca Bab 3.2 JWT',
      status: 'Baik',
      category: 'baik',
    },
    {
      nis: '2204101',
      no: '#03',
      name: 'Ahmad Fauzi',
      initials: 'AF',
      classInfo: 'Menunggak Tugas 03',
      materiProgress: 41.6,
      materiCount: '5 / 12 Modul',
      assignmentSubmissions: '4/8',
      assignmentStatus: '2 Terlambat',
      assignmentVariant: 'destructive' as const,
      avgGrade: 64.0,
      lastActivityTime: 'Kemarin, 14:20',
      lastActivityAction: 'Login Beranda',
      status: 'Perlu Perhatian',
      category: 'perhatian',
    },
  ];

  const filteredStudents = students.filter(student => {
    if (activeTab !== 'semua' && student.category !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return student.name.toLowerCase().includes(q) || student.nis.includes(q);
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* ACADEMIC CONTEXT HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/guru/dashboard" />}>
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Progres Siswa</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Progres Siswa
            </h1>
            <span className="text-muted-foreground font-normal hidden sm:inline">—</span>
            <span className="text-xl font-semibold text-foreground/80 hidden sm:inline">
              Pemrograman Web
            </span>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary ml-auto sm:ml-0">
              XII RPL 1
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Pantau perkembangan belajar siswa pada kelas yang Anda ajar, ketuntasan modul ajar, dan kepatuhan tugas praktikum.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Button variant="outline" className="gap-2">
            <Download className="size-4 text-primary" />
            <span className="hidden sm:inline">Unduh Rekap Progres</span>
            <span className="sm:hidden">Unduh Rekap</span>
          </Button>
          <Button className="gap-2">
            <RefreshCcw className="size-4" />
            <span className="hidden sm:inline">Sinkronisasi Data</span>
            <span className="sm:hidden">Sinkron</span>
          </Button>
        </div>
      </div>

      {/* SECTION 01: RINGKASAN METRIK KELAS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Penyelesaian Materi</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">78.4%</span>
              <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
                <TrendingUp className="size-3.5" /> +4.2%
              </Badge>
            </div>
            <Progress value={78.4} className="h-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              25 dari 32 siswa aktif menyelesaikan modul
            </span>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pengumpulan Tugas</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 flex items-center justify-center">
              <ClipboardCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">86.5%</span>
              <span className="text-xs font-semibold text-muted-foreground">(28/32 Siswa)</span>
            </div>
            <Progress value={86.5} className="h-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              Rerata keterlambatan serah 1.2 hari
            </span>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rata-Rata Nilai</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 flex items-center justify-center">
              <BarChart3 className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">81.2</span>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
                Tuntas Klasikal
              </Badge>
            </div>
            <Progress value={81.2} className="h-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              Dari 4 asesmen formatif & sumatif (KKM: 75)
            </span>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktivitas Belajar</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">89.0%</span>
              <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
                Aktif 7 Hari
              </Badge>
            </div>
            <Progress value={89} className="h-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              29 dari 32 siswa berinteraksi di portal
            </span>
          </CardContent>
        </Card>
      </section>

      {/* SECTION 02 & 04: GRID 2-COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PART A: PERLU PERHATIAN */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-destructive" />
              <CardTitle className="text-base font-semibold">Perlu Perhatian Pendidik</CardTitle>
            </div>
            <Badge variant="destructive" className="uppercase tracking-wider text-[10px]">
              3 Peringatan
            </Badge>
          </CardHeader>
          
          <CardContent className="flex flex-col gap-3 pt-4">
            {/* Warning Card 1 */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Clock className="size-5 text-destructive shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-foreground">3 Siswa Belum Menyerahkan Tugas 03</span>
                  <span className="text-xs text-muted-foreground mt-0.5">REST API & Autentikasi JWT (Tenggat lewat 2 hari lalu)</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant="secondary" className="text-xs font-normal">Ahmad Fauzi</Badge>
                    <Badge variant="secondary" className="text-xs font-normal">Bayu Segara</Badge>
                    <Badge variant="secondary" className="text-xs font-normal">Siti Nurhaliza</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1.5 mt-1 border-destructive/20 text-foreground hover:bg-destructive/10">
                <span>Lihat Siswa & Kirim Notifikasi Pengingat</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>

            {/* Warning Card 2 */}
            <div className="bg-muted/50 border rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <BookMarked className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-foreground">5 Siswa Belum Membuka Modul &apos;06. Fetch API&apos;</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Nol riwayat penelusuran modul teori sejak dipublikasi 4 hari lalu.</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1.5 mt-1">
                <span>Lihat Progres Materi Siswa</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* PART B: PROGRES KETUNTASAN MATERI PER BAB */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Ketuntasan Kurikulum Modul Ajar</CardTitle>
            </div>
            <CardDescription className="text-xs font-medium">Target KBM: 80% per Kompetensi</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 pt-4">
            {/* BAB 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
                    Bab 1
                  </Badge>
                  <span className="font-medium text-sm text-foreground">Dasar Pengembangan Web Modern</span>
                </div>
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 text-xs">
                  94% Tuntas
                </Badge>
              </div>
              <Progress value={94} className="h-1.5" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                <div>HTTP & Server: <span className="font-medium text-foreground">92%</span></div>
                <div>Semantic HTML: <span className="font-medium text-foreground">88%</span></div>
                <div>CSS Grid & Flex: <span className="font-medium text-foreground">76%</span></div>
              </div>
            </div>

            <div className="h-px w-full bg-border"></div>

            {/* BAB 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
                    Bab 2
                  </Badge>
                  <span className="font-medium text-sm text-foreground">Pemrograman JavaScript Lanjut</span>
                </div>
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs">
                  78% Berjalan
                </Badge>
              </div>
              <Progress value={78} className="h-1.5" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                <div>JS Fundamental: <span className="font-medium text-foreground">81%</span></div>
                <div>DOM Events: <span className="font-medium text-foreground">74%</span></div>
                <div>Fetch & Async: <span className="font-medium text-foreground">63%</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 03: DAFTAR PROGRES SISWA */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={(val) => val && setActiveTab(val)}>
            <TabsList>
              <TabsTrigger value="semua" className="gap-2">
                Semua Siswa
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  32
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="perhatian" className="gap-2">
                Perlu Perhatian
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4">
                  5
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="baik" className="gap-2">
                Progres Baik
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  24
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px] pl-9"
                placeholder="Cari nama atau NIS..." 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={selectedBab} onValueChange={(val) => val && setSelectedBab(val)}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Pilih Bab" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Bab (1 - 3)</SelectItem>
                  <SelectItem value="bab1">Bab 1: Dasar Web</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center bg-muted p-1 rounded-lg border shrink-0">
                <Button 
                  variant={viewMode === 'table' ? 'default' : 'ghost'} 
                  size="icon-xs" 
                  onClick={() => setViewMode('table')}
                  title="Tampilan Tabel"
                >
                  <List className="size-3.5" />
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="icon-xs" 
                  onClick={() => setViewMode('grid')}
                  title="Tampilan Rincian Bab"
                >
                  <LayoutGrid className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">No/NIS</TableHead>
              <TableHead>Nama Siswa</TableHead>
              <TableHead className="w-[220px]">Ketuntasan Materi</TableHead>
              <TableHead className="w-[180px]">Pengumpulan Tugas</TableHead>
              <TableHead className="w-[110px] text-center">Rerata Nilai</TableHead>
              <TableHead className="w-[160px]">Aktivitas Terakhir</TableHead>
              <TableHead className="w-[130px] text-center">Status</TableHead>
              <TableHead className="w-[80px] text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Tidak ada data siswa ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow 
                  key={student.nis} 
                  className={student.category === 'perhatian' ? 'bg-destructive/5 hover:bg-destructive/10' : ''}
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{student.no}</span>
                      <span className="text-[11px] text-muted-foreground font-mono mt-0.5">{student.nis}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className={student.category === 'perhatian' ? 'bg-destructive/15 text-destructive font-semibold text-xs' : 'bg-primary/10 text-primary font-semibold text-xs'}>
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm">{student.name}</span>
                        <span className={`text-[11px] mt-0.5 ${student.category === 'perhatian' ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                          {student.classInfo}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className={student.category === 'perhatian' ? 'text-destructive font-bold' : 'text-primary font-bold'}>
                          {student.materiProgress}%
                        </span>
                        <span className="text-muted-foreground text-[11px]">{student.materiCount}</span>
                      </div>
                      <Progress value={student.materiProgress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{student.assignmentSubmissions}</span>
                      <Badge 
                        variant={student.assignmentVariant === 'destructive' ? 'destructive' : 'outline'}
                        className={student.assignmentVariant === 'default' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 text-[10px]' : 'text-[10px]'}
                      >
                        {student.assignmentStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    <Badge 
                      variant="outline"
                      className={student.category === 'perhatian' ? 'border-destructive/30 bg-destructive/10 text-destructive font-bold' : 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 font-bold'}
                    >
                      {student.avgGrade.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground font-medium">{student.lastActivityTime}</span>
                      <span className="text-[11px] text-muted-foreground truncate max-w-[140px] mt-0.5" title={student.lastActivityAction}>
                        {student.lastActivityAction}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    <Badge 
                      variant={student.category === 'perhatian' ? 'destructive' : 'outline'}
                      className={student.category === 'baik' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 uppercase tracking-wider text-[10px]' : 'uppercase tracking-wider text-[10px]'}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 font-semibold text-xs">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
