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
    board:BoardType[]
    toggleIsTask: (colIndex: number, taskIndex: number) => void
}

const { Text } = Typography;

const Board = ({ board, toggleIsTask }: BProps) => {
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
            {board.length &&
                board.map((item, index) => ( 
                    <div key={`${item.name}${index}`} className="w-100 auto">
                        {!item.columns.length ? (
                                <Utility 
                                    text={'This board is empty. Create a new column to get started.'} 
                                    buttonText={'+ Add New Column'}
                                    onClick={() => dispatch(editBoard())}
                                />
                            ) : ( 
                                <Row 
                                    gutter={52}
                                    style={{
                                        ...colContainer,  
                                        margin: `24px 24px 50px ${isCollapse ? 0 : siderWidth}px`,
                                    }}
                                >
                                <Col span={18}>
                                    <Row gutter={26}>
                                        {item.columns.map((column, j: number) =>(
                                            <Col span={8} key={`${column.name}${j}`}>
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
                                                
                                                <BoardTask tasks={column.tasks} colIndex={j} toggleIsTask={toggleIsTask}/>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>

                                <Col span={6} style={{
                                    ...newColWraper,
                                    background: `linear-gradient(180deg,${!isDark ? `#E9EFFA 0%, rgba(233, 239, 250, 0.50)` : 
                                    `rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13)`}100%)`,
                                }}
                                className="flex-col center"
                                >
                                    <Text style={newColumn} className="new-col">
                                        + New Column
                                    </Text>
                                </Col>
                            </Row> 
                        )} 
                    </div>
                ))
            }
        </>
    )
}

export default Board;