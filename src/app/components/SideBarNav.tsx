"use client";

import Link from "next/link"
import { useAppSelector } from "@/redux/app/hook";

const SiderBarNav = () => {
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    return (
        <div>
            {boardsData.loading === 'pending' && (<p>Loading....</p>)}
            {boardsData.loading === 'rejected' && (<p>Please check your network</p>)}
            {boardsData.loading === 'fulfilled' && (
                    <ul>
                         {boardNames.map((name:string, index:number) => {
                            const replaceAllSpace = name.replaceAll(' ', '-');
                            return(
                                <Link href={index === 0 ? `/` : `/${replaceAllSpace}`} key={`${name}${index}`}>
                                    <li>{name}</li>
                                </Link>
                            )
                        })}
                    </ul>
            )}    
            
            <p>Create board</p>
        
        </div>
    )
}

export default SiderBarNav;