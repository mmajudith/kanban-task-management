import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { BoardType, TasksType } from '@/types/types';

export const postDeleteBoard = async (boardTask: BoardType | TasksType, arrMethod: (arg: {}) => void) => {
    console.log(boardTask, 'board tasksssssss');
    try{
        const boardsRef = doc(db, 'boards', 'data');
        await updateDoc(boardsRef, { boards: arrMethod({...boardTask}) });

        return {status: 'success'}

    }catch(err){
        return {status: 'network'};
    }
}