import { TasksType } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const isViewTask = createAsyncThunk('isViewTask', async (task: TasksType, thunkAPI) => {
    console.log( task, 'action');
    const boardTask =  { ...task, isTask: !task.isTask }
    // boardTask.isTask = boardTask.isTask
    console.log( boardTask, 'actionafter');
	return boardTask;
});