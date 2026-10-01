'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { RoleGuard } from '@/lib/auth/role-guard';
import { useAuth } from '@/lib/auth/auth-context';

function SiswaShellWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AppShell
      role="siswa"
      userProfile={
        user?.profile
          ? {
              name: user.profile.nama || user.username,
              idNumber: user.profile.nisn ? `NISN: ${user.profile.nisn}` : undefined,
              roleSub: user.profile.roleSub || 'Siswa Aktif',
            }
          : undefined
      }
    >
      {children}
    </AppShell>
  );
}

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['SISWA']}>
      <SiswaShellWrapper>{children}</SiswaShellWrapper>
    </RoleGuard>
  );
}

