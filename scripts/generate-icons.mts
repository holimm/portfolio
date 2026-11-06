/**
 * Renders the site's icons and share image from the "H." mark in `src/assets/icons/logo-mark.ts`.
 * Run with `yarn icons` after changing the mark; the outputs are committed.
 *
 * Writes:
 * - src/app/icon.svg              favicon for modern browsers
 * - src/app/favicon.ico           16/32/48px fallback
 * - src/app/apple-icon.png        180px home-screen icon for iOS
 * - public/icons/icon-*.png       192/512px icons for the web app manifest
 * - src/app/opengraph-image.png   1200×630 link preview (also used for Twitter/X)
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createElement as h } from 'react';
// next has no ESM exports map, so plain Node needs the file extension
import { ImageResponse } from 'next/og.js';
import { logoMarkSvg } from '../src/assets/icons/logo-mark.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const INK = '#0a0a0a';
const PAPER = '#ffffff';

const dataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

const render = async (
  element: React.ReactElement,
  width: number,
  height: number,
  fonts?: ConstructorParameters<typeof ImageResponse>[1]['fonts']
) => {
  const response = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await response.arrayBuffer());
};

const renderMark = (svg: string, size: number) =>
  render(
    h('img', { src: dataUri(svg), width: size, height: size }),
    size,
    size
  );

/** An .ico container holding PNG images, which every browser that still asks for .ico accepts. */
const toIco = (pngs: { size: number; data: Buffer }[]) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
};

const write = async (relativePath: string, data: Buffer | string) => {
  const target = path.join(ROOT, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, data);
  console.log(`  ${relativePath}`);
};

const font = (file: string) =>
  readFile(path.join(ROOT, 'src/styles/fonts', file));

const shareImage = async () => {
  const [compressedBold, normalRegular, normalMedium] = await Promise.all([
    font('oldschoolGrotesk-Compressed/OldschoolGrotesk-CompressedBold.otf'),
    font('oldschoolGrotesk-Normal/OldschoolGrotesk-NormalRegular.otf'),
    font('oldschoolGrotesk-Normal/OldschoolGrotesk-NormalMedium.otf'),
  ]);
  const mark = logoMarkSvg({
    background: PAPER,
    foreground: INK,
    shape: 'circle',
  });

  const element = h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: INK,
        color: PAPER,
        fontFamily: 'Normal',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
      h('img', { src: dataUri(mark), width: 96, height: 96 }),
      h(
        'div',
        {
          style: {
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#a3a3a3',
          },
        },
        'Ho Chi Minh City, Viet Nam'
      )
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      h(
        'div',
        {
          style: {
            fontFamily: 'Compressed',
            fontSize: 260,
            lineHeight: 0.8,
            letterSpacing: -4,
            textTransform: 'uppercase',
          },
        },
        'Ho Lim'
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 40,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.2)',
          },
        },
        h(
          'div',
          { style: { fontSize: 40, fontWeight: 500, letterSpacing: -1 } },
          'Full-stack developer & designer'
        ),
        h('div', { style: { fontSize: 30, color: '#a3a3a3' } }, 'holim.dev')
      )
    )
  );

  return render(element, 1200, 630, [
    { name: 'Compressed', data: compressedBold, weight: 700, style: 'normal' },
    { name: 'Normal', data: normalRegular, weight: 400, style: 'normal' },
    { name: 'Normal', data: normalMedium, weight: 500, style: 'normal' },
  ]);
};

const main = async () => {
  console.log('Generating icons from the H. mark:');

  // Circle on transparent: browser tabs show it as is
  const tabMark = logoMarkSvg({
    background: INK,
    foreground: PAPER,
    shape: 'circle',
  });
  await write('src/app/icon.svg', tabMark);

  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      data: await renderMark(
        logoMarkSvg({
          background: INK,
          foreground: PAPER,
          shape: 'circle',
          size,
        }),
        size
      ),
    }))
  );
  await write('src/app/favicon.ico', toIco(icoPngs));

  // Full-bleed squares: iOS and Android launchers apply their own rounded mask
  const appMark = (size: number, inset: number) =>
    renderMark(
      logoMarkSvg({
        background: INK,
        foreground: PAPER,
        shape: 'square',
        size,
        inset,
      }),
      size
    );
  await write('src/app/apple-icon.png', await appMark(180, 0.06));
  // Maskable icons can lose up to 20% per edge to the launcher's crop
  await write('public/icons/icon-192.png', await appMark(192, 0.12));
  await write('public/icons/icon-512.png', await appMark(512, 0.12));

  await write('src/app/opengraph-image.png', await shareImage());
  await write(
    'src/app/opengraph-image.alt.txt',
    'Ho Lim, full-stack developer and designer based in Ho Chi Minh City, Viet Nam'
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
