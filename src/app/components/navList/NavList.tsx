"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store/hook";
import { Image, List, Typography } from 'antd';
import { listContainer, listTitleStyle, listStyle, linkStyle, createBoardStyle} from './NavListStyles';


const NavList = () => {
    const pathName = usePathname();

    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);
    const totalBoards = boardNames?.length
 
    return (
        <>   
            {boardsData.loading === 'pending' && (null)}
            {boardsData.loading === 'rejected' && (null)}

            <div style={listContainer}>
                <Typography.Text style={listTitleStyle}>
                    All Boards ({totalBoards}) 
                </Typography.Text>
                {boardsData.loading === 'fulfilled' && (
                    boardNames?.length > 0 ? (
                        <List 
                            className="w-100"
                            itemLayout="vertical" 
                            dataSource={boardNames} 
                            renderItem={(name, index) => { 
                                const replaceAllSpace = name.replaceAll(' ', '-');
                                const href = index === 0 ? `/` : `/${replaceAllSpace}`;
                                const isActive = pathName === href;
                                return (
                                    <Link href={href} 
                                        className={`${isActive && 'active'} flex-row flex-start`} 
                                        style={linkStyle}
                                    >
                                        <Image 
                                            preview={false} 
                                            src={`${isActive ? `/assets/icon-board-white.svg` : `/assets/icon-board.svg`}`} 
                                            className="flex-row flex-start"
                                        />
                                        <List.Item style={listStyle}>{name}</List.Item>
                                    </Link>
                                )
                            }}
                        />
                    ) : (
                        null
                    )
                )}
                
                <div style={createBoardStyle} className="flex-row flex-start">
                    <Image 
                        preview={false} 
                        src="/assets/icon-purple-board.svg"
                        className="flex-row flex-start"
                    />
                    <Typography.Text style={{paddingLeft: 15, color:'#635FC7'}}>
                        + Create New Board
                    </Typography.Text>
                </div>
            </div>         
        </>
    )
}

export default NavList;