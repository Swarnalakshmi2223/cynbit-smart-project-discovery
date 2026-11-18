// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cynbit Smart Discovery – Intelligent Project Enquiry System',
  description:
    'Tell us about your vision. Our intelligent project discovery system will help identify the right technology solutions for your business.',
  keywords: ['Cynbit', 'project enquiry', 'software development', 'AI automation', 'web development'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
