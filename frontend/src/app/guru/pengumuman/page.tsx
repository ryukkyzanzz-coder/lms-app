'use client';

import React, { useEffect, useState } from 'react';
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
  Plus,
  Loader2,
  X
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { fetchAPI } from '@/lib/api';

export default function PengumumanPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'published' | 'scheduled' | 'draft'>('semua');
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState('ganjil');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newJudul, setNewJudul] = useState('');
  const [newKonten, setNewKonten] = useState('');
  const [newTipe, setNewTipe] = useState<'Resmi Penting' | 'Tenggat & Asesmen' | 'Umum'>('Umum');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadAnnouncements = async (classId?: string) => {
    setLoading(true);
    try {
      // 1. Load classes if not loaded
      const classRes = await fetchAPI<any>('/teachers/me/classes').catch(() => null);
      if (classRes?.data && classRes.data.length > 0) {
        setClasses(classRes.data);
        const cId = classId || selectedClassId || classRes.data[0]._id;
        setSelectedClassId(cId);

        // 2. Load announcements for class
        const res = await fetchAPI<any>(`/teachers/me/classes/${cId}/announcements`).catch(() => null);
        if (res?.data && res.data.length > 0) {
          setAnnouncements(res.data);
          return;
        }
      }

      // Fallback load general teacher announcements
      const genRes = await fetchAPI<any>('/teachers/me/announcements').catch(() => null);
      if (genRes?.data && genRes.data.length > 0) {
        setAnnouncements(genRes.data);
      }
    } catch (err) {
      console.error('Failed to load announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleClassChange = (cId: string) => {
    setSelectedClassId(cId);
    loadAnnouncements(cId);
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudul.trim() || !newKonten.trim()) return;
    setSubmitting(true);
    try {
      await fetchAPI('/teachers/me/announcements', {
        method: 'POST',
        body: JSON.stringify({
          kelasId: selectedClassId || undefined,
          judul: newJudul.trim(),
          konten: newKonten.trim(),
          tipe: newTipe,
          status: 'Dipublikasikan',
          isPinned: newIsPinned,
        }),
      });
      setIsCreateOpen(false);
      setNewJudul('');
      setNewKonten('');
      setNewTipe('Umum');
      setNewIsPinned(false);
      loadAnnouncements(selectedClassId);
    } catch (err) {
      console.error('Failed to create announcement:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const activeClassName = classes.find(c => c._id === selectedClassId)?.nama || 'XII RPL 1';

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
                  {activeClassName}
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
              {activeClassName}
            </Badge>
            {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Sampaikan informasi resmi, pembaruan silabus, jadwal praktikum lab, dan instruksi asesmen kepada peserta didik di rombel Anda.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Button variant="outline" className="gap-2" onClick={() => typeof window !== 'undefined' && window.print()}>
            <Users className="size-4 text-primary" />
            <span className="hidden sm:inline">Sinkronisasi Orang Tua</span>
            <span className="sm:hidden">Sinkron Ortu</span>
          </Button>
          <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedClassId} onValueChange={(val) => val && handleClassChange(val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.length > 0 ? (
                  classes.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.nama}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                    <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                  </>
                )}
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
        {announcements.length > 0 ? (
          announcements
            .filter((item) => {
              if (activeTab === 'published' && item.status !== 'Dipublikasikan') return false;
              if (activeTab === 'draft' && item.status !== 'Draft') return false;
              if (activeTab === 'scheduled' && item.status !== 'Terjadwal') return false;
              if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return item.judul?.toLowerCase().includes(q) || item.konten?.toLowerCase().includes(q);
              }
              return true;
            })
            .map((item, idx) => {
              const isPriority = item.isPinned || item.tipe === 'Resmi Penting';
              const targetName = item.pengampuId?.kelasId?.nama || activeClassName;
              const dateStr = item.tanggalRilis || item.createdAt;
              const formattedDate = dateStr
                ? new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'Hari ini';

              return (
                <Card key={item._id || idx} className={`relative overflow-hidden pl-2 ${isPriority ? 'border-l-4 border-l-destructive' : ''}`}>
                  <CardHeader className="gap-3 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.isPinned && (
                          <Badge variant="destructive" className="gap-1 uppercase tracking-wider text-[10px]">
                            <Pin className="size-3 rotate-45" />
                            Pinned
                          </Badge>
                        )}
                        <Badge variant={isPriority ? 'destructive' : 'secondary'} className="gap-1 text-[10px] uppercase tracking-wider">
                          {item.tipe || 'Pengumuman'}
                        </Badge>
                        <Badge variant="outline" className="gap-1 text-[11px]">
                          <GraduationCap className="size-3" />
                          Target: {targetName}
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 text-[11px]">
                          <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                          {item.status || 'Dipublikasikan'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium shrink-0">
                        <Clock className="size-3.5 text-muted-foreground" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-1">
                      <CardTitle className="text-lg font-semibold leading-snug">
                        {item.judul}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-foreground/80 text-justify whitespace-pre-line">
                        {item.konten}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-muted/40 px-3 py-1.5 rounded-md border w-fit">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <span>Notifikasi Push &amp; Email Siswa Terkirim</span>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })
        ) : (
          <>
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
                      Target: {activeClassName}
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
                    Perubahan Jam Praktikum Lab &amp; Persiapan Uji Kompetensi REST API Postman
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                    Diberitahukan kepada seluruh siswa kelas XII RPL 1 bahwa sesi laboratorium pada hari Rabu, 30 September dialihkan ke Lab Komputer 2 (IP Static V-LAN). Seluruh siswa wajib memastikan starter template Express.js telah di-clone dan Postman Desktop Client sudah terinstal versi 11.4+. Keterlambatan toleransi maksimal 10 menit.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
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
                      Tenggat &amp; Asesmen
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      {activeClassName}
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
                    Pemberitahuan Tenggat Waktu Pengumpulan Tugas 03: Otentikasi JWT &amp; Middleware
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                    Tenggat waktu submission repositori Git dan dokumentasi Postman Runner berakhir malam ini pukul 23.59 WIB. Kebijakan toleransi keterlambatan (grace period) 24 jam dengan penalti potongan 10 poin otomatis pada sistem rekap nilai LMS.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </>
        )}
      </div>

      {/* BOTTOM OPERATIONAL DISCIPLINE BANNER */}
      <Alert className="bg-primary/5 border-primary/20 flex items-start gap-4">
        <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <AlertTitle className="text-sm font-semibold text-foreground">
            Kebijakan Komunikasi &amp; Notifikasi Multi-Peran
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
            Pengumuman yang dipublikasikan secara otomatis memicu <strong className="font-semibold text-foreground">push notification</strong> pada aplikasi mobile Murid, portal orang tua, dan tercatat dalam buku log kegiatan mengajar guru untuk supervisi Kurikulum &amp; Kepala Sekolah.
          </AlertDescription>
        </div>
      </Alert>

      {/* CREATE ANNOUNCEMENT MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Buat Pengumuman Baru</DialogTitle>
            <DialogDescription>
              Pengumuman akan langsung disiarkan ke siswa di kelas {activeClassName}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateAnnouncement} className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground">Judul Pengumuman</label>
              <Input
                placeholder="Contoh: Perubahan Jadwal Praktikum Lab"
                value={newJudul}
                onChange={(e) => setNewJudul(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Kategori / Tipe</label>
                <Select value={newTipe} onValueChange={(val: any) => setNewTipe(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Resmi Penting">Resmi Penting</SelectItem>
                    <SelectItem value="Tenggat & Asesmen">Tenggat &amp; Asesmen</SelectItem>
                    <SelectItem value="Umum">Umum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5 justify-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={newIsPinned}
                    onChange={(e) => setNewIsPinned(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary size-4"
                  />
                  <span className="text-xs font-medium text-foreground">Sematkan di Atas (Pin)</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground">Isi Pengumuman</label>
              <Textarea
                placeholder="Tuliskan detail pengumuman yang jelas dan lengkap..."
                rows={5}
                value={newKonten}
                onChange={(e) => setNewKonten(e.target.value)}
                required
              />
            </div>

            <DialogFooter className="mt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting || !newJudul.trim() || !newKonten.trim()}>
                {submitting && <Loader2 className="size-4 animate-spin mr-2" />}
                Publikasikan Pengumuman
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
