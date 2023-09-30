"use client";

import { useState } from "react";
import { Image, Layout, Typography, Grid } from 'antd';
import { siderStyle, siderContainerStyle, hideSiderContainer, showSider} from './siderStyles';
import NavList from "../navList/NavList";
import ThemeSwitcher from "../ThemeSwitcher";

const SiderBarNav = () => {
    const [ collapse, setCollapse ] = useState(false);

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
                                className="flex-row flex-start"  
                                style={hideSiderContainer}
                            >
                                <Image preview={false} src="/assets/icon-hide-sidebar.svg" className="flex-row flex-start"/>
                                <Typography.Text style={{color: '#828FA3'}}>Hide Sidebar</Typography.Text>
                            </div>
                        </div>   
                    </div>
                </Layout.Sider>
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