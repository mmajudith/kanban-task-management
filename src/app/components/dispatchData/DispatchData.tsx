"use client"
 
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hook';
import { fetchBoards } from '@/redux/actions/boardsAction';
import SpinnerLoader from '../SpinnerLoader';

import { Layout, ConfigProvider } from 'antd';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

const layoutStyle: React.CSSProperties = {
    maxWidth: 1600,
    width: '100vw',
    height: '100vh',
    margin: 'auto',
};


const DispatchData = ({ children, }: { children: React.ReactNode }) => {
    const { currentTheme } = useAppSelector(state => state.themeSlice);
    const dispatch = useAppDispatch();

    const [ isClient, setIsClient ] = useState(false);

    useEffect(() => {

        dispatch(fetchBoards());
        setIsClient(true)

    }, [dispatch]);

    return (
        <ConfigProvider theme={ !currentTheme ? lightTheme : darkTheme }>
            <Layout style={layoutStyle}>
                {isClient ? (
                    <>{children}</>
                ) : (
                    <SpinnerLoader />
                )}
            </Layout>
        </ConfigProvider>
    )
}

export default DispatchData;