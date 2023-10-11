"use client";

import { useAppSelector } from "@/redux/store/hook";
import { Col, Typography, Row, Grid } from "antd";
import Utility from "../utility/Utility";
import { colContainer, colName, colStatusStyle, 
    colTasksContainer, newColWraper, newColumn } from "./singleBoardStyles";

type SBProps = {
    board: {
        message: []
        status: string
    } | undefined
}

const { Text } = Typography;

const SingleBoard = ({ board }: SBProps) => {
    console.log(board?.status, board?.message);
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);

    const { useBreakpoint } = Grid;
    const { xl, md } = useBreakpoint();
    const siderWidth = xl ? 300 : md ? 280 : 0;  

    //function that return the total number of subtasks complete
    const subTasksCompleted = (subtasks: [{isCompleted: boolean}]) => {
        const completed = subtasks.filter((subtask) => subtask.isCompleted === true);

        return completed.length;
    }

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
                    text={'This board is empty. Create a new column to get started.'} 
                    buttonText={'+ Add New Column'}
                />
            )}
            {board && board?.status === 'success' && board?.message.length < 0 ? (
                <Utility 
                    text={'This board is empty. Create a new column to get started.'} 
                    buttonText={'+ Add New Column'}
                />
            ) : (
                <>
                    {board?.message.map((item: {name: string, columns: []}, index) => (
                        <Row 
                            key={`${item.name}${index}`} 
                            gutter={52}
                            style={colContainer}
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

                                            {column.tasks.map((task: {subtasks: [{isCompleted: boolean}], status: string, description: string, title: string}, k: number) => (
                                                <div 
                                                    key={`${task.status}${k}`} 
                                                    style={{
                                                       ...colTasksContainer,
                                                        backgroundColor: `${ !isDark ? `#FFF`:`#2B2C37`}`,
                                                    }}
                                                    className="hover-task"
                                                >
                                                    <Text className="task-title">
                                                        {task.title}
                                                    </Text>
                                                    <Text style={{fontWeight: 600, fontSize: 13, color: '#828FA3'}}>
                                                        {`${subTasksCompleted(task.subtasks)} of ${task.subtasks.length} subtasks`}
                                                    </Text>
                                                </div>
                                            ))}
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
                    ))}
                </>
            )}
        </>
    )
}

export default SingleBoard;
