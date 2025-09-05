// pages/_app.js - Next.js App wrapper (optional but recommended)
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}