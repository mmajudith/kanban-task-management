import { BoardType, TasksType } from '@/types/types';
import { db } from '../../firebaseConfig';
import { runTransaction, doc } from 'firebase/firestore';
import { copyAndFilterBoard, modifyBoard } from './shuffleTask';

const editColumnTasks = (
    boards: BoardType[],
    id: string, 
    colIndex: number, 
    taskIndex: number,
    colTask: TasksType
) => {

    const { copiedBoards, filteredBoard } = copyAndFilterBoard(boards, id);

	const editedColumnTask = filteredBoard[0].columns.map((column, index) => {
		return {
			...column,
			tasks:  index === colIndex ?
                        column.tasks.map((task, j) => {
							return j === taskIndex ? task = colTask : task;
					    })
					: column.tasks,
		};
	});

	return modifyBoard(copiedBoards,editedColumnTask, id);
};

export const  editTaskHandler = async (
        id: string, 
        colIndex: number, 
        taskIndex: number,
        colTask: TasksType
    ) => {
    const boardsRef = doc(db, 'boards', 'data');
    await runTransaction(db, async (transaction) => {
        const boardsDoc = await transaction.get(boardsRef);
        const boards = await boardsDoc.data()?.boards;
        
        const modifyBoards = editColumnTasks(boards,id,colIndex, taskIndex,colTask);
        
        transaction.update(boardsRef, { boards: [...modifyBoards] });
    });
}