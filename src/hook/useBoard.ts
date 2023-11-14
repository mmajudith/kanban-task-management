import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store/hook";
import { getASingleBoard } from "@/app/clientApi/get";
import { BoardType } from "@/types/types";


export const useBoard = (boardName: string) => {
    const [ board, setBoard ] = useState<BoardType[]>([]);
    const { isSavedBoard } = useAppSelector(state => state.modalSlice);

    const toggleIsTask = (colIndex: number, taskIndex: number) => {
        setBoard(board?.map((item) => ({
            ...item,
            columns: item.columns.map((column, index) => ({
              ...column,
              tasks: index === colIndex ? column.tasks.map((task, j) => ({...task,
                      isTask: j === taskIndex && !task.isTask
                    })) : column.tasks,
            })),
          }))
        )
    }

    useEffect(() => {
        const getBoard = async () =>{
            if(boardName){
                const board = await getASingleBoard(boardName);
                setBoard(board?.message);
            }
        }

        getBoard();
    }, [boardName, isSavedBoard]);

    return ({board, toggleIsTask})
}