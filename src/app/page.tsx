"use client";

import { useBoard } from '@/hook/useBoard';
import { useBoardNames } from '@/hook/useBoardNames';
import { Layout } from 'antd';
import SingleBoard from '../shared-components/singleboard/SingleBoard';

export default function Home() {
  const {boardNames} = useBoardNames();
  const [ board ] = useBoard(boardNames && boardNames.length > 0 ? boardNames[0] : undefined);

  return (
    <Layout.Content className="w-100 auto">
      <SingleBoard board={ board }/>
    </Layout.Content>
  )
}
