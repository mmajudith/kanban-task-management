"use client";

import { createSlice } from '@reduxjs/toolkit';
import { toggleTheme } from '../actions/themeAction';

const initialState = {
    currentTheme: JSON.parse(typeof window !== "undefined" && window.localStorage.getItem('theme') || '{}') || null,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
			state.currentTheme = payload;
		});
  },
})

export default themeSlice.reducer