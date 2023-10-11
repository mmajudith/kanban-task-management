import { CSSProperties } from "react";

export const headerStyle: CSSProperties = {
    maxWidth: 1600,
    width: '100%',
    height: 80,
    margin: 'auto',
    padding: 0,    
    position: 'fixed',
    top: 0,
    left:0,
    right:0,
    zIndex: 2
};

export const logoStyle: CSSProperties = { 
    height: '100%', 
    paddingLeft: 23,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
};

export const headerListCon: CSSProperties = {
    height: '100%', 
    margin: 'auto', 
    padding: '0px 23px',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
};


export const headerTitleStyle: CSSProperties = { 
    fontWeight: 700
};

export const navModalStyle: CSSProperties = { 
    width: '100%', 
    height: `calc(100vh - 80px)`,
    margin: 'auto', 
    position: 'absolute',
    top: 80,
    left:0,
    right:0,
    zIndex: 2,
    backgroundColor: 'rgb(0,0,0, 0.5)',
};

export const listThemeCon: CSSProperties = {
    width: '80%', 
    height: 'fit-content', 
    margin: 'auto',
    marginTop: 10,
    padding: '20px 0px',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    opacity: 1
};