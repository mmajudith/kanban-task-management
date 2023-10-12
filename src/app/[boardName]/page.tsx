"use client";

import { useBoard } from "@/hook/useBoard";
import { Layout } from "antd";
import SingleBoard from "../../shared-components/singleboard/SingleBoard";

export default function Board({params: {boardName}}: { params: { boardName: string}}) {

  const [ board ] = useBoard(boardName);  

  return (
      <Layout.Content className="w-100 auto">
        <SingleBoard board={ board }/>
      </Layout.Content>
  )
}