import React from 'react';
import AppShell from '@/components/layout/AppShell';

export default function KurikulumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="kurikulum">{children}</AppShell>;
}
