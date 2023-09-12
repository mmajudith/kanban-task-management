import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards } from '@/app/client-apis/apis';

//Fetch boards action creator
export const fetchBoards = createAsyncThunk(
    'boards/fetchBoards',
    async () => {
      try{
        const data = await getBoards();
        const { message } = data;
        const boards = JSON.parse(message);

        return boards;

      }catch(err){
        console.log('err trying to get boards');
      }
    }
);