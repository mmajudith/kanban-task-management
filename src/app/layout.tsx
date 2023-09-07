import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { getBoards } from './frontendApis/apis';
import Header from './components/Header';
import SiderBar from './components/SiderBar';

import './globals.css';
import StyledComponentsRegistry from '@/lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban Task Management',
  description: 'App that allow user to plan their projects',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const boards = await getBoards()
  const boardNames = boards.map((board: {name: string}) => board.name);

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header boardNames={boardNames}/>
          <SiderBar boardNames={boardNames}/>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
