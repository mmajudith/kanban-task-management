import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store/hook";
import { getASingleBoard } from "@/app/services/getApis";


export const useBoard = (boardName: string) => {
    const [ board, setBoard ] = useState({ message: []});
    const { isSavedBoard } = useAppSelector(state => state.modalSlice)

    useEffect(() => {
        const getBoard = async () =>{
            if(boardName){
                const board = await getASingleBoard(boardName);
                setBoard({...board, message: board?.message});
            }
        }

        getBoard();
    }, [boardName, isSavedBoard]);

    return board?.message
}