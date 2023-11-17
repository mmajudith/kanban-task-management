import { combineReducers } from "@reduxjs/toolkit";
import modalSlice  from "./utilitiesReducer";
import boardsSlice from "./boardsReducer";

export default combineReducers({
    modalSlice,
    boardsSlice
})