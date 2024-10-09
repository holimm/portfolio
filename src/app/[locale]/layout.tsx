import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { generatePageMetadata } from "@/config/seo";
import { LenisProvider } from "@/components/providers/lenisProvider";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/utils/localization/getDictionary";
import { Header } from "@/components/sections/header";

const inter = Inter({ subsets: ["latin"] });

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
  return <>
  {children}
  <Header
    translation={translation}
    locale={params.locale}
    variant="dashboard"
  />
</>;
}
