import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { postTask } from './tasks/postTask';
import { deleteTask } from './tasks/deleteTask';
import { BoardType, TasksType, DeleteTaskType } from '@/types/types';

export const postDeleteBoard = async (
    boardTask: BoardType | TasksType | DeleteTaskType, 
    arrMethod: (arg: {}) => void
    ) => {
    try{
        const boardsRef = doc(db, 'boards', 'data');
        if(boardTask.hasOwnProperty('name')){
            await updateDoc(boardsRef, { boards: arrMethod({...boardTask}) });
        }
        if(boardTask.hasOwnProperty('title')){
            await postTask(boardTask, boardsRef);
        }
        if(boardTask.hasOwnProperty('colIndex')){
            await deleteTask(boardTask, boardsRef);
        }
      
        return {status: 'success'}

    }catch(err){
        return {status: 'network'};
    }
}