import { db } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export const getBoards = async () => {
    try{
        const boardsRef = doc(db, 'boards', 'data');
        const boardsSnap = await getDoc(boardsRef);

        if(!boardsSnap.exists()){
           return  {message: 'Document does not exist', status: 'empty'}
        }
        const { boards } = boardsSnap.data()
        
        return { message: boards, status: 'success'};

    }catch(err){
        return {message: err, status: 'network'};
    }
}