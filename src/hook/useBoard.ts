import { useState, useEffect } from "react";
import { getASingleBoard } from "@/app/services/getApis";


export const useBoard = (boardName: string) => {
    const [ board, setBoard ] = useState({ message: []});

    useEffect(() => {
        const getBoard = async () =>{
            if(boardName){
                const board = await getASingleBoard(boardName);
                setBoard({...board, message: board?.message});
            }
        }

        getBoard();
    }, [boardName]);

    return board?.message
}