"use client";

import { createSlice } from '@reduxjs/toolkit';
import { toggleTheme } from '../actions/themeAction';

const initialState = {
    currentTheme: JSON.parse(typeof window !== "undefined" && window.localStorage.getItem('theme') || '{}') || null,
    isCollapse: false,
    isDelete: false,
    isEdit: false
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    collapse: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    deleteBoard: (state) => {
      state.isDelete = !state.isDelete;
    },
    editBoard: (state) => {
      state.isEdit = !state.isEdit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
			state.currentTheme = payload;
		});
  },
});

export const { collapse, deleteBoard, editBoard } = themeSlice.actions

export default themeSlice.reducer