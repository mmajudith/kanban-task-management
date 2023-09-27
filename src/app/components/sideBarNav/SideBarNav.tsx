"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { Switch, Image, List, Layout, Typography, Grid } from 'antd';
import { siderStyle, siderContainerStyle, siderListContainer, 
        listTitleStyle, listStyle, linkStyle, createBoardStyle, 
        switchContainerStyle, hideSiderContainer, showSider
} from './siderStyles';
import { toggleTheme } from "@/redux/features/utilitiesReducer";

const SiderBarNav = () => {
    const [ collapse, setCollapse ] = useState(false);
    const pathName = usePathname();

    const { Sider } = Layout;
    const { Text } = Typography;
    const { useBreakpoint } = Grid;
    const { xl, md } = useBreakpoint();
    const siderWidth = xl ? 300 : md ? 280 : 0;

    const { currentTheme } = useAppSelector(state => state.themeSlice);
    const dispatch = useAppDispatch();
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);
    const totalBoards = boardNames?.length

    const collapseHandler = () => {
        setCollapse(!collapse);
    }
 
    return (
        <>
            {!collapse && (
                <Sider 
                    style={siderStyle} 
                    width={siderWidth} 
                >
                    <div style={siderContainerStyle}>
                        <div className="w-100">

                            {boardsData.loading === 'pending' && (null)}
                            {boardsData.loading === 'rejected' && (null)}

                            <div style={siderListContainer}>
                                <Text style={listTitleStyle}>All Boards ({totalBoards}) </Text>
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
                                    <Text style={{paddingLeft: 15, color:'#635FC7'}}>+ Create New Board</Text>
                                </div>
                            </div>
                        </div>

                        <div style={{width: '100%', marginBottom: 47}}>
                            <div style={{
                                ...switchContainerStyle, 
                                backgroundColor: !currentTheme? '#F4F7FD' : '#20212C'
                                }}
                                className="flex-row center"
                            >
                                <Image preview={false} src="/assets/icon-light-theme.svg" className="flex-row flex-start"/>
                                <Switch 
                                    style={{backgroundColor: '#635fc7'}}
                                    checked={currentTheme} 
                                    onChange={() => dispatch(toggleTheme())}
                                />
                                <Image preview={false} src="/assets/icon-dark-theme.svg" className="flex-row flex-start"/>
                            </div>

                            <div 
                                onClick={collapseHandler}
                                className="flex-row flex-start"  
                                style={hideSiderContainer}
                            >
                                <Image preview={false} src="/assets/icon-hide-sidebar.svg" className="flex-row flex-start"/>
                                <Text style={{color: '#828FA3'}}>Hide Sidebar</Text>
                            </div>
                        </div>
                    </div>
                </Sider>
            )}
            {collapse && (
                <div
                    onClick={collapseHandler}
                    style={{...showSider, display: md ? 'block' : 'none'}}
                >
                    <Image
                        preview={false} 
                        src="/assets/icon-show-sidebar.svg" alt="show sidebar icon"
                    />
                </div>
            )}
        </>

    )
}

export default SiderBarNav;