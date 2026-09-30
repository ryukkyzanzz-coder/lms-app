import React from 'react';
import AppShell from '@/components/layout/AppShell';

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
