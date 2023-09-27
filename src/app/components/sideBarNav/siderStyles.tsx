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

export const siderListContainer: CSSProperties = {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 19
};

export const listTitleStyle: CSSProperties = {
    color: '#828FA3', 
    fontWeight: 700, 
    fontSize: 12, 
    paddingLeft: 23, 
    paddingTop: 15,
    letterSpacing: 2.4
};

export const listStyle: CSSProperties = {
    padding: 0, 
    margin: 0, 
    paddingLeft: 15, 
    color: '#828FA3'
};

export const linkStyle: CSSProperties = {
    height: 45, 
    paddingLeft: 23, 
    fontWeight: 500
};

export const createBoardStyle: CSSProperties = {
    width: '100%', 
    paddingLeft: 23, 
    color:'#635FC7', 
    cursor: 'pointer'
};

export const switchContainerStyle: CSSProperties = {
    width: '85.5%', 
    height: 45, 
    margin: 'auto', 
    gap: 15
};

export const hideSiderContainer: CSSProperties = {
    width: 'content-fit',
    paddingLeft: 23, 
    gap: 15, 
    cursor: 'pointer', 
    marginTop: 23
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