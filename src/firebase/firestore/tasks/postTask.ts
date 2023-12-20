import { db } from '../../firebaseConfig';
import { runTransaction } from 'firebase/firestore';
import type { DocumentReference, DocumentData } from 'firebase/firestore';
import { BoardType, DeleteTaskType, TasksType } from '@/types/types';

export const postTask = async (
    newTask: BoardType | TasksType | DeleteTaskType,
    boardsRef: DocumentReference<DocumentData>
    ) => {
    let { id, ...task } = newTask;
    await runTransaction(db, async (transaction) => {
        const boardsDoc = await transaction.get(boardsRef);
        
        const modifyBoards = boardsDoc.data()?.boards.map((board: {id: string, columns: {name: string, tasks:any[]}[]}) => {
            return board.id === newTask.id ? board = {...board, columns: board.columns.map((column) => {
                return ({...column, tasks: column.name === newTask.status ? [...column.tasks, task]
                    : column.tasks})
            })}
            :   board
        });
        transaction.update(boardsRef, { boards: [...modifyBoards] });
        return 'success'
    });
}