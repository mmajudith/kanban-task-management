import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from './providers/provider';
import DispatchData from './components/DispatchData';
import Header from './components/Header';
import SideBarNav from './components/SideBarNav';
import './globals.css';
import StyledComponentsRegistry from '@/lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

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
            <Providers>
              <StyledComponentsRegistry>
                <DispatchData>
                  <Header />
                  <SideBarNav />
                  {children}
                </DispatchData>
              </StyledComponentsRegistry>
            </Providers>
      </body>
    </html>
  )
}
