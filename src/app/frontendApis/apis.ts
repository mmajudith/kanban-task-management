const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

//Fetches all the boards
export const getBoards = async () => {
    try{
        const res = await fetch(`${SERVER_ENDPOINT}/api`, { cache: "no-cache"});
        const data = await res.json();
        // const { message, status } = data;
        
        // const convertBoardsToObject = JSON.parse(data);
        // console.log(data, 'boarlllllllllllllllll');

        return data;

    }catch(err){
        console.log('err getting boards');
    }
}

//Fetch a single board
export const getASingleBoard = async (boardName: string) => {
    try{
        const res = await fetch(`${SERVER_ENDPOINT}/api/${boardName}`, { cache: "no-cache"});
        const board = await res.json();
        const convertToObject = JSON.parse(board);
     
        return convertToObject;

    }catch(err){
        console.log('err getting a single board');
    }
}