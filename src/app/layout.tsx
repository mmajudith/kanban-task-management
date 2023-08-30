import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/AntdRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Task Management',
  description: 'App that allow user to plan their projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
