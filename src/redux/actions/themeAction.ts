import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleTheme = createAsyncThunk('toggleTheme', async (_, thunkAPI) => {
    const currentTheme = await JSON.parse(localStorage.getItem('theme') || '{}');
    if(!currentTheme){
        await localStorage.setItem('theme', JSON.stringify({isDark: false}));
    }

    const toggleIsDark = {...currentTheme, isDark: !currentTheme.isDark};
    await localStorage.setItem('theme', JSON.stringify(toggleIsDark))

	return toggleIsDark;
});