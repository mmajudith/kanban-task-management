"use client"

import Link from "next/link"
import { useAppSelector } from "@/redux/app/hook";

const Header = () => {
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    return (
        <div>Header</div>
    )
}

export default Header