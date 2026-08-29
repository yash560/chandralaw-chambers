'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/components/providers/AuthProvider';
import { Scale, Shield, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const d = await res.json();
    if (d.success) {
      login(d.user);
      router.push(d.user.role === 'counsel' ? '/admin' : '/client-vault');
    }
  };

  const handleDemoLogin = (role: 'counsel' | 'client') => {
    if (role === 'counsel') {
      const u = { id: 'counsel-1', name: 'Advocate Shlok Chandra', email: 'shlokchandra@chandralawchambers.com', role: 'counsel' as const };
      login(u);
      router.push('/admin');
    } else {
      const u = { id: 'client-1', name: 'Vikramjit Sahney (Vanguard Infra)', email: 'legal@vanguardinfra.com', role: 'client' as const };
      login(u);
      router.push('/client-vault');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-16 w-full space-y-6 flex-1">
        <div className="legal-card p-8 space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-foreground">Client Vault Sign In</h1>
            <p className="text-xs text-muted-foreground">Access your litigation pleadings & ERP</p>
          </div>

          {/* 1-Click Instant Demo Login Buttons */}
          <div className="p-3.5 rounded-2xl bg-muted/60 border border-border space-y-2">
            <div className="text-[10px] uppercase font-bold text-muted-foreground text-center">⚡ Instant 1-Click Demo Login</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('counsel')}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm flex items-center justify-center space-x-1"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Senior Counsel ERP</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('client')}
                className="py-2.5 px-3 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-bold text-[11px] flex items-center justify-center space-x-1"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Client Vault</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-muted-foreground">or sign in with credentials</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-muted-foreground">Official Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="legal@entity.com" className="w-full p-3 rounded-xl bg-background border border-border" />
            </div>
            <div>
              <label className="font-bold text-muted-foreground">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3 rounded-xl bg-background border border-border" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs">Sign In &rarr;</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
