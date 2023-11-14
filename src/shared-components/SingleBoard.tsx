"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { postDeletePut } from "@/app/clientApi/postDeletePut";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { deleteBoard, deletedBoard } from "@/redux/features/utilitiesReducer";
import Board from "./board/Board";
import EditBoardModal from "./editBoardModal/EditBoardModal";
import DeleteModal from "@/shared-components/deleteModal/DeleteModal";
import { BoardType } from "@/types/types";

type SBProps = {
    board:BoardType[] 
    toggleIsTask: (colIndex: number, taskIndex: number) => void
}

const SingleBoard = ({ board,toggleIsTask }: SBProps) => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useAppDispatch();
    const { isDelete, isEdit } = useAppSelector(state => state.modalSlice);
    
    //Function that delete a board with its children
    const handleDeleteBoard = async () => {
        const eachBoard = board[0]
        setIsDeleting(true);
        const { message } = await postDeletePut('DELETE', eachBoard)
        if(message === 'Network error!'){
            setIsDeleting(false);
            api['error']({message, placement: 'top'});
        }
        api['success']({message: `${board[0]?.name} Board successfully deleted`, placement: 'top'});
        setIsDeleting(false);
    
        window.setTimeout(() => {
            dispatch(deleteBoard());
            dispatch(deletedBoard()); 
            router.push('/');
        }, 3000);
    }

    return (
        <>
            {isEdit && (<EditBoardModal board={board} />)}
            {isDelete && (
                <DeleteModal
                    isDeleting={isDeleting} 
                    isDelete={isDelete} 
                    onClick={() => dispatch(deleteBoard())}
                    contextHolder={contextHolder}
                    name={board[0]?.name}
                    onDelete={handleDeleteBoard}
                />
            )}
            <Board board={ board }  toggleIsTask={toggleIsTask}/>
        </>
    )
}

export default SingleBoard;