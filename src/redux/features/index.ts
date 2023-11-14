import { combineReducers } from "@reduxjs/toolkit";
import modalSlice  from "./utilitiesReducer";
import boardsSlice from "./boardsReducer";
import boardSlice from "./boardReducer";

export default combineReducers({
    modalSlice,
    boardsSlice,
    boardSlice
})