'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { RoleGuard } from '@/lib/auth/role-guard';
import { useAuth } from '@/lib/auth/auth-context';

function KepsekShellWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AppShell
      role="kepsek"
      userProfile={
        user?.profile
          ? {
              name: user.profile.nama || 'Kepala Sekolah',
              idNumber: user.profile.nip ? `NIP: ${user.profile.nip}` : undefined,
              roleSub: user.profile.roleSub || 'Kepala Sekolah',
            }
          : undefined
      }
    >
      {children}
    </AppShell>
  );
}

export default function KepsekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['KEPALA_SEKOLAH']}>
      <KepsekShellWrapper>{children}</KepsekShellWrapper>
    </RoleGuard>
  );
}

