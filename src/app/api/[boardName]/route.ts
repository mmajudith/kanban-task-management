import { NextResponse } from "next/server";
import { getBoards } from "@/firebase/firestore/getBoards";

//Fetching board based on name
export const GET = async (req: Request, { params }: {params: {boardName: string}})  => {
        const { boardName } = params 
        const { message, status } = await getBoards();

        if(status === 'empty'){
            return  NextResponse.json({message, status })
        }

        if(status === 'network'){
            return NextResponse.json({message, status});
        }

        const replaceDash = boardName.replaceAll('-', ' ');
        const board = message.filter((board: {name: string}) => board.name === replaceDash);

        
        return NextResponse.json({message: JSON.stringify(board), status});
}