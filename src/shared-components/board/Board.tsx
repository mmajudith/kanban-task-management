"use client";

import { Col, Typography, Row } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import { useSiderWidth } from "@/hook/useSiderWidth";
import Utility from "../utility/Utility";
import BoardTask from "../../app/components/boardTask/BoardTask";
import SpinnerLoader from '../SpinnerLoader';
import { colContainer, colName, colStatusStyle, 
    newColWraper, newColumn } from "./boardStyles";

type BProps = {
    board: {
        name: string, 
        columns: [] 
    }[]
}

const { Text } = Typography;

const Board = ({ board }: BProps) => {
    console.log(board, 'single');
    const { loading } = useAppSelector(state => state.boardsSlice);
    const { currentTheme, isCollapse } = useAppSelector(state => state.themeSlice);
    const { isDark } = currentTheme;
    
    const [siderWidth] = useSiderWidth();  

    return(
        <>
            {loading === 'pending' && (<SpinnerLoader />)}

            {loading === 'rejected' && (
                <Utility 
                    text={'Please check your internet connection :( .'} 
                    buttonText={'Try again'}
                />
            )} 
            {loading === 'fulfilled' && !board.length && (
                <Utility 
                    text={'Empty document. Create a new board to get started.'} 
                    buttonText={'+ Create New Board'}
                />
            )}
            {loading === 'fulfilled' && board.length &&
                board.map((item, index) => ( 
                    <div key={`${item.name}${index}`} className="w-100 auto">
                        {item.columns.length < 0 ? (
                                <Utility 
                                    text={'This board is empty. Create a new column to get started.'} 
                                    buttonText={'+ Add New Column'}
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
                                        {item.columns.map((column: {name: string, tasks: []}, j: number) =>(
                                            <Col span={8} key={`${column.name}${j}`}>
                                                <div className="flex-row flex-start">
                                                    <span style={{
                                                        ...colStatusStyle,
                                                        backgroundColor: `${column.name === 'ToDo' ? '#49C4E5' : column.name === 'Doing' ? '#8471F2' : '#67E2AE'}`}}
                                                        >
                                                    </span>
                                                    <Text style={colName}>
                                                        {column.name}{" "}({column.tasks.length})
                                                    </Text>
                                                </div>
                                                
                                                <BoardTask tasks={column.tasks}/>
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