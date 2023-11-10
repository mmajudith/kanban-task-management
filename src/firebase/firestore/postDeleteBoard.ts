import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { BoardType } from '@/types/types';

export const postDeleteBoard = async (board: BoardType, arrMethod: (arg: {}) => void) => {
    try{
        const boardsRef = doc(db, 'boards', 'data');
        await updateDoc(boardsRef, { boards: arrMethod({...board}) });

        return {status: 'success'}

    }catch(err){
        return {status: 'network'};
    }
}