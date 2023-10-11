"use client";

import { createSlice } from '@reduxjs/toolkit';
import { toggleTheme } from '../actions/themeAction';

const initialState = {
    currentTheme: JSON.parse(typeof window !== "undefined" && window.localStorage.getItem('theme') || '{}') || null,
    isCollapse: false
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    collapse: (state) => {
      state.isCollapse = !state.isCollapse;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
			state.currentTheme = payload;
		});
  },
});

export const { collapse } = themeSlice.actions

export default themeSlice.reducer