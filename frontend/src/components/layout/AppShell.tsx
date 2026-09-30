'use client';

import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[260px] flex-col fixed inset-y-0 z-50">
        <Sidebar role={role} userProfile={userProfile} />
      </div>
      
      {/* Mobile Sidebar overlay through Sheet will be handled inside TopHeader or a separate MobileNav component */}
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:pl-[260px]">
        <TopHeader 
          onOpenMobileMenu={() => setMobileMenuOpen(true)} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          role={role}
          userProfile={userProfile}
        />
        <main className="flex-1 pt-[60px] max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
