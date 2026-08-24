import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://leej3.github.io/orinoco-lite-presentation/'),
  title: 'ORINOCO Lite — A shared research-information system for CON',
  description:
    'A CON team presentation on upstream ORINOCO, the GitHub-centered Lite variant, and shared metadata curation.',
  authors: [{ name: 'John Lee' }],
  openGraph: {
    type: 'website',
    url: 'https://leej3.github.io/orinoco-lite-presentation/',
    title: 'ORINOCO Lite',
    description: 'Shared research information for CON',
    images: [
      {
        url: 'https://leej3.github.io/orinoco-lite-presentation/og.png',
        width: 1729,
        height: 910,
        alt: 'ORINOCO Lite — Shared research information for CON',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORINOCO Lite',
    description: 'Shared research information for CON',
    images: ['https://leej3.github.io/orinoco-lite-presentation/og.png'],
  },
  icons: {
    icon: 'https://leej3.github.io/orinoco-lite-presentation/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
