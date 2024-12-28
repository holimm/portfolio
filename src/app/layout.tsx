import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { generatePageMetadata } from '../config/seo/metadata';
import { LenisProvider } from '@/components/providers/lenisProvider';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = generatePageMetadata();
  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
