'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  Compass, Home, Map, FileText, Calendar, 
  Image as ImageIcon, LogOut, User, Menu, X, ShieldCheck
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // If loading or login page, skip layout decorations
  if (status === 'loading' || pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: Home },
    { label: 'Destinations', href: '/admin/destinations', icon: Map },
    { label: 'Packages', href: '/admin/packages', icon: Compass },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Blogs & Diaries', href: '/admin/blogs', icon: FileText },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-navy flex flex-col md:flex-row text-left">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy-light border-r border-white/10 flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          {/* Header */}
          <div className="h-20 border-b border-white/10 flex items-center gap-3 px-6">
            <Compass className="h-7 w-7 text-primary animate-spin-slow" />
            <span className="text-base font-black tracking-wider bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              ADMIN PORTAL
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1 text-sm font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-4">
          {session?.user && (
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="bg-primary/20 text-primary p-2 rounded-lg">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate">{session.user.name}</span>
                <span className="text-[9px] text-primary uppercase font-black flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> {(session.user as any).role || 'EDITOR'}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 py-2.5 rounded-xl text-xs font-bold text-gray-300 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
