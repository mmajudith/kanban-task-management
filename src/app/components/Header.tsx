"use client"

import Link from "next/link"
import { useAppSelector } from "@/redux/store/hook";
import { Layout } from "antd";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
};

const HeaderNav = () => {
    const boardsData = useAppSelector(state => state.boardsSlice);
    // const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    return (
        <Header style={headerStyle}>Header</Header>
    )
}

export default HeaderNav