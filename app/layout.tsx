import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veritas-Trade OS',
  description: 'Verifiable, Multi-Chain AI Trading Orchestration Platform',
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
