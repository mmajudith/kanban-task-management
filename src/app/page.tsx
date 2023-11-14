"use client";

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hook';
import { viewTask } from "@/redux/features/boardsReducer";
import { Layout } from 'antd';
import SingleBoard from '../shared-components/SingleBoard';
import { BoardType } from '@/types/types';

export default function Home() {
  const [ board, setBoard ] = useState<BoardType[]>([]);
  const { boards } = useAppSelector(state => state.boardsSlice);
  const { isDeleted } = useAppSelector(state => state.modalSlice);
  const dispatch = useAppDispatch();

  const toggleIsTask = (colIndex: number, taskIndex: number) => {
    dispatch(viewTask({colIndex, taskIndex}))
  }
  
  useEffect(() => {
    if(boards){
      const board = boards?.filter((item, index) => index === 0);
      setBoard(board);
    }
  }, [boards, isDeleted]);
     
  return (
    <Layout.Content className="w-100 auto">
      <SingleBoard board={ board } toggleIsTask={toggleIsTask}/>
    </Layout.Content>
  )
}
