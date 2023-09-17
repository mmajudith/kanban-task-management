"use client"
 
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/store/hook';
import { fetchBoards } from '@/redux/actions/boardsAction';

import { Layout } from 'antd';

const layoutStyle: React.CSSProperties = {
    maxWidth: 1600,
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    backgroundColor: '#FFFFFF',
};


const DispatchData = ({ children, }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const [ isClient, setIsClient ] = useState(false);

    // useEffect(() => {

    //     dispatch(fetchBoards());
    //     setIsClient(true)

    // }, [dispatch]);

    return (
        <Layout style={layoutStyle} hasSider={true}>
            {/* {isClient ? ( */}
                <>{children}</>
            {/* ) : ( */}
                {/* <p>Loading client</p> */}
            {/* )} */}
        </Layout>
    )
}

export default DispatchData;