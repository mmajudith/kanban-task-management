import { combineReducers } from "@reduxjs/toolkit";
import themeSlice  from "./utilitiesReducer";
import boardsSlice from "./boardsReducer";
import taskSlice from "./taskReducer";

export default combineReducers({
    themeSlice,
    boardsSlice,
    taskSlice
})