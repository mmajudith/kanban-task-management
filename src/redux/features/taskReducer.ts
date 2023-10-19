import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isViewTask } from '../actions/taskAction';

import { TasksType } from '@/types/types';

type TaskState = {
    task: TasksType
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: {} as TaskState,
  reducers: {
    viewTask:(state, action: PayloadAction<TasksType>) => {
      state.task =  action.payload;
      state.task.isTask = true
    },
    // isViewTask:(state) => {
    //     console.log(state.task);
    //     state.task
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(isViewTask.fulfilled, (state, { payload }) => {
			state.task = payload;
		});
  },
});

export const { viewTask } = taskSlice.actions

export default taskSlice.reducer