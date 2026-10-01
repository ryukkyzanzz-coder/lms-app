'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
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
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PenilaianPage() {
  return (
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 gap-8">
      {/* Breadcrumb & Header */}
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
              <BreadcrumbPage>Penilaian</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Penilaian
          </h1>
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
            Akademik
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Kelola nilai dan rekap penilaian akademik siswa.
        </p>
      </div>

      {/* Empty State / In-Development Card */}
      <Card className="flex-1 flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <CardContent className="flex flex-col items-center justify-center gap-4 max-w-sm pt-6">
          <div className="w-14 h-14 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
            <GraduationCap className="size-7" />
          </div>
          <div className="flex flex-col gap-1.5">
            <CardTitle className="text-base font-semibold">
              Fitur Penilaian
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Modul penilaian akademik sedang dalam tahap integrasi kurikulum dan akan segera tersedia.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
