import { useState, useEffect } from "react";
import { getASingleBoard } from "@/app/services/apis";


export const useBoard = (boardName: string | undefined) => {
    const [ board, setBoard ] = useState<{ message: []; status: string; }>();

    useEffect(() => {
        const getBoard = async () =>{
            if(boardName){
                const board = await getASingleBoard(boardName);
                setBoard(board)
            }
        }

        getBoard();
    }, [boardName]);

    return [ board ] as const
}