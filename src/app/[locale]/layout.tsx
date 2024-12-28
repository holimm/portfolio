import type { Metadata } from 'next';
import { generatePageMetadata } from '@/config/seo';
import { Locale } from '../../../i18n.config';
import { getDictionary } from '@/utils/localization/getDictionary';
import { Header } from '@/components/sections/header';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = generatePageMetadata();
  return metadata;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const translation = await getDictionary(params.locale);
  return (
    <>
      <Header translation={translation} locale={params.locale} />
      {children}
    </>
  );
}
