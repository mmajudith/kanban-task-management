import { NextRequest, NextResponse  } from "next/server";

import { getData } from "@/firebase/firestore/getData";

//Fetching all the boards 
export const GET = async () => {
    try{
        const { message, status } = await getData();

        if(status === 'empty'){
           return  NextResponse.json({message: 'Document does not exist', status })
        }
        
        return NextResponse.json({message: JSON.stringify(message), status });

    }catch(err){
        return NextResponse.json({message: err, status: 'network'});
    }
}

// export const POST = async () => {
    
// }

// export const UPDATE = async () => {

// }

// export const DELETE = async () => {

// }