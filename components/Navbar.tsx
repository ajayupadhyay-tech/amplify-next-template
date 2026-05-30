'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Compass, Phone, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="h-8 w-8 text-primary animate-spin-slow" />
            <Link href="/" className="text-xl md:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-orange-300 to-primary bg-clip-text text-transparent">
              INCREDIBLE INDIA
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/packages" className="hover:text-primary transition-colors">Packages</Link>
            <Link href="/regions" className="hover:text-primary transition-colors">Regions</Link>
            <Link href="/blogs" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/plan" className="hover:text-primary transition-colors">Plan Trip</Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 98765 43210</span>
            </a>
            
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/admin" className="text-sm font-semibold text-primary hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-300 hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/admin" className="border border-white/20 hover:border-primary text-white font-semibold text-sm px-4 py-1.5 rounded-full transition-all">
                Admin
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <Link href="/" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/packages" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>Packages</Link>
          <Link href="/regions" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>Regions</Link>
          <Link href="/blogs" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/about" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/plan" className="block py-2 text-base font-semibold hover:text-primary" onClick={() => setIsOpen(false)}>Plan Trip</Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-300 hover:text-white">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 98765 43210</span>
            </a>
            
            {session ? (
              <div className="flex flex-col gap-3">
                <Link href="/admin" className="text-primary font-bold text-center py-2.5 rounded-full bg-white/5" onClick={() => setIsOpen(false)}>
                  Go to Dashboard
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-300 text-center font-semibold py-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/admin" className="bg-primary text-center font-bold px-6 py-3 rounded-full" onClick={() => setIsOpen(false)}>
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
