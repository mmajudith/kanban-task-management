"use client";

import { createSlice } from '@reduxjs/toolkit';
import { toggleTheme } from '../actions/themeAction';

const initialState = {
    currentTheme: JSON.parse(typeof window !== "undefined" && window.localStorage.getItem('theme') || '{}') || null,
    isCollapse: false,
    isBoardModal: false,
    isDelete: false,
    isEdit: false,
    isSavedBoard: false,
    isDeleted: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    collapse: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    boardModal: (state) => {
      state.isBoardModal = !state.isBoardModal;
    },
    deleteBoard: (state) => {
      state.isDelete = !state.isDelete;
    },
    editBoard: (state) => {
      state.isEdit = !state.isEdit;
    },
    savedBoard: (state) => {
      state.isSavedBoard = !state.isSavedBoard;
    },
    deletedBoard: (state) => {
      state.isDeleted = !state.isDeleted;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
			state.currentTheme = payload;
		});
  },
});

export const { collapse, boardModal, 
  deleteBoard, editBoard, 
  deletedBoard, savedBoard } = modalSlice.actions

export default modalSlice.reducer