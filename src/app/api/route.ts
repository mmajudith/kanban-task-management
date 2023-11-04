import { NextRequest, NextResponse  } from "next/server";
import { NextApiResponse } from "next";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { getBoards } from "@/firebase/firestore/getBoards";
import { updateBoards } from "@/firebase/firestore/updateBoards";

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

export const POST = async (req: NextRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') return res.status(405).end();

    const body = await req.json();
    const { status } = await updateBoards(body, arrayUnion);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}

export const DELETE = async (req: NextRequest, res: NextApiResponse) => {
    if(req.method !== 'DELETE') return res.status(405).end();

    const body = await req.json();
    const { status } = await updateBoards(body, arrayRemove);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}


// export const UPDATE = async () => {

// }


// export const DELETE = async () => {

// }