import { createSlice } from '@reduxjs/toolkit';

import { fetchBoards } from '../actions/boardsAction';

type BoardsState = {
    boards: [{name: string, column: []}]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

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
})

export default boardsSlice.reducer