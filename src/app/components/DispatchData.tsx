"use client"
 
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/app/hook';
import { fetchBoards } from '@/redux/actions/boardsAction';


const DispatchData = ({ children, }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const [ isClient, setIsClient ] = useState(false);

    useEffect(() => {

        dispatch(fetchBoards());
        setIsClient(true)

    }, [dispatch]);

    return <>{isClient ? (<>{children}</>) : (<p>Loading client</p>)}</>
}

export default DispatchData;