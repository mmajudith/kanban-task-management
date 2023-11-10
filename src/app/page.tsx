"use client";

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store/hook';
import { Layout } from 'antd';
import SingleBoard from '../shared-components/SingleBoard';

export default function Home() {
  const [ board, setBoard ] = useState<{id: string, name: string; columns: []; }[]>([]);
  const { boards } = useAppSelector(state => state.boardsSlice);
  const { isDeleted } = useAppSelector(state => state.modalSlice);
  
  useEffect(() => {
    if(boards){
      const board = boards?.filter((item, index) => index === 0);
      setBoard(board);
    }
  }, [boards, isDeleted]);
     
  return (
    <Layout.Content className="w-100 auto">
      <SingleBoard board={ board }/>
    </Layout.Content>
  )
}
