'use client';

import React, { useState, useEffect } from 'react';
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
import { fetchAPI } from '@/lib/api';

export default function SiswaMateriPage() {
  const [mapel, setMapel] = useState('pwb');
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadMaterials = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
        const res = await fetchAPI(`/students/me/materials?${queryParams.toString()}`);
        if (isMounted && res?.success) {
          setMaterials(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load materials:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadMaterials();
    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const defaultModules = [
    {
      _id: 'modul-08',
      judul: 'Arsitektur RESTful API & Setup Node.js Express',
      deskripsi: 'Pengenalan konsep arsitektur REST, statelessness, standar status code HTTP, dan setup proyek awal menggunakan Express.js serta Nodemon.',
      badgeText: 'Modul 08',
      statusText: 'Sedang Dipelajari',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop',
      duration: '12:45 Menit',
      isCompleted: false,
    },
    {
      _id: 'modul-07',
      judul: 'Lifecycle React.js & Hooks Lanjutan (useEffect)',
      deskripsi: 'Memahami daur hidup komponen fungsional di React dan penggunaan useEffect untuk fetching data API eksternal.',
      badgeText: 'Modul 07',
      statusText: 'Selesai Dipelajari',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
      duration: 'Selesai',
      isCompleted: true,
      score: '92.0',
    },
    {
      _id: 'modul-09',
      judul: 'Implementasi JSON Web Token (JWT) & Middleware Security',
      deskripsi: 'Konstruksi authentication stateless, JWT signing & verification, password hashing dengan bcrypt, dan pembuatan protected routes.',
      badgeText: 'Modul 09',
      statusText: 'Materi Berikutnya',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      duration: '25 Menit',
      isCompleted: false,
    },
  ];

  // Merge real materials if present
  const displayModules = materials.length > 0
    ? materials.map((m: any, idx: number) => ({
        _id: m._id,
        judul: m.judul,
        deskripsi: m.deskripsi,
        badgeText: `Modul 0${idx + 1}`,
        statusText: idx === 0 ? 'Sedang Dipelajari' : 'Materi Pembelajaran',
        progress: idx === 0 ? 25 : 0,
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop',
        duration: '15 Menit',
        isCompleted: false,
      }))
    : defaultModules;

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        {displayModules.map((mod: any) => {
          const detailHref = `/siswa/materi/${mod._id}`;
          return (
            <Card key={mod._id} className="border border-border shadow-sm hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden shrink-0 relative group">
                  <Image 
                    unoptimized
                    src={mod.image} 
                    alt={mod.judul}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[10px] font-semibold text-foreground">
                    {mod.duration}
                  </div>
                  {mod.isCompleted && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="size-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="size-5" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={mod.isCompleted ? 'outline' : 'secondary'} className="font-semibold text-[10px] uppercase tracking-wider">
                      {mod.badgeText}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 font-semibold text-[10px] gap-1">
                      {mod.isCompleted ? <CheckCircle2 className="size-3 text-emerald-600" /> : <span className="size-1.5 rounded-full bg-emerald-500" />}
                      {mod.statusText}
                    </Badge>
                  </div>
                  
                  <Link href={detailHref}>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-1.5">
                      {mod.judul}
                    </h3>
                  </Link>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                    {mod.deskripsi}
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
                      {mod.isCompleted ? 'Skor Formatif' : 'Progres Saya'}
                    </span>
                    <span className={`text-lg font-bold ${mod.isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary'} leading-none`}>
                      {mod.isCompleted ? mod.score : `${mod.progress}%`}
                    </span>
                  </div>
                  <Button render={<Link href={detailHref} />} size="sm" className="gap-1.5 text-xs font-semibold">
                    <span>{mod.isCompleted ? 'Pelajari Ulang' : 'Lanjutkan Belajar'}</span>
                    <PlayCircle className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
