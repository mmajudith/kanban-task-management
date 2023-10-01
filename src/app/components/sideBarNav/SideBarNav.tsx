"use client";

import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import HideIcon from "../../../../public/assets/icon-hide-sidebar.svg";
import ShowIcon from "../../../../public/assets/icon-show-sidebar.svg";

import { Layout, Typography, Grid } from 'antd';
import { siderStyle, siderContainerStyle, hideSiderContainer, showSider} from './siderStyles';
import NavList from "../navList/NavList";
import { useAppSelector } from "@/redux/store/hook";

const SiderBarNav = () => {
    const [ collapse, setCollapse ] = useState(false);
    const { currentTheme } = useAppSelector(state => state.themeSlice);

    const { useBreakpoint } = Grid;
    const { xl, md } = useBreakpoint();
    const siderWidth = xl ? 300 : md ? 280 : 0;    

    const collapseHandler = () => {
        setCollapse(!collapse);
    }
 
    return (
        <>
            {!collapse && (
                <Layout.Sider 
                    style={siderStyle} 
                    width={siderWidth} 
                >
                    <div style={siderContainerStyle}>
                        <NavList />

                        <div style={{width: '100%'}}>
                            <ThemeSwitcher />
                            <div 
                                onClick={collapseHandler}
                                className={`flex-row flex-start ${!currentTheme ? `hover-light` : `hover-dark`}`} 
                                style={hideSiderContainer}
                            >
                                <HideIcon />
                                <Typography.Text 
                                    className="text"
                                >
                                    Hide Sidebar
                                </Typography.Text>
                            </div>
                        </div>   
                    </div>
                </Layout.Sider>
            )}
            {collapse && (
                <ShowIcon 
                    onClick={collapseHandler}
                    style={{...showSider, display: md ? 'block' : 'none'}}
                    className='show-sidebar'
                />
            )}
        </>

    )
}

export default SiderBarNav;