"use client";

import { useAppSelector } from '@/redux/app/hook';
import { Button, ConfigProvider } from 'antd';
import theme from '../../themeConfig';

export default function Home() {
  const boardsData = useAppSelector(state => state.boardsSlice);
	
  return (
    <ConfigProvider theme={theme}>
      <main className=''>
        <h1>Main Page</h1>
        <Button type='primary'>Button</Button>
        <Button type='primary'>Click to dance</Button>

        {boardsData.loading === 'pending' && (<p>Loading....</p>)}
        {boardsData.loading === 'rejected' && (<p>Please check your network</p>)}
        {boardsData.loading === 'fulfilled' && (<p>{boardsData.boards[0].name}</p>)}
      </main>
    </ConfigProvider>
  )
}
