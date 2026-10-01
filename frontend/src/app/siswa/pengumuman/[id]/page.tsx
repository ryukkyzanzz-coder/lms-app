'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Home,
  Megaphone,
  Calendar,
  ArrowLeft,
  FileText,
  Download,
  AlertTriangle,
  Loader2,
  Clock,
  Pin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { fetchAPI } from '@/lib/api';

const MOCK_ANNOUNCEMENTS: Record<string, any> = {
  '1': {
    _id: '1',
    judul: 'Perubahan Jadwal Praktikum Lab Komputer',
    konten: `Diinformasikan kepada seluruh siswa kelas XII RPL 1, dikarenakan adanya maintenance berkala sistem operasi dan server jaringan di Lab Komputer 1, maka jadwal praktikum Pemrograman Web besok (Selasa) dipindah ke Lab Komputer 2.

Harap memperhatikan beberapa poin berikut:
1. Praktikum dimulai tepat waktu pukul 07.30 WIB.
2. Setiap siswa membawa flashdisk cadangan atau memastikan repository GitHub pribadi sudah tersinkronisasi.
3. Dilarang membawa makanan dan minuman ke dalam Lab Komputer 2.

Demikian pengumuman ini disampaikan untuk menjadi perhatian bersama.`,
    tipe: 'Resmi Penting',
    isPinned: true,
    tanggalRilis: '2026-09-30T08:30:00.000Z',
    guru: 'Budi Pratama, S.Kom.',
    mapel: 'Pemrograman Web & Perangkat Bergerak',
    lampiran: [
      { nama: 'Jadwal_Penggunaan_Lab_Komputer_Rev2.pdf', ukuran: '1.2 MB', url: '#' }
    ]
  },
  '2': {
    _id: '2',
    judul: 'Materi Tambahan: Dokumentasi API Express.js & JWT Guide',
    konten: `Bagi seluruh siswa yang sedang menyelesaikan Tugas Praktikum 03, Bapak telah menyusun panduan ringkas dan menyediakan link referensi resmi ke dokumentasi Express.js middleware dan RFC 7519 JSON Web Token.

Silakan pelajari bagian error-handling middleware dan bearer token validation. Jika ada kendala teknis dapat ditanyakan saat sesi konsultasi lab atau forum diskusi.`,
    tipe: 'Tenggat & Asesmen',
    isPinned: false,
    tanggalRilis: '2026-09-29T14:15:00.000Z',
    guru: 'Budi Pratama, S.Kom.',
    mapel: 'Pemrograman Web & Perangkat Bergerak',
    lampiran: [
      { nama: 'Cheatsheet_Express_JWT.pdf', ukuran: '850 KB', url: '#' }
    ]
  },
  '3': {
    _id: '3',
    judul: 'Pembayaran SPP Bulan September 2026',
    konten: `Diberitahukan kepada seluruh siswa SMK Citra Negara, batas akhir pembayaran SPP dan iuran operasional pendidikan bulan September 2026 adalah tanggal 10.

Bagi siswa yang telah melakukan pembayaran melalui transfer virtual account bank, mohon mengirimkan konfirmasi slip bukti ke bagian Tata Usaha Sekolah.`,
    tipe: 'Umum',
    isPinned: false,
    tanggalRilis: '2026-09-23T09:00:00.000Z',
    guru: 'Tata Usaha SMK CITRA NEGARA',
    mapel: 'Informasi Administrasi Sekolah',
    lampiran: []
  }
};

export default function SiswaPengumumanDetailPage() {
  const params = useParams();
  const announcementId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadDetail() {
      try {
        const res = await fetchAPI<any>(`/students/me/announcements/${announcementId}`);
        if (isMounted && res.data) {
          setData(res.data);
        }
      } catch (err) {
        // Fallback to mock if API returns not found or mock id used
        if (isMounted && MOCK_ANNOUNCEMENTS[announcementId]) {
          setData(MOCK_ANNOUNCEMENTS[announcementId]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (announcementId) {
      loadDetail();
    }
    return () => {
      isMounted = false;
    };
  }, [announcementId]);

  const announcement = data || MOCK_ANNOUNCEMENTS[announcementId] || MOCK_ANNOUNCEMENTS['1'];

  const pengampu = announcement.pengampuId;
  const authorName = pengampu?.guruId?.nama || announcement.guru || 'Guru Pengampu';
  const subjectName = pengampu?.mataPelajaranId?.nama || announcement.mapel || 'Pengumuman Akademik';
  const formattedDate = announcement.tanggalRilis
    ? new Date(announcement.tanggalRilis).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Waktu Rilis';

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-5xl mx-auto">
      {/* 1. BREADCRUMB */}
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
            <BreadcrumbLink href="/siswa/pengumuman">Pengumuman Akademik</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 2. BACK BUTTON */}
      <div>
        <Button render={<Link href="/siswa/pengumuman" />} variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Pusat Pengumuman</span>
        </Button>
      </div>

      {/* 3. DETAIL CARD */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {announcement.isPinned && (
              <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50 text-[10px] font-semibold">
                <Pin className="h-3 w-3 fill-amber-600" />
                Disematkan
              </Badge>
            )}
            <Badge
              variant={announcement.tipe === 'Resmi Penting' ? 'destructive' : 'secondary'}
              className="text-[10px] font-semibold"
            >
              {announcement.tipe || 'Informasi'}
            </Badge>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {announcement.judul}
          </CardTitle>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                {authorName.charAt(0)}
              </span>
              {authorName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="text-muted-foreground font-medium">{subjectName}</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Memuat isi pengumuman...</span>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line text-foreground/90 leading-relaxed text-sm">
              {announcement.konten}
            </div>
          )}

          {/* Lampiran if any */}
          {announcement.lampiran && announcement.lampiran.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Dokumen &amp; Lampiran Terkait ({announcement.lampiran.length})
              </h3>
              <div className="flex flex-col gap-2">
                {announcement.lampiran.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground">
                          {file.nama || file.name || `Lampiran_${index + 1}`}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {file.ukuran || file.size || 'Dokumen PDF'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 text-xs"
                      render={<a href={file.url || '#'} target="_blank" rel="noopener noreferrer" />}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Unduh</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-muted/20 border-t p-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Portal Pengumuman Terverifikasi SMK Citra Negara</span>
          <Button render={<Link href="/siswa/pengumuman" />} variant="outline" size="sm" className="text-xs">
            Lihat Pengumuman Lain
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
