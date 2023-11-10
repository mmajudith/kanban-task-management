import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards } from '@/app/services/getApis';

//Fetch boards action creator
export const fetchBoards = createAsyncThunk(
    'boards/fetchBoards',
    async () => {
      try{
        const data = await getBoards();
        const boards = JSON.parse(data.message);
  
        return boards;

      }catch(err){
        console.log('err trying to get boards');
      }
    }
);