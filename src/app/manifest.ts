import type { MetadataRoute } from 'next';

/** Lets the site be added to a home screen with the H. icon; the PNGs come from `yarn icons`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ho Lim · Portfolio',
    short_name: 'Ho Lim',
    description:
      'Ho Lim, full-stack developer and designer based in Ho Chi Minh City, Viet Nam.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
