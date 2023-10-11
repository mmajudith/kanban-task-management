"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store/hook";
import BoardIcon from "../../../public/assets/icon-board.svg";

import { List, Typography } from 'antd';
import { listContainer, listTitleStyle, listStyle, linkStyle, createBoardStyle} from './NavListStyles';

type NLProps = {
    isOpenHandler?: () => void
}

const NavList = ({isOpenHandler}: NLProps) => {
    const pathName = usePathname();

    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const boards = useAppSelector(state => state.boardsSlice);
    const boardNames = boards.boards?.map((board: {name: string}) => board.name);
    const totalBoards = boardNames?.length
 
    return (
        <>   
            {boards.loading === 'pending' && (null)}
            {boards.loading === 'rejected' && (null)}

            <div style={listContainer}>
                <Typography.Text style={listTitleStyle}>
                    All Boards ({totalBoards}) 
                </Typography.Text>
                {boards.loading === 'fulfilled' && (
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
                                        className={`${isActive && 'active'} flex-row flex-start 
                                            ${!isDark ? `hover-light` : `hover-dark`}`
                                        } 
                                        style={linkStyle}
                                        onClick={isOpenHandler}
                                    >
                                        <BoardIcon />
                                        <List.Item style={listStyle} className="text">{name}</List.Item>
                                    </Link>
                                )
                            }}
                        />
                    ) : (
                        null
                    )
                )}
                
                <div style={createBoardStyle} className="flex-row flex-start">
                    <BoardIcon className='board-icon-purple'/>
                    <Typography.Text style={{paddingLeft: 15, color:'#635FC7'}}>
                        + Create New Board
                    </Typography.Text>
                </div>
            </div>         
        </>
    )
}

export default NavList;