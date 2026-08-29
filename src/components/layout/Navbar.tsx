'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CHAMBERS_INFO } from '@/lib/constants';
import { useAuth } from '@/components/providers/AuthProvider';
import { Scale, Phone, Calendar, Sun, Moon, Menu, X, User } from 'lucide-react';

interface NavbarProps {
  onOpenRetainer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRetainer }) => {
  const { user, isAdminOrCounsel } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0 shadow-inner">
              <Scale className="w-5 h-5" />
            </div>
            <div className="shrink-0 flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-black text-sm sm:text-base lg:text-lg tracking-tight text-foreground">
                  {CHAMBERS_INFO.shortName}
                </span>
                <span className="px-1.5 py-0.2 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase">
                  Advocates
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                {CHAMBERS_INFO.managingPartner} • Defence Colony, New Delhi
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold text-muted-foreground">
            <Link href="/" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">Chambers</Link>
            <Link href="/about" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">About</Link>
            <Link href="/practice-areas" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">Practice Areas</Link>
            <Link href="/cause-list" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">Cause List</Link>
            <Link href="/blog" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">Journal</Link>
            <Link href="/faq" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">FAQ</Link>
            <Link href="/contact" className="px-3 py-2 rounded-xl hover:text-foreground hover:bg-muted">Offices</Link>
          </nav>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={`tel:${CHAMBERS_INFO.phone}`}
              className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{CHAMBERS_INFO.phone}</span>
            </a>

            {user ? (
              <Link
                href={isAdminOrCounsel ? '/admin' : '/client-vault'}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-muted text-xs font-bold text-foreground"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-xl bg-muted text-xs font-bold text-muted-foreground"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={onOpenRetainer}
              className="hidden sm:flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Brief Counsel</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-card border border-border text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 bg-card border-b border-border space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-muted-foreground">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">Chambers</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">About</Link>
            <Link href="/practice-areas" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">Practices</Link>
            <Link href="/cause-list" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">Cause List</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">Journal</Link>
            <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">FAQ</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-muted/60">Offices</Link>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-blue-600 text-white font-bold text-center">Sign In</Link>
          </div>
        </div>
      )}
    </header>
  );
};
