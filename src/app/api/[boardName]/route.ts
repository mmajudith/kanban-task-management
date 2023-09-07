import { NextResponse } from "next/server";
import { getData } from "@/firebase/firestore/getData";

//Fetching board based on name
export const GET = async (req: Request, { params }: {params: {boardName: string}})  => {
    try{
        const { boardName } = params 
        const { message, status } = await getData();

        if(status === 'empty'){
            return  NextResponse.json({message: 'Document does not exist', status })
        }

        const replaceUnderscore = boardName.replaceAll('-', ' ');
        const board = message.filter((board: {name: string}) => board.name === replaceUnderscore);

        
        return NextResponse.json({message: JSON.stringify(board), status});

    }catch(err){
        return NextResponse.json({message: err, status: 'network'});
    }
}