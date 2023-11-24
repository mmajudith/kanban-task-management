"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout, Image, Typography } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import { useSiderWidth } from "@/hook/useSiderWidth";
import { TasksType } from "@/types/types";
import NavList from "../../../shared-components/navList/NavList";
import ThemeSwitcher from "../../../shared-components/ThemeSwitcher";
import AddEditDelBoardTask from "../addEditDeleteBoardTask/AddEditDelBoardTask";
import ArrowIcon from "../../../../public/assets/icon-arrow.svg";

import { headerStyle, logoStyle, headerTitleStyle, 
     headerListCon, listThemeCon, navModalStyle 
} from "./headerStyles";

const HeaderNav = () => {
    const pathName = usePathname();
    const removedSpecialChar = pathName.replace(/[/-]/g, ' ').trim();

    const [isOpen, setIsOpen] = useState(false);
    const [boardColumn, setBoardColumn] = useState<{ name: string; tasks: TasksType[]; }[][]>();
    const { currentTheme, isCollapse } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData.boards?.map((board) => board.name);
 
    const [siderWidth , xl, md, sm] = useSiderWidth();  
    const logoWidth = xl ? 300 : md ? 280 : 50;

    const isOpenHandler = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(boardsData.boards){
            const columns = boardsData.boards.filter((board, index) => {
            if(pathName === '/'){
                return index === 0
            }
                return board.name === removedSpecialChar
            }).map(singleBoard => singleBoard.columns);
            setBoardColumn(columns);
        }
        
    }, [boardsData.boards, pathName]);

    return (
        <Layout.Header 
            style={headerStyle} 
            className="flex-row between"
        >
            {md ? (
                <div 
                    style={{
                        ...logoStyle, 
                        width: logoWidth, 
                        borderRightColor: !isDark ? '#E4EBFA' : '#3E3F4E',
                        borderBottomColor: !isDark ? '#E4EBFA' : '#3E3F4E',
                        borderBottomWidth: isCollapse ? 1 : 0,
                    }} 
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
                style={{
                    ...headerListCon, width: `calc(100% - ${logoWidth}px)`, 
                    paddingLeft: sm ? 23 : 10,
                    borderBottomColor: !isDark ? '#E4EBFA' : '#3E3F4E' ,
                    borderBottomWidth: md ? 1 : 0,
                }} 
                className="flex-row between"
            >
                <div className="flex-row center" style={{gap:7}}>
                    <Typography.Text style={{...headerTitleStyle, fontSize: sm ? 24 : 16}}>
                        {boardNames?.length > 0 && (pathName === '/' ? boardNames[0] : removedSpecialChar)}
                    </Typography.Text>
                    {!md && (
                        <ArrowIcon
                            onClick={isOpenHandler}
                            style={{cursor: 'pointer', transform: isOpen? "rotate(-180deg)" : "rotate(0deg)"}}
                        />
                    )}
                </div>
                {!md && isOpen && (
                    <div style={navModalStyle}>
                        <div style={{...listThemeCon, background: !isDark? '#FFFFFF':'#2B2C37'}}>
                            <NavList isOpenHandler={isOpenHandler}/>
                            <ThemeSwitcher />
                        </div>
                    </div>
                )}
                
                <AddEditDelBoardTask
                    boardColumn={boardColumn} 
                    boardNames={boardNames}
                    md={md}
                    sm={sm}
                />
            </div>
        </Layout.Header>
    )
}

export default HeaderNav;