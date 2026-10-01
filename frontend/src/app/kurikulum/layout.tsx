'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { RoleGuard } from '@/lib/auth/role-guard';
import { useAuth } from '@/lib/auth/auth-context';

function KurikulumShellWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AppShell
      role="kurikulum"
      userProfile={
        user?.profile
          ? {
              name: user.profile.nama || 'Waka Kurikulum',
              idNumber: user.profile.nip ? `NIP: ${user.profile.nip}` : undefined,
              roleSub: user.profile.roleSub || 'Waka Kurikulum',
            }
          : undefined
      }
    >
      {children}
    </AppShell>
  );
}

export default function KurikulumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['KURIKULUM']}>
      <KurikulumShellWrapper>{children}</KurikulumShellWrapper>
    </RoleGuard>
  );
}

