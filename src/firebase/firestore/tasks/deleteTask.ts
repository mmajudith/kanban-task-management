import { db } from '../../firebaseConfig';
import { runTransaction } from 'firebase/firestore';
import type { DocumentReference, DocumentData } from 'firebase/firestore';
import { removeTaskFromColumnTasks } from './shuffleTask';
import { BoardType, DeleteTaskType, TasksType } from '@/types/types';

export const deleteTask = async (
    deletedTask: BoardType | TasksType | DeleteTaskType,
    boardsRef: DocumentReference<DocumentData>
    ) => {
    await runTransaction(db, async (transaction) => {
        const boardsDoc = await transaction.get(boardsRef);
        const boards = await boardsDoc.data()?.boards;
        const { id, colIndex, taskIndex } = deletedTask;
        
        const modifyBoards = removeTaskFromColumnTasks(boards, id, colIndex, taskIndex);
        
        transaction.update(boardsRef, { boards: [...modifyBoards] });
    });
}