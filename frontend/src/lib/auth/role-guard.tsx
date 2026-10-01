'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { UserRole, ROLE_ROUTES } from './auth-types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { role, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      // User is authenticated but role is not allowed here
      const fallbackRoute = ROLE_ROUTES[role] || '/login';
      router.replace(fallbackRoute);
    }
  }, [isLoading, isAuthenticated, role, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Memverifikasi Hak Akses...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
