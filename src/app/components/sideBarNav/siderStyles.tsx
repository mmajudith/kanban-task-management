import { CSSProperties} from "react";

export const siderStyle: CSSProperties = {
    height: `calc(100vh - 80px)`,
    margin: 'auto', 
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    position: 'fixed',
    zIndex: 2
};

export const siderContainerStyle: CSSProperties = {
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between'
};

export const hideSiderContainer: CSSProperties = {
    width: 'content-fit',
    height: 45,
    paddingLeft: 23,
    marginRight: 23,
    marginTop: 10, 
    gap: 15, 
    cursor: 'pointer', 
    marginBottom: 47,
};
    
export const showSider: CSSProperties = {
    cursor: 'pointer', 
    position: 'fixed', 
    bottom: 47,
    zIndex: 2
};