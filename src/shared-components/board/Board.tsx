"use client";

import { Col, Typography, Row } from "antd";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { boardModal, editBoard } from "@/redux/features/utilitiesReducer";
import { useSiderWidth } from "@/hook/useSiderWidth";
import Utility from "../utility/Utility";
import BoardTask from "../boardTask/BoardTask";
import { colContainer, colName, colStatusStyle, 
    newColWraper, newColumn } from "./boardStyles";
import { BoardType } from "@/types/types";

type BProps = {
    columnsNames: {value: string, label: string}[]
    board:BoardType[]
    toggleIsTask: (colIndex: number, taskIndex: number) => void
}

const { Text } = Typography;

const Board = ({ columnsNames, board, toggleIsTask }: BProps) => {
    console.log(board, 'single');
    const { currentTheme, isCollapse } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;
    const { boards } = useAppSelector(state => state.boardsSlice);
    const dispatch = useAppDispatch();
    
    const [siderWidth] = useSiderWidth(); 

    return(
        <>
            {Array.isArray(boards) && !boards.length && (
                <Utility 
                    text={'Empty document. Create a new board to get started.'} 
                    buttonText={'+ Create New Board'}
                    onClick={() => dispatch(boardModal())}
                />
            )}
            {Array.isArray(boards) && board.length &&
                board.map((item, index) => ( 
                    <div key={item.id} className="w-100 auto">
                        {!item.columns.length ? (
                                <Utility 
                                    text={'This board is empty. Create a new column to get started.'} 
                                    buttonText={'+ Add New Column'}
                                    onClick={() => dispatch(editBoard())}
                                />
                            ) : ( 
                                <div 
                                    style={{
                                        ...colContainer,  
                                        margin: `24px 24px 50px ${isCollapse ? 0 : siderWidth}px`,
                                    }}
                                >
                                <div 
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 24,
                                        marginLeft: 24
                                    }}
                                >
                                    {item.columns.map((column, j: number) =>(
                                        <div key={`${column.name}${j}`} style={{width: 300}}>
                                            <div className="flex-row flex-start">
                                                <span style={{
                                                    ...colStatusStyle,
                                                    backgroundColor: `${j === 0 ? '#49C4E5' : j === 1 ? '#8471F2' : '#67E2AE'}`}}
                                                    >
                                                </span>
                                                <Text style={colName}>
                                                    {column.name}{" "}({column.tasks.length})
                                                </Text>
                                            </div>
                                            
                                            <BoardTask 
                                                boardID={item.id}
                                                columnsNames={columnsNames} 
                                                tasks={column.tasks} colIndex={j} 
                                                toggleIsTask={toggleIsTask}
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                <div style={{ 
                                        paddingRight: 24,
                                        marginBottom: 50,
                                        // background: `linear-gradient(180deg,${!isDark ? `#E9EFFA 0%, rgba(233, 239, 250, 0.50)` : 
                                        // `rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13)`}100%)`,
                                    }}
                                >
                                    <div style={{
                                            ...newColWraper,
                                            background: `linear-gradient(180deg,${!isDark ? `#E9EFFA 0%, rgba(233, 239, 250, 0.50)` : 
                                            `rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13)`}100%)`,
                                        }}
                                        className="flex-col center"
                                    >
                                        <Text onClick={() => dispatch(editBoard())}
                                            style={newColumn} 
                                            className="new-col"
                                        >
                                            + New Column
                                        </Text>
                                    </div>
                                </div>
                            </div> 
                        )} 
                    </div>
                ))
            }
        </>
    )
}

export default Board;