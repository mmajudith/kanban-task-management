"use client";
 
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hook';
import { fetchBoards } from '@/redux/actions/boardsAction';
import SpinnerLoader from '../SpinnerLoader';

import { Layout, ConfigProvider } from 'antd';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

const layoutStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    margin: 'auto',
};

const containerStyle: React.CSSProperties = {
    maxWidth: 1600,
    width: '100%',
    height: '100%',
    margin: 'auto',
    position: 'relative'
};


const DispatchData = ({ children, }: { children: React.ReactNode }) => {
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const dispatch = useAppDispatch();

    const [ isClient, setIsClient ] = useState(false);
    
    useEffect(() => {

        dispatch(fetchBoards());
        setIsClient(true)

    }, [dispatch]);

    if(!isClient) return  <SpinnerLoader />

    return (
        <ConfigProvider theme={ !isDark ? lightTheme : darkTheme }>
            <Layout style={layoutStyle} hasSider={false}>
                <div style={containerStyle}>
                    {children} 
                </div>
            </Layout>
        </ConfigProvider>
    )
}

export default DispatchData;