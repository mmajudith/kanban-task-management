//Fetches all the boards
export const getBoards = async () => {
    try {
        const res = await fetch('/api', { cache: "no-cache" });
        const data = await res.json();

        return data;

    } catch (err) {
        console.log('err getting boards');
    }
}

//Fetch a single board
export const getASingleBoard = async (boardName: string) => {
    try {
        const res = await fetch(`/api/${boardName}`, { cache: "no-cache" });
        const board = await res.json();

        return board;

    } catch (err) {
        console.log('err getting a single board');
    }
}