'use client';

import React, { useState, useEffect } from 'react';
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
import { fetchAPI } from '@/lib/api';

export default function SiswaTugasPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [gradesData, setGradesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
        const [assignRes, gradesRes] = await Promise.allSettled([
          fetchAPI(`/students/me/assignments?${queryParams.toString()}`),
          fetchAPI('/students/me/grades'),
        ]);

        if (isMounted) {
          if (assignRes.status === 'fulfilled' && assignRes.value?.success) {
            setAssignments(assignRes.value.data || []);
          }
          if (gradesRes.status === 'fulfilled' && gradesRes.value?.success) {
            setGradesData(gradesRes.value.data);
          }
        }
      } catch (err) {
        console.error('Failed to load assignments:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const defaultTasks = [
    {
      _id: 'tugas-03',
      judul: 'Tugas 03: Implementasi Autentikasi JWT & Middleware Express.js',
      deskripsi: 'Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer JWT pada protected route data siswa.',
      mapelId: { kode: 'RPL-301', nama: 'Pemrograman Web & Perangkat Bergerak' },
      deadline: '2026-09-30T23:59:00.000Z',
      hasSubmitted: false,
      tag: 'Praktikum',
      isUrgent: true,
    },
    {
      _id: 'quiz-02',
      judul: 'Quiz 02: Logika Pemrograman & Query Relasional Kompleks',
      deskripsi: 'Ujian formatif penguasaan join multi-tabel, nested sub-queries, dan indexing database SQL pada engine MySQL/PostgreSQL.',
      mapelId: { kode: 'RPL-302', nama: 'Basis Data & SQL Server' },
      deadline: '2026-10-02T15:00:00.000Z',
      hasSubmitted: false,
      tag: 'Quiz',
      isUrgent: false,
    },
    {
      _id: 'tugas-02',
      judul: 'Tugas 02: Perancangan ERD Database Toko Online',
      deskripsi: 'Membuat diagram relasi entitas lengkap dengan kardinalitas 1:N dan M:N, normalisasi sampai bentuk 3NF.',
      mapelId: { kode: 'RPL-302', nama: 'Basis Data & SQL Server' },
      deadline: '2026-09-20T23:59:00.000Z',
      hasSubmitted: true,
      tag: 'Praktikum',
      score: '90.0',
    },
  ];

  // Merge real assignments if available
  const displayTasks = assignments.length > 0
    ? assignments.map((a: any) => ({
        _id: a._id,
        judul: a.judul,
        deskripsi: a.deskripsi,
        mapelId: a.mapelId || { kode: 'RPL', nama: 'Mata Pelajaran' },
        deadline: a.deadline,
        hasSubmitted: a.hasSubmitted || !!a.mySubmission,
        tag: a.judul?.toLowerCase().includes('quiz') ? 'Quiz' : 'Praktikum',
        isUrgent: !a.hasSubmitted && new Date(a.deadline).getTime() - Date.now() < 86400000 * 4,
        score: a.mySubmission?.nilai !== undefined ? a.mySubmission.nilai : undefined,
      }))
    : defaultTasks;

  const activeCount = displayTasks.filter((t) => !t.hasSubmitted).length;
  const completedCount = displayTasks.filter((t) => t.hasSubmitted).length;
  const gradedList = displayTasks.filter((t) => typeof t.score === 'number');
  const avgGrade = gradedList.length > 0
    ? Math.round(gradedList.reduce((acc, t) => acc + (t.score || 0), 0) / gradedList.length * 10) / 10
    : 88.5;

  const filteredTasks = displayTasks.filter((t) => {
    if (filter === 'active' && t.hasSubmitted) return false;
    if (filter === 'done' && !t.hasSubmitted) return false;
    return true;
  });

  const formatDeadline = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '30 Sep, 23:59';
    }
  };

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
                <span className="text-lg font-bold text-destructive leading-tight mt-0.5">{activeCount}</span>
              </div>
              <div className="flex flex-col px-3 border-r border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Tuntas
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-tight mt-0.5">{completedCount || 14}</span>
              </div>
              <div className="flex flex-col px-3">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                  Rata-rata
                </span>
                <span className="text-lg font-bold text-primary leading-tight mt-0.5">{avgGrade}</span>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            Belum Dikerjakan ({activeCount})
          </Button>
          <Button 
            onClick={() => setFilter('done')}
            variant={filter === 'done' ? 'default' : 'outline'}
            size="sm"
            className="text-xs font-semibold whitespace-nowrap"
          >
            Selesai Dinilai ({completedCount})
          </Button>
        </div>
      </div>

      {/* 3. Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task: any) => {
          const detailHref = `/siswa/tugas/${task._id}`;
          const deadlineText = formatDeadline(task.deadline);

          return (
            <Card key={task._id} className="border border-border shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
              <CardContent className="p-5 lg:p-6 flex flex-col justify-between h-full gap-5">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="font-semibold text-[10px]">{task.mapelId?.kode || 'RPL'}</Badge>
                      <Badge variant="outline" className="font-semibold text-[10px]">{task.tag}</Badge>
                    </div>
                    {task.hasSubmitted ? (
                      <Badge variant="outline" className="gap-1 font-semibold text-[10px] text-emerald-700 bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Tuntas Diserahkan
                      </Badge>
                    ) : task.isUrgent ? (
                      <Badge variant="destructive" className="gap-1 font-semibold text-[10px]">
                        <AlertCircle className="size-3" />
                        Mendesak
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1 font-semibold text-[10px]">
                        <Clock className="size-3" />
                        Aktif
                      </Badge>
                    )}
                  </div>
                  
                  <Link href={detailHref}>
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors leading-tight mb-2">
                      {task.judul}
                    </h3>
                  </Link>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {task.deskripsi}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>Tenggat: <strong className={task.isUrgent && !task.hasSubmitted ? 'text-destructive font-semibold' : 'text-foreground'}>{deadlineText}</strong></span>
                    </div>
                    {task.score !== undefined ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Nilai: {task.score}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-medium">
                        {task.mapelId?.nama || 'Mata Pelajaran'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between gap-3">
                    <Button render={<Link href={detailHref} />} size="sm" className="w-full gap-1.5 text-xs font-semibold">
                      <span>{task.hasSubmitted ? 'Lihat Lembar Kerja' : 'Kerjakan Tugas'}</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
