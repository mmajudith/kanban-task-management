"use client";

import Link from "next/link"
import { useAppSelector } from "@/redux/store/hook";
import { Button, Layout } from 'antd';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
    width: 300,
    height: '100%',
    margin: 'auto',
    backgroundColor: '#FFFFFF',
};

const SiderBarNav = () => {
    const boardsData = useAppSelector(state => state.boardsSlice);
    // const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    return (
        <Sider style={siderStyle}>
            {/* {boardsData.loading === 'pending' && (<p>Loading....</p>)}
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
            )}     */}
        
            <p>Create board</p>
        
        </Sider>
    )
}

export default SiderBarNav;