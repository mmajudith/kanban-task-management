import { CSSProperties} from "react";

export const listContainer: CSSProperties = {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
};

export const listTitleStyle: CSSProperties = {
    color: '#828FA3', 
    fontWeight: 700, 
    fontSize: 12, 
    padding: '15px 0px 19px 23px',
    letterSpacing: 2.4
};


export const linkStyle: CSSProperties = {
    height: 45, 
    paddingLeft: 23, 
    marginRight: 23,
    fontWeight: 500,
    textTransform: 'capitalize'
};

export const listStyle: CSSProperties = {
    padding: 0, 
    margin: 0, 
    paddingLeft: 15,
};

export const createBoardStyle: CSSProperties = {
    width: '100%', 
    height: 45,
    paddingLeft: 23, 
    color:'#635FC7', 
    cursor: 'pointer'
};