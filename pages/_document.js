// pages/_document.js - Custom HTML document
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta name="description" content="poddio - Automated podcast RSS feed generator with Google Drive integration. Publish podcasts effortlessly from your Drive folders." />
        <meta name="keywords" content="podcast, RSS, Google Drive, podcast hosting, NotebookLM, podcast publishing" />
        <meta name="author" content="poddio" />

        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#2563EB" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="poddio - Podcast Publishing Made Simple" />
        <meta property="og:description" content="Automated podcast RSS feed generator with Google Drive integration. Turn your Drive folders into podcast feeds." />
        <meta property="og:site_name" content="poddio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="poddio - Podcast Publishing Made Simple" />
        <meta name="twitter:description" content="Automated podcast RSS feed generator with Google Drive integration." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}