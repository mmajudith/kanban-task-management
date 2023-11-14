import { createAsyncThunk } from '@reduxjs/toolkit';
import { getASingleBoard } from '@/app/clientApi/get';

//Fetch a board action creator
export const getBoard = createAsyncThunk(
    'getBoard',
    async (boardName: string) => {
      try{
        const data = await getASingleBoard(boardName);
        const board = JSON.parse(data?.message);
  
        return board;

      }catch(err){
        console.log('err trying to get a board');
      }
    }
);