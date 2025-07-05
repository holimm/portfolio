import type { Metadata } from 'next';
import { generatePageMetadata } from '../config/seo/Metadata.Config';
import { Header } from '@/components/sections/header';
import { LenisProvider } from '@/components/providers';
import '../styles/globals.css';
import { Footer } from '@/components/sections';

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
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
