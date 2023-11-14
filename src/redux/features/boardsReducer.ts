import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchBoards } from '../actions/boardsAction';
import { BoardsState } from '@/types/types';

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: {} as BoardsState,
  reducers: {
    viewTask:(state,  action: PayloadAction<{colIndex: number, taskIndex: number}>) => {
      const { colIndex, taskIndex} = action.payload;
    
      state.boards = state.boards?.map((item) => ({
        ...item,
        columns: item.columns.map((column, index) => ({
          ...column,
          tasks: index === colIndex ? column.tasks.map((task, j) => ({...task,
                  isTask: j === taskIndex && !task.isTask
                })) : column.tasks,
        })),
      }));
    },
  },
  extraReducers: (builder) => {
    //Get boards
    builder.addCase(fetchBoards.pending, (state) =>{
        state.loading = 'pending';
    })
    .addCase(fetchBoards.rejected, (state) =>{
        state.loading = 'rejected';
    })
    .addCase(fetchBoards.fulfilled, (state, { payload }) =>{
        state.loading = 'fulfilled';
        state.boards = payload;
    });
  },
});

export const { viewTask } = boardsSlice.actions

export default boardsSlice.reducer