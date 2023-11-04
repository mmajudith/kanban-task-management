import { CSSProperties } from "react";

export const colContainer: CSSProperties = {
    width: 1250, 
    height: '100%',
    paddingBottom: 50,
    paddingRight: 24,
};


export const colName: CSSProperties = {
    fontWeight: 700,
    letterSpacing: '2.4px',
    color: '#828FA3',
    marginLeft: 5,
    fontSize: 14,
    textTransform: 'uppercase'
};

export const colStatusStyle: CSSProperties = {
    display: 'inline-block', 
    width: 12, 
    height: 12,
    borderRadius: 9999,
};

export const colTasksContainer: CSSProperties = {
    height: 'fit-content',
    marginTop: 26,
    padding: '26px 16px',
    fontSize: 15,
    borderRadius: 8,
    boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
    cursor: 'pointer'
};

export const newColWraper: CSSProperties = {
    marginTop: 50,
    borderRadius: 6,
};

export const newColumn: CSSProperties = {
    fontSize: 22,
    fontWeight: 600,
    cursor: 'pointer'
};