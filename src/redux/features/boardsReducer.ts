import { createSlice } from '@reduxjs/toolkit';

import { fetchBoards } from '../actions/boardsAction';
import { BoardsState } from '@/types/types';

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: {} as BoardsState,
  reducers: {},
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

export default boardsSlice.reducer