import { NextRequest, NextResponse  } from "next/server";
import { updateData } from "@/firebase/firestore/updateData";
import { NextApiResponse } from "next";
import { getData, } from "@/firebase/firestore/getData";

//Fetching all the boards 
export const GET = async () => {
        const { message, status } = await getData();

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
    const { status } = await updateData(body);
    if(status === 'network'){
        return NextResponse.json({message: 'Network error!'});
    }    

    return NextResponse.json({message: status});
}


// export const UPDATE = async () => {

// }


// export const DELETE = async () => {

// }