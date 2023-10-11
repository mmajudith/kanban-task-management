import { Spin } from "antd";

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
    return (
        <div style={spinContainerStyle}>
            <Spin size="large"/>
        </div>
    )
}

export default SpinLoader