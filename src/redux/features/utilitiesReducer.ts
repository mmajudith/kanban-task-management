"use client";

import { createSlice } from '@reduxjs/toolkit';
import { toggleTheme } from '../actions/themeAction';

const initialState = {
    currentTheme: JSON.parse(typeof window !== "undefined" && window.localStorage.getItem('theme') || '{}') || null,
    isCollapse: false,
    isBoardModal: false,
    isDeleteBoard: false,
    isEditBoard: false,
    isSavedBoard: false,
    isDeleted: false,
    isAddTask: false,
    isEditTask: false,
    isDeleteTask: false
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
      state.isDeleteBoard = !state.isDeleteBoard;
    },
    editBoard: (state) => {
      state.isEditBoard = !state.isEditBoard;
    },
    savedBoard: (state) => {
      state.isSavedBoard = !state.isSavedBoard;
    },
    deletedBoard: (state) => {
      state.isDeleted = !state.isDeleted;
    },
    addTask: (state) => {
      state.isAddTask = !state.isAddTask;
    },
    editTask: (state) => {
      state.isEditTask = !state.isEditTask;
    },
    deleteTask: (state) => {
      state.isDeleteTask = !state.isDeleteTask;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
			state.currentTheme = payload;
		});
  },
});

export const { collapse, boardModal, 
  deleteBoard, editBoard, deletedBoard, 
  savedBoard, addTask, editTask, deleteTask } = modalSlice.actions

export default modalSlice.reducer