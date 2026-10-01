'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export interface UserProfileProps {
  name: string;
  idNumber?: string;
  roleSub?: string;
}

export default function AppShell({ 
  children, 
  role = 'guru',
  userProfile,
}: { 
  children: React.ReactNode; 
  role?: 'guru' | 'siswa' | 'kepsek' | 'kurikulum' | 'admin';
  userProfile?: UserProfileProps;
}) {
  return (
    <SidebarProvider defaultOpen={true} className="min-h-screen bg-background">
      <Sidebar role={role} userProfile={userProfile} />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <TopHeader role={role} userProfile={userProfile} />
        <div className="flex-1 max-w-[1440px] w-full mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
