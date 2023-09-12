import { getASingleBoard } from "../client-apis/apis"

export default async function Board({params: {boardName}}: { params: { boardName: string}}) {
  const board = await getASingleBoard(boardName);
  const { message, status } = board;
  const singleBoard = JSON.parse(message)
  console.log(board, 'single board');
                  
    return (
        <main className=''>
          <h1>Board</h1>
          {<p>{singleBoard[0].name}</p>}
        </main>
    )
  }