"use client";

import { useRouter } from "next/navigation";
import { notification } from "antd";
import { updateBoards } from "@/app/services/updateApi";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { deleteBoard } from "@/redux/features/utilitiesReducer";
import Board from "./board/Board";
import DeleteModal from "@/shared-components/deleteModal/DeleteModal";

type SBProps = {
    board: {
        name: string, 
        columns: [] 
    }[] 
}

const SingleBoard = ({ board }: SBProps) => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();
    const { isDelete, isEdit } = useAppSelector(state => state.themeSlice);
    
    //Function that delete a board with its children
    const handleDeleteBoard = async () => {
        const eachBoard = board[0]
        const { message } = await updateBoards('DELETE', eachBoard)
        if(message === 'Network error!'){
            api['error']({message, placement: 'top'});
        }
        api['success']({message: `${board[0]?.name} Board successfully deleted`, placement: 'top'});
    
        window.setTimeout(() => {dispatch(deleteBoard()); router.push('/')}, 3000);
    }

    return (
        <>
            {isDelete && (
                <DeleteModal isDelete={isDelete} 
                    onClick={() => dispatch(deleteBoard())}
                    contextHolder={contextHolder}
                    name={board[0]?.name}
                    onDelete={handleDeleteBoard}
                />
            )}
            <Board board={ board }/>
        </>
    )
}

export default SingleBoard;