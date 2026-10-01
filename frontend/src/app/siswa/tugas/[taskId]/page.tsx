'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CheckCircle2,
  AlertCircle,
  FileText,
  Timer,
  BookOpen,
  HelpCircle,
  Upload,
  Link as LinkIcon,
  Shield,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { fetchAPI } from '@/lib/api';

export default function SiswaDetailTugasPage() {
  const params = useParams();
  const taskId = (params?.taskId as string) || '';
  const isQuiz = taskId.includes('quiz');

  const [taskData, setTaskData] = useState<any>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [catatanSiswa, setCatatanSiswa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (!taskId) return;
    fetchAPI(`/students/me/assignments/${taskId}`)
      .then((res) => {
        if (isMounted && res?.success) {
          setTaskData(res.data);
          if (res.data?.mySubmission?.linkUrl) {
            setLinkUrl(res.data.mySubmission.linkUrl);
          }
          if (res.data?.mySubmission?.catatanSiswa) {
            setCatatanSiswa(res.data.mySubmission.catatanSiswa);
          }
        }
      })
      .catch(() => {
        // Fallback for demo routes
      });
    return () => {
      isMounted = false;
    };
  }, [taskId]);

  const handleSubmit = async () => {
    if (!linkUrl.trim()) {
      setErrorMsg('Harap masukkan tautan tugas Anda (misal URL GitHub / Google Drive)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetchAPI(`/students/me/assignments/${taskId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          linkUrl: linkUrl.trim(),
          catatanSiswa: catatanSiswa.trim() || undefined,
        }),
      });

      if (res?.success) {
        setSubmitSuccess(true);
        const updated = await fetchAPI(`/students/me/assignments/${taskId}`);
        if (updated?.success) {
          setTaskData(updated.data);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal menyerahkan tugas');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tugas = taskData?.tugas;
  const mySubmission = taskData?.mySubmission;

  const displayTitle = tugas?.judul || (isQuiz ? 'Pemahaman Asinkron: Promise & Async/Await' : 'Implementasi Autentikasi JWT & Middleware Express.js');
  const displayMapel = tugas?.mapelId?.nama || 'Pemrograman Web & Perangkat Bergerak (XII RPL 1)';
  const displayDeskripsi = tugas?.deskripsi || 'Buat skema login & register dengan hashing kata sandi (bcrypt) serta verifikasi token Bearer JWT pada protected route data siswa.';
  const displayMaxScore = tugas?.maxScore || 100;
  
  const formatDeadline = (isoDate?: string) => {
    if (!isoDate) return '1 Okt 2026, 15:00';
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '1 Okt 2026, 15:00';
    }
  };

  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-6 max-w-[1440px] mx-auto">
      {/* 1. Header & Meta Data */}
      <Card className="border border-border shadow-sm bg-card">
        <CardContent className="p-5 lg:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/dashboard" />}>Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/siswa/tugas" />}>Tugas & Penilaian</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">
                    {isQuiz ? 'Detail Quiz' : 'Detail Tugas'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1.5 font-semibold text-[10px] text-primary border-primary/30 uppercase">
                <span className="size-1.5 rounded-full bg-primary" />
                Formatif Mandiri • Bobot 10%
              </Badge>
              <Badge variant="secondary" className="font-semibold text-[10px] uppercase">
                {isQuiz ? 'CBT-EXAM-V2.4' : 'Unggah Berkas'}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <BookOpen className="size-4 text-primary" />
                  {displayMapel}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <HelpCircle className="size-4 text-muted-foreground" />
                  Budi Pratama, S.Kom.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold">
                <Timer className="size-4" />
                <span>Batas: {formatDeadline(tugas?.deadline)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col (Instructions) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="p-5 pb-3 border-b border-border">
              <CardTitle className="text-base font-semibold text-foreground">
                Deskripsi & Ketentuan Tugas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {displayDeskripsi}
              </p>

              <div className="p-4 bg-muted/40 rounded-xl border border-border flex flex-col gap-2.5">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  Materi Rujukan
                </span>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    JS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {isQuiz ? 'BAB 02: JavaScript Lanjutan' : 'BAB 03: RESTful API Backend'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {isQuiz ? 'Topik: Asynchronous Execution, Promises, dan Modern Web API' : 'Topik: JSON Web Token & Security Middleware'}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                {isQuiz ? 'Kisi-Kisi Distribusi Indikator Soal' : 'Instruksi Pengerjaan Tugas Praktikum'}
              </h3>
              
              {isQuiz ? (
                <div className="flex flex-col gap-3">
                  <Card className="border border-border bg-card">
                    <CardContent className="p-4 flex items-start gap-3.5">
                      <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Konsep Sinkron vs Asinkron (20%)</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Mengidentifikasi perbedaan blocking dan non-blocking code pada Event Loop V8 Engine.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <ol className="list-decimal pl-5 space-y-2.5">
                    <li>Buat sebuah proyek Express.js baru atau gunakan repositori starter yang telah disediakan.</li>
                    <li>Implementasikan rute <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">POST /api/auth/login</code> yang memvalidasi kredensial statis dan mengembalikan token JWT.</li>
                    <li>Buat middleware <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">authenticateToken</code> di folder terpisah.</li>
                    <li>Lindungi rute <code className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs font-mono text-foreground">GET /api/users/profile</code> menggunakan middleware tersebut.</li>
                    <li>Kumpulkan kode sumber dalam bentuk tautan URL GitHub / Google Drive.</li>
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Col (Submission/Action) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-border shadow-sm sticky top-20">
            <CardHeader className="p-5 pb-4 bg-muted/40 border-b border-border space-y-1">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Status Pengerjaan
              </span>
              <CardTitle className="text-lg font-semibold text-foreground">
                {mySubmission?.status === 'GRADED'
                  ? 'Sudah Dinilai'
                  : mySubmission?.status === 'SUBMITTED' || mySubmission?.status === 'RESUBMITTED'
                    ? 'Sudah Diserahkan'
                    : 'Belum Diserahkan'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Nilai Saat Ini</span>
                  <span className="font-semibold text-foreground">
                    {mySubmission?.nilai !== undefined ? `${mySubmission.nilai} / ${displayMaxScore}` : `- / ${displayMaxScore}`}
                  </span>
                </div>
                {mySubmission?.catatanGuru && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-xs text-foreground">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">Catatan Guru:</span>
                    <p className="italic">&ldquo;{mySubmission.catatanGuru}&rdquo;</p>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Percobaan ke</span>
                  <span className="font-semibold text-foreground">
                    {mySubmission ? '1' : '0'} dari {isQuiz ? '1' : '3'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tenggat Waktu</span>
                  <span className="font-bold text-destructive">{formatDeadline(tugas?.deadline)}</span>
                </div>
              </div>
              
              <Separator />
              
              {isQuiz ? (
                <div className="flex flex-col gap-3">
                  <Alert variant="destructive" className="py-2.5 px-3">
                    <AlertCircle className="size-4" />
                    <AlertDescription className="text-xs leading-relaxed ml-2">
                      Sistem CBT akan mengunci browser Anda saat ujian dimulai. Pastikan koneksi internet stabil dan baterai perangkat cukup.
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full text-xs font-semibold">
                    Mulai Ujian Sekarang
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {submitSuccess && (
                    <Alert className="py-2.5 px-3 bg-emerald-500/10 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <AlertDescription className="text-xs font-medium ml-2">
                        Tugas berhasil dikumpulkan dan tersimpan di sistem!
                      </AlertDescription>
                    </Alert>
                  )}

                  {errorMsg && (
                    <Alert variant="destructive" className="py-2 px-3">
                      <AlertCircle className="size-4" />
                      <AlertDescription className="text-xs ml-2">
                        {errorMsg}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="relative">
                    <LinkIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Input 
                      type="url" 
                      placeholder="Tempel tautan (GitHub, Drive, dll)" 
                      className="h-9 pl-9 pr-3 text-xs"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>

                  <Input 
                    type="text" 
                    placeholder="Catatan tambahan untuk guru (opsional)" 
                    className="h-9 px-3 text-xs"
                    value={catatanSiswa}
                    onChange={(e) => setCatatanSiswa(e.target.value)}
                  />

                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="w-full text-xs font-semibold mt-1"
                  >
                    {isSubmitting ? 'Menyerahkan...' : mySubmission ? 'Perbarui Penyerahan' : 'Serahkan Tugas'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
