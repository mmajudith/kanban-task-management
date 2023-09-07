import { getASingleBoard } from "../frontendApis/apis"

export default async function Board({params: {boardName}}: { params: { boardName: string}}) {
  const { message, status } = await getASingleBoard(boardName)
  console.log(message, status, 'single board')
                  
    return (
        <main className=''>
          <h1>Board</h1>
        </main>
    )
  }