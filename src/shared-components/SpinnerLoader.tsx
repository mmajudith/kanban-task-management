"use client";

import { Spin } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import { useSiderWidth } from "@/hook/useSiderWidth";

export const spinContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    margin: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
};

export function SpinLoader() {
    const { isCollapse } = useAppSelector(state => state.themeSlice);
    const [siderWidth ] = useSiderWidth();   

    return (
        <div style={{...spinContainerStyle,
                padding: `0px 0px 0px ${isCollapse ? 0 : siderWidth}px`
            }}
        >
            <Spin size="large"/>
        </div>
    )
}

export default SpinLoader