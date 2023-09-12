import { NextRequest, NextResponse  } from "next/server";
import { getData } from "@/firebase/firestore/getData";

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


// export const POST = async () => {
    
// }


// export const UPDATE = async () => {

// }


// export const DELETE = async () => {

// }