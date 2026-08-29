'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BLOG_POSTS, CHAMBERS_INFO } from '@/lib/constants';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((b) => b.slug === slug);

  if (!post) notFound();

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8 flex-1">
        <Link href="/blog" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Legal Journal</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{post.category}</span>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">{post.title}</h1>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center space-x-1"><User className="w-3.5 h-3.5" /> <strong>{post.author}</strong></span>
            <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{post.publishedDate}</span></span>
            <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /> <span>{post.readTime}</span></span>
          </div>
        </div>

        <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-border shadow-xl">
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="legal-card p-6 sm:p-10 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </article>
      </main>

      <Footer />
    </div>
  );
}
