import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from './providers/provider';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { Layout } from 'antd';

import DispatchData from './components/dispatchData/DispatchData';
import HeaderNav from './components/header/Header';
import SideBarNav from './components/sideBarNav/SideBarNav';

import './globals.css';

const plus = Plus_Jakarta_Sans({
  weight:['200', '300', '400', '500', '600', '700', '800'], 
  subsets: ['latin'], 
  display: 'swap', 
});

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
      <body className={plus.className} style={{fontSize: '1rem', fontWeight: 'normal'}}>
        <StyledComponentsRegistry>
          <Providers>
            <DispatchData>
                <HeaderNav />
                <Layout 
                  style={{width: '100%', height: '100vh', margin: 'auto', position: 'relative', top: 80, overflow: 'auto'}} 
                  hasSider={true}
                >
                  <SideBarNav />
                  {children}
                </Layout>
            </DispatchData>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
