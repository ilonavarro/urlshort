import '../styles/tailwind.css'

export const metadata = {
  title: 'Next.js Link Shortener',
  description: 'Generated by Next.js with brains',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
