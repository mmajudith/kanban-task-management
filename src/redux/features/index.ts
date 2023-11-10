import { combineReducers } from "@reduxjs/toolkit";
import modalSlice  from "./utilitiesReducer";
import boardsSlice from "./boardsReducer";
import taskSlice from "./taskReducer";

export default combineReducers({
    modalSlice,
    boardsSlice,
    taskSlice
})