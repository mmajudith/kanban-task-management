"use client";

import { useAppSelector } from '@/redux/store/hook';
import { Button, ConfigProvider, Layout } from 'antd';

const { Content } = Layout;

export default function Home() {
  const boardsData = useAppSelector(state => state.boardsSlice);
	
  return (
    <Content>
      <h1>Main Page</h1>
      <Button type='primary'>Button</Button>
      <Button type='primary'>Click to dance</Button>

      {/* {boardsData.loading === 'pending' && (<p>Loading....</p>)}
      {boardsData.loading === 'rejected' && (<p>Please check your network</p>)}
      {boardsData.loading === 'fulfilled' && (<p>{boardsData.boards[0].name}</p>)} */}
    </Content>
  )
}
