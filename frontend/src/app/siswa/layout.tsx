import React from 'react';
import AppShell from '@/components/layout/AppShell';

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="siswa">{children}</AppShell>;
}
