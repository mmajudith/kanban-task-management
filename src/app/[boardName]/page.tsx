"use client";

import { useBoard } from "@/hook/useBoard";
import { Layout, Grid } from "antd";
import SingleBoard from "../../shared-components/singleboard/SingleBoard";

export default function Board({params: {boardName}}: { params: { boardName: string}}) {
  const [ board ] = useBoard(boardName);
  const { useBreakpoint } = Grid;
  const { xl, md } = useBreakpoint();
  const siderWidth = xl ? 300 : md ? 280 : 0;   

  return (
      <Layout.Content style={{width:`calc(100% - ${siderWidth}px)`}}>
        <SingleBoard board={ board }/>
      </Layout.Content>
  )
}