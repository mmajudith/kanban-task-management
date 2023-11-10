import { db } from '../firebaseConfig';
import {  doc, runTransaction } from 'firebase/firestore';
import { BoardType } from '@/types/types';

export const updateBoard = async (editedBoard: BoardType) => {
    let status = '';
    const boardsRef = doc(db, 'boards', 'data');

    try{
        await runTransaction(db, async (transaction) => {
            const boardsDoc = await transaction.get(boardsRef);
            if(!boardsDoc.exists()){
                return status = 'empty!'
            }
            
            const newEditedBoards = boardsDoc.data()?.boards.map((board: {id: string}) => {
                return board.id === editedBoard.id ? board = {...editedBoard, id: editedBoard.name} : board
            });
            transaction.update(boardsRef, { boards: [...newEditedBoards] });
            return status = 'success'
        });
    }catch(err){
        return status = 'network';
    }
    return  status
}