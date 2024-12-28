import '@/styles/globals.css';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../config/seo/metadata';
import { LenisProvider } from '@/components/providers/lenisProvider';

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
      <body className="font-oldschool-grotesk-normal">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
