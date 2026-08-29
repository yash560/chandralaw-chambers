'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Scale, BookOpen, Gavel, Phone, Calendar, ArrowRight, X, Shield, FileText } from 'lucide-react';
import { PRACTICE_AREAS, COURT_DOCKETS, BLOG_POSTS, CHAMBERS_INFO } from '@/lib/constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenRetainer?: () => void;
}

export const GlobalSearchModal: React.FC<Props> = ({ isOpen, onClose, onOpenRetainer }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allItems = [
    // Quick Actions
    { id: 'action-retainer', type: 'Action', title: 'Register Confidential Brief / Retainer', subtitle: 'Screen conflict with Advocate Shlok Chandra', url: '#retainer', icon: Calendar },
    { id: 'action-call', type: 'Action', title: `Call Chambers: ${CHAMBERS_INFO.phone}`, subtitle: 'Defence Colony, New Delhi', url: `tel:${CHAMBERS_INFO.phone}`, icon: Phone },
    { id: 'action-vault', type: 'Action', title: 'Open Client Litigation Pleadings Vault', subtitle: 'Access court filings, rejoinders & orders', url: '/client-vault', icon: Shield },
    
    // Practice Areas
    ...PRACTICE_AREAS.map((p) => ({
      id: `prac-${p.id}`,
      type: 'Practice Roster',
      title: p.name,
      subtitle: `${p.category} • Lead: ${p.leadCounsel}`,
      url: `/practice-areas/${p.slug}`,
      icon: Scale,
    })),

    // Active Court Dockets
    ...COURT_DOCKETS.map((d) => ({
      id: `doc-${d.id}`,
      type: 'Cause List',
      title: `${d.caseNumber}: ${d.matterTitle}`,
      subtitle: `${d.forum} • ${d.courtRoom} • Stage: ${d.stage}`,
      url: `/cause-list`,
      icon: Gavel,
    })),

    // Journal / Blogs
    ...BLOG_POSTS.map((b) => ({
      id: `blog-${b.id}`,
      type: 'Legal Journal',
      title: b.title,
      subtitle: `${b.category} • ${b.readTime}`,
      url: `/blog/${b.slug}`,
      icon: BookOpen,
    })),
  ];

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 7)
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: (typeof allItems)[0]) => {
    onClose();
    if (item.id === 'action-retainer') {
      if (onOpenRetainer) onOpenRetainer();
      else router.push('/contact');
    } else if (item.url.startsWith('tel:')) {
      window.location.href = item.url;
    } else {
      router.push(item.url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-border gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices, cause list dockets, jurisprudence, or actions..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-muted text-[10px] font-mono text-muted-foreground border border-border">
            ESC
          </kbd>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 sm:p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No legal rosters or jurisprudence records matching &quot;{query}&quot;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-all ${
                    isSelected ? 'bg-blue-500/15 text-foreground ring-1 ring-blue-500/40' : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-muted text-foreground'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-foreground truncate">{item.title}</span>
                        <span className="px-1.5 py-0.2 rounded-md bg-muted text-[9px] font-bold uppercase tracking-wider text-blue-600">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-2" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 border-t border-border bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center space-x-3">
            <span>Navigate <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd></span>
            <span>Select <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↵</kbd></span>
          </div>
          <span>Chandra Law Command Search</span>
        </div>
      </motion.div>
    </div>
  );
};
