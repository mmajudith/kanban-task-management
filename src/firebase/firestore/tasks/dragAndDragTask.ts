// import { BoardType, TasksType } from '@/types/types';
// import { db } from '../../firebaseConfig';
// import { runTransaction, doc } from 'firebase/firestore';
// import { copyAndFilterBoard, modifyBoard } from './shuffleTask';

// let colTask:TasksType | false;

// export const removeTaskFromColumnTasks = (
//         boards: BoardType[], id: string, 
//         colIndex: number | undefined, taskIndex: number | undefined
//     ) => {
// 	const { copiedBoards, filteredBoard } = copyAndFilterBoard(boards, id);
// 	const removeTaskFromCol = filteredBoard[0].columns.map((column, index) => {
// 		return {
// 			...column,
// 			tasks:  index === colIndex ?
//                         column.tasks.filter((task, j) => {
//                             if(j === taskIndex){
//                                 colTask = task
//                             }
                
// 							return j !== taskIndex;
// 					    })
// 					: column.tasks,
// 		};
// 	});

// 	return modifyBoard(copiedBoards, removeTaskFromCol, id);
// };

// const addTaskToColumnTasks = (boards: BoardType[], id: string, currentStatus: string) => {
//     const { copiedBoards, filteredBoard } = copyAndFilterBoard(boards, id);

// 	const addTaskToColumn = filteredBoard[0].columns.map((column) => {
// 		if (colTask && column.name === currentStatus) {
//             colTask = { ...colTask, status: column.name}
// 			column.tasks = [...column.tasks, colTask];
// 		}
// 		return column;
// 	});

// 	return modifyBoard(copiedBoards, addTaskToColumn, id);
// };

// export const dragAndDropTask = async (
//         id: string, 
//         columnIndex: number, 
//         taskIndex: number,
//         currentStatus: string 
//     ) => {
//     const boardsRef = doc(db, 'boards', 'data');
//     await runTransaction(db, async (transaction) => {
//         const boardsDoc = await transaction.get(boardsRef);
//         const boards = await boardsDoc.data()?.boards;
        
//         const removeTask = removeTaskFromColumnTasks(boards, id, columnIndex, taskIndex);
//         const modifyBoards = addTaskToColumnTasks(removeTask, id, currentStatus);
        
//         transaction.update(boardsRef, { boards: [...modifyBoards] });
//     });
// }