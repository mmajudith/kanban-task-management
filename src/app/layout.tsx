import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from './providers/provider';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { Layout } from 'antd';

import DispatchData from './components/DispatchData';
import HeaderNav from './components/Header';
import SideBarNav from './components/SideBarNav';

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
      <body className={plus.className}>
        <StyledComponentsRegistry>
          <Providers>
            <DispatchData>
              <SideBarNav />
                <Layout style={{width: '80%', height: '100%', background:'#E4EBFA'}}>
                  <HeaderNav />
                  {children}
                </Layout>
            </DispatchData>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
