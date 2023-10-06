"use client";

import { useState } from "react";
import ThemeSwitcher from "../../../shared-components/ThemeSwitcher";
import HideIcon from "../../../../public/assets/icon-hide-sidebar.svg";
import ShowIcon from "../../../../public/assets/icon-show-sidebar.svg";

import { Layout, Typography, Grid } from 'antd';
import { siderStyle, siderContainerStyle, hideSiderContainer, showSider} from './siderStyles';
import NavList from "../../../shared-components/navList/NavList";
import { useAppSelector } from "@/redux/store/hook";

const SiderBarNav = () => {
    const [ collapse, setCollapse ] = useState(false);
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);

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
                    style={{...siderStyle}} 
                    width={siderWidth} 
                    theme={`${!isDark ? 'light' : 'dark'}`} 
                >
                    <div style={siderContainerStyle}>
                        <NavList />

                        <div style={{width: '100%'}}>
                            <ThemeSwitcher />
                            <div 
                                onClick={collapseHandler}
                                className={`flex-row flex-start ${!isDark ? `hover-light` : `hover-dark`}`} 
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