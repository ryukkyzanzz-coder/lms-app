'use client';

import React, { useEffect, useState } from 'react';
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
  Info,
  Loader2,
  Pin
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
import { fetchAPI } from '@/lib/api';

const DEFAULT_MOCK_ANNOUNCEMENTS = [
  {
    _id: '1',
    judul: 'Perubahan Jadwal Praktikum Lab Komputer',
    konten: 'Diinformasikan kepada seluruh siswa kelas XII RPL 1, dikarenakan adanya maintenance server di Lab 1, jadwal praktikum Pemrograman Web besok (Selasa) dipindah ke Lab Komputer 2. Mohon hadir tepat waktu.',
    tipe: 'Resmi Penting',
    isPinned: true,
    isUnread: true,
    author: 'Budi Pratama, S.Kom.',
    authorInitial: 'BP',
    mapel: 'Pemrograman Web & Perangkat Bergerak',
    tanggal: 'Hari ini, 08:30 WIB',
  },
  {
    _id: '2',
    judul: 'Materi Tambahan: Dokumentasi API Express.js',
    konten: 'Bagi yang kesulitan mengerjakan Tugas 03, Bapak sudah mengunggah link referensi tambahan ke dokumentasi resmi Express.js dan contoh implementasi JWT di folder materi. Silakan dipelajari.',
    tipe: 'Tenggat & Asesmen',
    isPinned: false,
    isUnread: false,
    author: 'Budi Pratama, S.Kom.',
    authorInitial: 'BP',
    mapel: 'Pemrograman Web & Perangkat Bergerak',
    tanggal: 'Kemarin, 14:15 WIB',
  },
  {
    _id: '3',
    judul: 'Pembayaran SPP Bulan September 2026',
    konten: 'Diberitahukan kepada seluruh siswa, pembayaran SPP bulan September maksimal tanggal 10. Bagi yang sudah transfer mohon konfirmasi ke Tata Usaha.',
    tipe: 'Umum',
    isPinned: false,
    isUnread: false,
    author: 'Tata Usaha SMK CITRA NEGARA',
    authorInitial: 'TU',
    mapel: 'Sekolah',
    tanggal: '23 Sep 2026',
  },
];

export default function SiswaPengumumanPage() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>(DEFAULT_MOCK_ANNOUNCEMENTS);
  const [activeTab, setActiveTab] = useState<'semua' | 'unread' | 'penting'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadAnnouncements() {
      try {
        const res = await fetchAPI<any>('/students/me/announcements');
        if (isMounted && res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => {
            const pengampu = item.pengampuId;
            const author = pengampu?.guruId?.nama || 'Guru Pengampu';
            const initials = author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'GP';
            const mapel = pengampu?.mataPelajaranId?.nama || 'Mata Pelajaran';
            const dateStr = item.tanggalRilis || item.createdAt;
            const tanggal = dateStr
              ? new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Hari ini';

            return {
              _id: item._id,
              judul: item.judul,
              konten: item.konten,
              tipe: item.tipe || 'Umum',
              isPinned: item.isPinned || false,
              isUnread: item.isPinned || false,
              author,
              authorInitial: initials,
              mapel,
              tanggal,
            };
          });
          setAnnouncements(mapped);
        }
      } catch (err) {
        console.error('Failed to load announcements:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.konten.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'unread') {
      return item.isUnread || item.isPinned;
    }
    if (activeTab === 'penting') {
      return item.isPinned || item.tipe === 'Resmi Penting' || item.tipe === 'Penting';
    }
    return true;
  });

  const unreadCount = announcements.filter((a) => a.isUnread || a.isPinned).length;

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
              {unreadCount} Belum Dibaca
            </Badge>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
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
            <Button
              size="sm"
              variant={activeTab === 'semua' ? 'default' : 'outline'}
              className="text-xs"
              onClick={() => setActiveTab('semua')}
            >
              Semua ({announcements.length})
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'unread' ? 'default' : 'outline'}
              className="text-xs"
              onClick={() => setActiveTab('unread')}
            >
              Belum Dibaca ({unreadCount})
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'penting' ? 'default' : 'outline'}
              className="text-xs"
              onClick={() => setActiveTab('penting')}
            >
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        {filteredAnnouncements.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground text-sm">
              Tidak ada pengumuman yang sesuai dengan filter atau pencarian Anda.
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map((item, index) => {
            const isPriority = item.isPinned || item.tipe === 'Resmi Penting';
            return (
              <Link key={item._id || index} href={`/siswa/pengumuman/${item._id}`} className="group block">
                <Card className={`hover:border-primary/50 transition-all ${isPriority ? 'border-l-4 border-l-primary' : 'opacity-90 hover:opacity-100'} relative overflow-hidden`}>
                  <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-full ${isPriority ? 'bg-primary/10 text-primary' : item.mapel === 'Sekolah' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'} flex items-center justify-center shrink-0`}>
                        {isPriority ? <Megaphone className="h-5 w-5" /> : item.mapel === 'Sekolah' ? <Bell className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.judul}
                          </h2>
                          {item.isPinned && (
                            <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50 text-[10px] font-semibold">
                              <Pin className="h-3 w-3 fill-amber-600" />
                              Disematkan
                            </Badge>
                          )}
                          {item.isUnread && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                              Baru
                            </Badge>
                          )}
                          <Badge variant={isPriority ? 'destructive' : 'secondary'} className="text-[10px] font-semibold">
                            {item.tipe}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-4xl">
                          {item.konten}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                              {item.authorInitial}
                            </span>
                            {item.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {item.tanggal}
                          </span>
                          <span>•</span>
                          <span className="text-muted-foreground">
                            {item.mapel}
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
            );
          })
        )}
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
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}

