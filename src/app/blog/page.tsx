'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BLOG_POSTS, CHAMBERS_INFO } from '@/lib/constants';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12 flex-1">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chambers Jurisprudence Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Litigation Insights & Analysis
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Authoritative analysis on commercial arbitration, Article 136 SLPs, and Section 9 emergency injunctions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((b) => (
            <div key={b.id} className="legal-card overflow-hidden flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img src={b.heroImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-[10px]">
                  {b.category}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[10px] text-muted-foreground">{b.publishedDate} • {b.readTime}</div>
                  <h2 className="font-extrabold text-base text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
                    {b.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-3">{b.excerpt}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link href={`/blog/${b.slug}`} className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1">
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
