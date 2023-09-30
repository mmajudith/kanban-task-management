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
    paddingLeft: 23, 
    gap: 15, 
    cursor: 'pointer', 
    marginTop: 23,
    marginBottom: 47
};
    
export const showSider: CSSProperties = {
    width: 'content-fit',
    height: 'content-fit', 
    margin: 'auto',
    cursor: 'pointer', 
    position: 'absolute', 
    left: 0, 
    bottom: 47
};