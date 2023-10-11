"use client";

import { useAppSelector } from '@/redux/store/hook';
import { useBoard } from '@/hook/useBoard';
import { Layout, Grid } from 'antd';
import SingleBoard from '../shared-components/singleboard/SingleBoard';

export default function Home() {
  const { isCollapse } = useAppSelector(state => state.themeSlice);
  const boardsData = useAppSelector(state => state.boardsSlice);
  const boardNames = boardsData.boards?.map((board: {name: string}) => board.name);
  const [ board ] = useBoard(boardNames && boardNames.length > 0 ? boardNames[0] : undefined);

  const { useBreakpoint } = Grid;
  const { xl, md } = useBreakpoint();
  const siderWidth = xl ? 300 : md ? 280 : 0;   

  return (
    <Layout.Content style={{
        minWidth: 1192,
        width: '100%',
        height: '100%',
        marginLeft: `${isCollapse ? 0 : siderWidth}px`,
      }
    }>
      <SingleBoard board={ board }/>
    </Layout.Content>
  )
}
