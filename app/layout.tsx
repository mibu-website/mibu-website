import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mibucoin.com'),

  title: {
    default: 'MiBU (MIBU) | A little buddy with a big heart on Solana',
    template: '%s | MiBU',
  },

  description:
  'MiBU is a community-driven Solana meme coin built around kindness, creativity, and long-term community growth. Explore the world of MiBU, its story, roadmap, tokenomics, and join the forest-born buddy community.',

  keywords: [
    'MIBU',
    'Solana',
    'Meme Coin',
    'Crypto',
    'Pump.fun',
    'Phantom Wallet',
    'Community',
    'Forest',
    'Kindness',
  ],

  authors: [{ name: 'MIBU Team' }],
  creator: 'MIBU',
  publisher: 'MIBU',

   openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mibucoin.com',
    siteName: 'MIBU',
    title: 'MIBU — A little buddy with a big heart',
    description:
      'Built with kindness on Solana. Join the forest community and explore the MiBU journey.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MIBU — A little buddy with a big heart',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MIBU — A little buddy with a big heart',
    description:
      'MiBU is a community-driven Solana meme coin built around kindness, creativity, and long-term community growth. Explore the world of MiBU, its story, roadmap, tokenomics, and join the forest-born buddy community.',
    images: ['/og-image.jpg'],
    creator: '@MIBU',
  },

  icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
},

  alternates: {
    canonical: 'https://mibu.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}