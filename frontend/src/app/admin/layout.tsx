'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { RoleGuard } from '@/lib/auth/role-guard';
import { useAuth } from '@/lib/auth/auth-context';

function AdminShellWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AppShell
      role="admin"
      userProfile={
        user?.profile
          ? {
              name: user.profile.nama || 'Administrator',
              idNumber: user.profile.nip ? `NIP: ${user.profile.nip}` : undefined,
              roleSub: user.profile.roleSub || 'Kepala Tata Usaha',
            }
          : undefined
      }
    >
      {children}
    </AppShell>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <AdminShellWrapper>{children}</AdminShellWrapper>
    </RoleGuard>
  );
}

