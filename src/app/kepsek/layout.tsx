import React from 'react';
import AppShell from '@/components/layout/AppShell';

export default function KepsekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell role="kepsek">
      {children}
    </AppShell>
  );
}
