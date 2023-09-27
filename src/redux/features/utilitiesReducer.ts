import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
    currentTheme: boolean
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { currentTheme: false } as ThemeState,
  reducers: {
    toggleTheme: (state ) => {
        state.currentTheme = !state.currentTheme;
    },
  },
  extraReducers: (builder) => {},
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer