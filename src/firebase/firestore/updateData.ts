import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const updateData = async (board: {name: string, columns: [{ name: string, tasks: [] }]}) => {
    try{
        const boardsRef = doc(db, 'boards', 'data');
        await updateDoc(boardsRef, { boards: arrayUnion({...board}) });

        return {status: 'New board successfully created.'}

    }catch(err){
        return {status: 'network'};
    }
}