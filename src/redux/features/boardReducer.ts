import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBoard } from '../actions/boardAction';
import { BoardState } from '@/types/types';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {} as BoardState,
  reducers: {
    viewTask:(state,  action: PayloadAction<{colIndex: number, taskIndex: number}>) => {
      // const { colIndex, taskIndex} = action.payload;
      // console.log(action.payload.colIndex, 'column');
      // console.log(action.payload.taskIndex, 'task');
    
      // state.boards = state.boards?.map((item) => ({
      //   ...item,
      //   columns: item.columns.map((column, index) => ({
      //     ...column,
      //     tasks: index === colIndex ? column.tasks.map((task, j) => ({...task,
      //             isTask: j === taskIndex && !task.isTask
      //           })) : column.tasks,
      //   })),
      // }));
    },
  },
  extraReducers: (builder) => {
    //Get board
    builder.addCase(getBoard.pending, (state) =>{
        state.loading = 'pending';
    })
    .addCase(getBoard.rejected, (state) =>{
        state.loading = 'rejected';
    })
    .addCase(getBoard.fulfilled, (state, { payload }) =>{
        state.loading = 'fulfilled';
        state.board = payload;
    });
  },
});

export const { viewTask } = boardSlice.actions

export default boardSlice.reducer