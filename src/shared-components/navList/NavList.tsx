"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store/hook";
import { useBoardNames } from "@/hook/useBoardNames";
import BoardModal from "../boardModal/BoardModal";
import BoardIcon from "../../../public/assets/icon-board.svg";

import { List, Typography } from 'antd';
import { listContainer, listTitleStyle, listStyle, linkStyle, createBoardStyle} from './NavListStyles';

type NLProps = {
    isOpenHandler?: () => void
}

const NavList = ({isOpenHandler}: NLProps) => {
    const pathName = usePathname();

    const [ isBoardModal, setIsBoardModal ] = useState(false);
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const {boardNames, loading} = useBoardNames();
    const totalBoards = boardNames?.length
 
    return (
        <>   
            {loading === 'pending' && (null)}
            {loading === 'rejected' && (null)}

            <div style={listContainer}>
                <Typography.Text style={listTitleStyle}>
                    All Boards ({totalBoards}) 
                </Typography.Text>
                {loading === 'fulfilled' && (
                    boardNames?.length > 0 ? (
                        <List 
                            className="w-100 x-overflow"
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
                
                <div 
                    style={createBoardStyle} 
                    className="flex-row flex-start"
                    onClick={() => {
                        setIsBoardModal(!isBoardModal);
                    }}
                >
                    <BoardIcon className='board-icon-purple'/>
                    <Typography.Text style={{paddingLeft: 15, color:'#635FC7'}}>
                        + Create New Board
                    </Typography.Text>
                </div>
            </div>    
            {isBoardModal && (
                <BoardModal 
                    isBoardModal={isBoardModal} 
                    setIsBoardModal={() => setIsBoardModal(!isBoardModal)}
                />
            )}     
        </>
    )
}

export default NavList;