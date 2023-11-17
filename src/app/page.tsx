"use client";

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store/hook';
import { Layout } from 'antd';
import SingleBoard from '../shared-components/SingleBoard';
import { BoardType } from '@/types/types';

export default function Home() {
  const [ board, setBoard ] = useState<BoardType[]>([]);
  const { boards } = useAppSelector(state => state.boardsSlice);
  const { isDeleted } = useAppSelector(state => state.modalSlice);

  const toggleIsTask = (colIndex: number, taskIndex: number) => {
    setBoard(board?.map((item) => ({
        ...item,
        columns: item.columns.map((column, index) => ({
          ...column,
          tasks: index === colIndex ? column.tasks.map((task, j) => ({...task,
                  isTask: j === taskIndex && !task.isTask
                })) : column.tasks,
        })),
      }))
    )
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
