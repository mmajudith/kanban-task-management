"use client";

import { Col, Typography, Row } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import { useSiderWidth } from "@/hook/useSiderWidth";
import { BoardType } from "@/types/types";
import Utility from "../utility/Utility";
import BoardTask from "../../app/components/boardTask/BoardTask";
import { colContainer, colName, colStatusStyle, 
    newColWraper, newColumn } from "./singleBoardStyles";

type SBProps = {
    board: {
        message: []
        status: string
    } | undefined
}

const { Text } = Typography;

const SingleBoard = ({ board }: SBProps) => {
    console.log(board?.status, board?.message);
    const { currentTheme, isCollapse } = useAppSelector(state => state.themeSlice);
    const { isDark } = currentTheme;

    const [siderWidth] = useSiderWidth();  

    return(
        <>
            {board && board?.status === 'network' && (
                <Utility 
                    text={'Please check your internet connection :( .'} 
                    buttonText={'Try again'}
                />
            )} 
            {board && board?.status === 'empty' && (
                <Utility 
                    text={'Empty document. Create a new board to get started.'} 
                    buttonText={'+ Create New Board'}
                />
            )}
            {board && board?.status === 'success' && 
                board?.message.map((item: BoardType, index) => (
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

export default SingleBoard;
