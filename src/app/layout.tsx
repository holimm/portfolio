import type { Metadata } from 'next';
import { generatePageMetadata } from '../config/seo/Metadata.Config';
import { Header } from '@/components/sections/header';
import { SmoothScrollProvider } from '@/components/providers';
import '../styles/globals.css';
import { Footer, PageLoader } from '@/components/sections';
import { Toaster } from 'sonner';

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
      <head>
        {/* Without JavaScript nothing would ever lift the loader */}
        <noscript>
          <style>{'[data-page-loader]{display:none}'}</style>
        </noscript>
      </head>
      <body className="font-oldschool-grotesk-normal">
        <PageLoader />
        <Toaster position="bottom-right" richColors />
        {/* Fixed elements must stay outside the smooth-scroll wrapper */}
        <Header />
        <SmoothScrollProvider>
          {children}
          <Footer theme="dark" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
