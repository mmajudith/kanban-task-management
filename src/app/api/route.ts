import { NextRequest, NextResponse  } from "next/server";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { getBoards } from "@/firebase/firestore/getBoards";
import { postDeleteBoard } from "@/firebase/firestore/postDeleteBoard";
import { updateBoard } from "@/firebase/firestore/updateBoard";

//Fetching all the boards 
export const GET = async () => {
    const { message, status } = await getBoards();

    if(status === 'empty'){
        return  NextResponse.json({message, status });
    }

    if(status === 'network'){
        return NextResponse.json({message, status});
    }
    
    return NextResponse.json({message: JSON.stringify(message), status });   
}

//Post a new board 
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { status } = await postDeleteBoard(body, arrayUnion);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}

//Delete a board 
export const DELETE = async (req: NextRequest) => {
    const body = await req.json();
    const { status } = await postDeleteBoard(body, arrayRemove);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}

//Update a board 
export const PUT = async (req: NextRequest) => {
    const body = await req.json();
    const status = await updateBoard(body);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}