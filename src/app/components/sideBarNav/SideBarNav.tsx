"use client";

import { Layout, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { useSiderWidth } from '@/hook/useSiderWidth';
import { collapse } from "@/redux/features/utilitiesReducer";
import NavList from "../../../shared-components/navList/NavList";

import ThemeSwitcher from "../../../shared-components/ThemeSwitcher";
import HideIcon from "../../../../public/assets/icon-hide-sidebar.svg";
import ShowIcon from "../../../../public/assets/icon-show-sidebar.svg";
import { siderStyle, siderContainerStyle, hideSiderContainer, showSider} from './siderStyles';

const SiderBarNav = () => {
    const dispatch = useAppDispatch();
    const { currentTheme, isCollapse } = useAppSelector(state => state.themeSlice);
    const { isDark } = currentTheme;

    const [siderWidth , xl, md, sm] = useSiderWidth();  
 
    return (
        <>
            {!isCollapse && (
                <Layout.Sider 
                    style={{...siderStyle, borderRightColor: !isDark ? '#E4EBFA' : '#3E3F4E'}} 
                    width={siderWidth} 
                    theme={`${!isDark ? 'light' : 'dark'}`} 
                >
                    <div style={siderContainerStyle}>
                        <NavList />

                        <div style={{width: '100%'}}>
                            <ThemeSwitcher />
                            <div 
                                onClick={() => dispatch(collapse())}
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
            {isCollapse && (
                <ShowIcon 
                    onClick={() => dispatch(collapse())}
                    style={{...showSider, display: md ? 'block' : 'none'}}
                    className='show-sidebar'
                />
            )}
        </>

    )
}

export default SiderBarNav;