import { BoardType, DeleteTaskType } from "@/types/types";

//Function that post, delete, and put board
export const postDeletePut = async (method: string, board: BoardType | DeleteTaskType) => {
    const res = await fetch('/api', { 
        method,
        headers:{
            'Content-Type': 'application/json',
        },
        cache: "no-cache",
        body: JSON.stringify(board), 
    });
    const { message } = await res.json();
    return message;
}