import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CHAMBERS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CHAMBERS_INFO.managingPartner} | Chandra Law Chambers & Dispute Resolution`,
  description: `${CHAMBERS_INFO.name} — Commercial litigation, domestic & international arbitration, writ petitions, and tax appeals led by Advocate Shlok Chandra in New Delhi.`,
  keywords: 'Shlok Chandra Advocate, Delhi High Court Commercial Lawyer, Supreme Court SLP Advocate, DIAC Arbitration Counsel, Chandra Law Chambers Defence Colony',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-blue-500/20 selection:text-blue-700">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
