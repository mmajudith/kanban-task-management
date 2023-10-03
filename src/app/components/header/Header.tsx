"use client"

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/redux/store/hook";
import NavList from "../navList/NavList";
import ThemeSwitcher from "../ThemeSwitcher";
import AddIcon from "../../../../public/assets/icon-add-task-mobile.svg";
import DotsIcon from "../../../../public/assets/icon-dots.svg";
import ArrowIcon from "../../../../public/assets/icon-arrow.svg";

import type { MenuProps } from "antd";
import { Layout, Image, Typography, Grid, Button, Dropdown, Space} from "antd";
import { headerStyle, logoStyle, headerTitleStyle, 
    addTaskStyle, headerListCon, listThemeCon, navModalStyle 
} from "./headerStyles";

const items: MenuProps['items'] = [{key: '1', label: 'Edit Board'}, {key: '2', label: 'Delete Board', danger: true}]

const HeaderNav = () => {
    const pathName = usePathname();

    const [isOpen, setIsOpen] = useState(false)
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    const { useBreakpoint } = Grid;
    const { xl, md, sm } = useBreakpoint();
    const logoWidth = xl ? 300 : md ? 280 : 50;

    const isOpenHandler = () => {
        setIsOpen(!isOpen);
    }

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
                style={{...headerListCon, width: `calc(100% - ${logoWidth}px)`, paddingLeft: sm? 23:10 }} 
                className="flex-row between"
            >
                <div className="flex-row center" style={{gap:7}}>
                    <Typography.Text style={{...headerTitleStyle, fontSize: sm ? 24 : 16}}>
                        {boardNames?.length > 0 && (pathName === '/' ? boardNames[0] : pathName.replace(/[/-]/g, ' '))}
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
                
                <Space size={sm ? 20:10}>
                    <Button type="primary" style={{...addTaskStyle,  width: md? 164:45, height:md? 48:32}}>
                        {md ? ('+ Add New Task') : ( <AddIcon />)}
                    </Button>
                        
                    <Dropdown 
                        menu={{items}} 
                        placement="bottomRight" 
                        trigger={["click"]} 
                        overlayStyle={{width: 192, top: 80}}
                    >
                        <DotsIcon style={{cursor: 'pointer'}} className="flex-col center"/>
                    </Dropdown>
                </Space>
            </div>
        </Layout.Header>
    )
}

export default HeaderNav