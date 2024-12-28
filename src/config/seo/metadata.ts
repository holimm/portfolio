"use server";
import { type Metadata } from "next";

export async function generatePageMetadata(): Promise<Metadata> {
  const siteName = "DeMaint";
  const siteSlogan = "Ho Chi Minh City";
  const siteDescription =
    "DeMaint is your trusted partner for all things bike maintenance. Whether it's a routine check-up or a complex fix, DeMaint ensures your ride is always smooth and reliable.";
  const titleSeparator = "·";

  const metadataTitle = `${siteName} ${titleSeparator} ${siteSlogan}`;
  const metadataDescription = siteDescription;
  const thumbnailUrl = "";

  const isProduction =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  return {
    title: {
      default: metadataTitle,
      template: `%s ${titleSeparator} ${siteName} ${titleSeparator} ${siteSlogan}`,
    },
    description: metadataDescription,
    keywords: ["DeMaint"],
    referrer: "origin-when-cross-origin",
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url:
        process.env.NEXT_PUBLIC_WEBSITE_SITE_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        "NO_PUBLIC_WEBSITE_SITE_URL",
      images: [
        {
          url: thumbnailUrl,
          alt: metadataTitle,
        },
      ],
    },
    twitter: {
      title: metadataTitle,
      description: metadataDescription,
      images: {
        url: thumbnailUrl,
        alt: metadataTitle,
      },
      card: "summary_large_image",
    },
    icons: {
      icon: [
        {
          rel: "apple-touch-icon",
          type: "image/png",
          url: "/favicons/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          type: "image/png",
          url: "/favicons/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          type: "image/png",
          url: "/favicons/favicon-16x16.png",
          sizes: "16x16",
        },
      ],
      other: [
        { rel: "manifest", url: "/favicons/site.webmanifest" },
        {
          rel: "mask-icon",
          url: "/favicons/safari-pinned-tab.svg",
          color: "#000000",
        },
      ],
    },
    robots: {
      index: !isProduction,
      follow: !isProduction,
      googleBot: {
        index: !isProduction,
        follow: !isProduction,
      },
    },
    alternates: {
      canonical: "NO_PUBLIC_WEBSITE_SITE_URL",
    },
    other: {
      "theme-color": "#ffffff",
      "msapplication-TileColor": "#ffffff",
      "build:env":
        process.env.NEXT_PUBLIC_ENVIRONMENT ||
        process.env.NEXT_PUBLIC_VERCEL_ENV ||
        "NO_ENV",
      "build:version":
        process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_ID || "NO_GIT_REPO_ID",
      "build:version:commit":
        process.env.NEXT_PUBLIC_COMMIT_SHA || "NO_GIT_COMMIT_SHA",
      "build:commit:auth":
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME ||
        "NO_AUTHOR_NAME",
    },
  };
}
