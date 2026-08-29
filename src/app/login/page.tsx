'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/components/providers/AuthProvider';

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

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-16 w-full space-y-6 flex-1">
        <div className="legal-card p-8 space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-foreground">Client Vault Sign In</h1>
            <p className="text-xs text-muted-foreground">Access your litigation pleadings & dockets</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-muted-foreground">Official Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-background border border-border" />
            </div>
            <div>
              <label className="font-bold text-muted-foreground">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl bg-background border border-border" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold">Sign In &rarr;</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
