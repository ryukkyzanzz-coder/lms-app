'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { TeacherProvider, useTeacher } from '@/lib/guru/teacher-context';

function GuruShellWrapper({ children }: { children: React.ReactNode }) {
  const { teacher } = useTeacher();

  return (
    <AppShell
      role="guru"
      userProfile={
        teacher
          ? {
              name: teacher.nama,
              idNumber: `NIP. ${teacher.nip}`,
              roleSub: 'Guru Pengampu',
            }
          : undefined
      }
    >
      {children}
    </AppShell>
  );
}

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherProvider>
      <GuruShellWrapper>{children}</GuruShellWrapper>
    </TeacherProvider>
  );
}
