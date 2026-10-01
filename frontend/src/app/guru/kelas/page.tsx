'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTeacher } from '@/lib/guru/teacher-context';
import { 
  Download, 
  BookOpen, 
  Users, 
  UserCheck, 
  Clock, 
  ClipboardCheck, 
  Search, 
  Grid, 
  List,
  MonitorSmartphone,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function KelasPage() {
  const {
    availableClasses: classes,
    isLoadingClasses: loading,
    errorClasses: error,
    refetchClasses: loadClasses,
  } = useTeacher();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [tingkatFilter, setTingkatFilter] = useState('all');

  const totalSiswa = classes.reduce((acc, curr) => acc + (curr.siswaIds?.length || 0), 0);
  const totalRombel = classes.length;
  
  // Filter search & tingkat
  const filteredKelas = classes.filter((k) => {
    const matchesSearch =
      k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTingkat =
      tingkatFilter === 'all' || k.tingkat.toUpperCase() === tingkatFilter.toUpperCase();

    return matchesSearch && matchesTingkat;
  });

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6">
      {/* 1. Academic Command Header */}
      <Card>
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5 font-bold uppercase tracking-wider text-[11px] text-primary border-primary/30">
                <span className="size-1.5 rounded-full bg-primary" />
                Penugasan Aktif
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">SK No. 421/182/SMK.01/2026</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Kelas Saya</h1>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Daftar rombel dan kompetensi keahlian yang diampu pada Semester Ganjil TA 2026/2027 berdasarkan SK Pembagian Tugas Mengajar Kurikulum.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Button variant="outline" className="gap-2">
              <Download className="size-4 text-primary" />
              <span>Unduh Jadwal PDF</span>
            </Button>
            <Button className="gap-2">
              <BookOpen className="size-4" />
              <span>Jurnal Mengajar Semester</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Operational Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Rombel</span>
            <span className="text-lg font-bold text-foreground mt-0.5">
              {loading ? '...' : `${totalRombel} Rombel`}
            </span>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <UserCheck className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Peserta Didik</span>
            <span className="text-lg font-bold text-foreground mt-0.5">
              {loading ? '...' : `${totalSiswa} Siswa`}
            </span>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <Clock className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Beban Mengajar</span>
            <span className="text-lg font-bold text-foreground mt-0.5">24 JP / Pekan</span>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            <ClipboardCheck className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status Validasi</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400 mt-0.5">100% Terverifikasi</span>
          </div>
        </Card>
      </div>

      {/* 3. Filter & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input 
              type="text" 
              className="w-full md:w-[280px] pl-9"
              placeholder="Cari rombel atau program..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select defaultValue="ganjil">
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ganjil">Semester Ganjil 2026/2027 (Aktif)</SelectItem>
              <SelectItem value="genap">Semester Genap 2025/2026 (Arsip)</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={tingkatFilter}
            onValueChange={(val) => setTingkatFilter((val as string) || 'all')}
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Semua Tingkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tingkat (Kelas X, XI, XII)</SelectItem>
              <SelectItem value="X">Kelas X (Tingkat 1)</SelectItem>
              <SelectItem value="XI">Kelas XI (Tingkat 2)</SelectItem>
              <SelectItem value="XII">Kelas XII (Tingkat 3)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border w-fit shrink-0">
          <Button 
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() => setViewMode('grid')}
            title="Tampilan Kartu"
          >
            <Grid className="size-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'secondary' : 'ghost'}
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() => setViewMode('table')}
            title="Tabel Operasional Detail"
          >
            <List className="size-3.5" />
            <span className="hidden sm:inline">Tabel Operasional</span>
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="size-5" />
          <AlertTitle>Gagal Memuat Data Kelas</AlertTitle>
          <AlertDescription className="mt-2 flex items-center justify-between gap-4">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadClasses}
              className="gap-1.5 shrink-0"
            >
              <RotateCcw className="size-3.5" />
              <span>Coba Lagi</span>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-40 h-6" />
                </div>
                <Skeleton className="w-12 h-12 rounded-xl" />
              </div>
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-10" />
            </Card>
          ))}
        </div>
      )}

      {/* 4. Grid View */}
      {!loading && !error && viewMode === 'grid' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredKelas.length === 0 ? (
            <Card className="col-span-1 xl:col-span-2">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center gap-3">
                <DoorOpen className="size-10 text-muted-foreground/50" />
                <h3 className="text-base font-semibold text-foreground">Tidak Ada Kelas Ditemukan</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  {searchQuery || tingkatFilter !== 'all'
                    ? 'Tidak ada rombongan belajar yang sesuai dengan kriteria filter pencarian.'
                    : 'Belum ada kelas yang terdaftar untuk penugasan mengajar Anda.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredKelas.map((kelas) => (
              <Card 
                key={kelas._id} 
                className="flex flex-col hover:border-primary/40 transition-all overflow-hidden group"
              >
                <CardContent className="p-6 flex flex-col gap-5 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          Tingkat {kelas.tingkat}
                        </span>
                        <span className="size-1 rounded-full bg-border" />
                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20">
                          {kelas.status || 'Kelas Aktif'}
                        </Badge>
                      </div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {kelas.nama}
                      </h2>
                      <span className="text-xs text-muted-foreground font-medium mt-0.5">
                        Kompetensi: {kelas.program}
                      </span>
                    </div>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                      <MonitorSmartphone className="size-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-muted-foreground shrink-0" />
                      <span>{kelas.siswaIds?.length || 0} Siswa Terdaftar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                      <span>Data Dapodik Valid</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1.5 font-semibold text-xs py-1">
                      <DoorOpen className="size-3.5 text-primary" />
                      Ruang Rombel Aktif
                    </Badge>
                  </div>
                </CardContent>
                
                <div className="mt-auto border-t border-border bg-muted/20 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-muted-foreground font-medium">Sinkron dengan Sistem Akademik</span>
                  <Button render={<Link href={`/guru/kelas/${kelas._id}`} />} size="sm" variant="outline" className="w-full sm:w-auto gap-1.5 font-semibold text-xs">
                    <span>Buka Ruang Kelas</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* 5. Table View */}
      {!loading && !error && viewMode === 'table' && (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-12 text-[11px] font-bold uppercase tracking-wider">No</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Rombel / Kelas</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Tingkat</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Kompetensi Keahlian</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-center">Jumlah Siswa</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKelas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground text-sm">
                    Tidak ada kelas yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredKelas.map((kelas, idx) => (
                  <TableRow key={kelas._id}>
                    <TableCell className="font-mono text-muted-foreground text-xs">{idx + 1}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground text-sm">
                        {kelas.nama}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs font-semibold">
                        Kelas {kelas.tingkat}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium text-xs">
                      {kelas.program}
                    </TableCell>
                    <TableCell className="text-center font-mono font-bold text-foreground text-sm">
                      {kelas.siswaIds?.length || 0}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px] font-bold text-primary border-primary/20">
                        {kelas.status || 'Aktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button render={<Link href={`/guru/kelas/${kelas._id}`} />} size="sm" variant="outline" className="gap-1 text-xs">
                        <span>Buka</span>
                        <ArrowRight className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Bottom Validation Note */}
      <Card className="border-border bg-muted/20">
        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Penetapan rombel dan jam tatap muka sinkron dengan sistem <strong className="text-foreground">Dapodik</strong> & <strong className="text-foreground">Tim Kurikulum Sekolah</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground font-medium bg-card px-3 py-1.5 rounded-lg border border-border shrink-0">
            <span>Status: <strong className="text-emerald-600">Tersinkronisasi</strong></span>
            <span className="w-px h-3 bg-border" />
            <span>ID: #DPK-2026-0926</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
