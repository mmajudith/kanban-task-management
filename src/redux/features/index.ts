import { combineReducers } from "@reduxjs/toolkit";
import boardsSlice from "./boardsReducer";
import themeSlice  from "./utilitiesReducer";

export default combineReducers({
    themeSlice,
    boardsSlice
})