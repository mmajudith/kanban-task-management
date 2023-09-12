import { NextResponse } from "next/server";
import { getData } from "@/firebase/firestore/getData";

//Fetching board based on name
export const GET = async (req: Request, { params }: {params: {boardName: string}})  => {
        const { boardName } = params 
        const { message, status } = await getData();

        if(status === 'empty'){
            return  NextResponse.json({message, status })
        }

        if(status === 'network'){
            return NextResponse.json({message, status});
        }

        const replaceUnderscore = boardName.replaceAll('-', ' ');
        const board = message.filter((board: {name: string}) => board.name === replaceUnderscore);

        
        return NextResponse.json({message: JSON.stringify(board), status});
}