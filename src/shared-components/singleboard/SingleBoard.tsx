"use client";

import { useAppSelector } from "@/redux/store/hook";
import Utility from "../utility/Utility";
import { Spin } from "antd";
import { spinContainerStyle } from "./singleBoardStyles";

type SBProps = {
    board: {
        message: []
        status: string
    } | undefined
}

const SingleBoard = ({ board }: SBProps) => {
    const { loading } = useAppSelector(state => state.boardsSlice);
    console.log(loading)
    console.log(board, 'board');
    console.log(board?.status, board?.message);

    return(
        <>
            {loading === 'pending' && (
                <div style={spinContainerStyle}>
                    <Spin size="large"/>
                </div>
            )}
            {loading !== 'pending' && !board && (
                <Utility 
                    text={'Please check your internet connection :( .'} 
                    buttonText={'Try again'}
                />
            )}
            {board && board?.status === 'network' && (
                <Utility 
                    text={'Please check your internet connection :( .'} 
                    buttonText={'Try again'}
                />
            )} 
            {board && board?.status === 'empty' && (
                <Utility 
                    text={'This board is empty. Create a new column to get started.'} 
                    buttonText={'+ Add New Column'}
                />
            )}
            {board && board?.status === 'success' && board?.message.length < 0 ? (
                <Utility 
                    text={'This board is empty. Create a new column to get started.'} 
                    buttonText={'+ Add New Column'}
                />
            ) : (
                <>
                    {board?.message.map((item: {name: string}, index) => (
                        <p key={`${item.name}${index}`}>{item.name}</p>
                    ))}
                </>
            )}
        </>
    )
}

export default SingleBoard;
