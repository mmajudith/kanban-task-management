const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

//Fetches all the boards
export const getBoards = async () => {
    try {
        const res = await fetch(`${SERVER_ENDPOINT}/api`, { cache: "no-cache" });
        const data = await res.json();

        return data;

    } catch (err) {
        console.log('err getting boards');
    }
}

//Fetch a single board
export const getASingleBoard = async (boardName: string) => {
    try {
        const res = await fetch(`${SERVER_ENDPOINT}/api/${boardName}`, { cache: "no-cache" });
        const board = await res.json();

        return board;

    } catch (err) {
        console.log('err getting a single board');
    }
}