"use client";

import { useAppSelector } from '@/redux/store/hook';
import { useBoard } from '@/hook/useBoard';
import { Layout } from 'antd';
import SingleBoard from '../shared-components/singleboard/SingleBoard';

export default function Home() {
  
  const boardsData = useAppSelector(state => state.boardsSlice);
  const boardNames = boardsData.boards?.map((board: {name: string}) => board.name);
  const [ board ] = useBoard(boardNames && boardNames.length > 0 ? boardNames[0] : undefined);

  return (
    <Layout.Content className="w-100 auto">
      <SingleBoard board={ board }/>
    </Layout.Content>
  )
}
