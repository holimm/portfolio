'use client';
import { Homepage } from '@/components/sections/homepage';
import { Locale } from '../../../i18n.config';

export default function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return (
    <>
      <Homepage locale={locale} />
    </>
  );
}
