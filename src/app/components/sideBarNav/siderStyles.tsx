import { CSSProperties} from "react";

export const siderStyle: CSSProperties = {
    height: '100%',
    margin: 'auto', 
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
    position: 'absolute', 
    left: 0, 
    bottom: 47
};