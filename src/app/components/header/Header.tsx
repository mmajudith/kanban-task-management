"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store/hook";
import NavList from "../../../shared-components/navList/NavList";
import ThemeSwitcher from "../../../shared-components/ThemeSwitcher";
import BoardTask from "../boardTask/BoardTask";
import ArrowIcon from "../../../../public/assets/icon-arrow.svg";

import { Layout, Image, Typography, Grid } from "antd";
import { headerStyle, logoStyle, headerTitleStyle, 
     headerListCon, listThemeCon, navModalStyle 
} from "./headerStyles";



const HeaderNav = () => {
    const pathName = usePathname();
    const removedSpecialChar = pathName.replace(/[/-]/g, ' ').trim()

    const [isOpen, setIsOpen] = useState(false);
    const [boardColumn, setBoardColumn] = useState<{name: string}[]>();
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData.boards?.map((board: {name: string}) => board.name);
 
    const { useBreakpoint } = Grid;
    const { xl, md, sm } = useBreakpoint();
    const logoWidth = xl ? 300 : md ? 280 : 50;

    const isOpenHandler = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(boardsData.boards){
            const column = boardsData.boards.filter((board: {name: string, column: []}, index) => {
            if(pathName === '/'){
                return index === 0
            }
                return board.name === removedSpecialChar
            });
            setBoardColumn(column);
        }
        
    }, [boardsData.boards, pathName]);

    return (
        <Layout.Header style={headerStyle} className="flex-row between">
            {md ? (
                <div 
                    style={{...logoStyle, width: logoWidth, borderRightColor: !isDark ? '#E4EBFA' : '#3E3F4E'}} 
                    className="flex-row flex-start"
                >
                    <Image preview={false} 
                        src={`${!isDark ? `/assets/logo-dark.svg`:`/assets/logo-light.svg`}`} 
                        alt="site desktop logo"
                    />
                </div>
            ) : (
                <Image preview={false} src={`/assets/logo-mobile.svg`} alt="site mobile logo" style={{paddingLeft: 23}}/>
            )}
           
            <div 
                style={{...headerListCon, width: `calc(100% - ${logoWidth}px)`, paddingLeft: sm ? 23 : 10 }} 
                className="flex-row between"
            >
                <div className="flex-row center" style={{gap:7}}>
                    <Typography.Text style={{...headerTitleStyle, fontSize: sm ? 24 : 16}}>
                        {boardNames?.length > 0 && (pathName === '/' ? boardNames[0] : removedSpecialChar)}
                    </Typography.Text>
                    {!md && (
                        <ArrowIcon
                            onClick={isOpenHandler}
                            style={{cursor: 'pointer', transform: isOpen? "rotate(0deg)" : "rotate(-180deg)"}}
                        />
                    )}
                </div>
                {!md && isOpen && (
                    <div style={navModalStyle}>
                        <div style={{...listThemeCon, background: !isDark? '#FFFFFF':'#2B2C37'}}>
                            <NavList />
                            <ThemeSwitcher />
                        </div>
                    </div>
                )}
                
                <BoardTask
                    boardColumn={boardColumn} 
                    md={md}
                    sm={sm}
                />
            </div>
        </Layout.Header>
    )
}

export default HeaderNav;