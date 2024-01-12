import { Typography } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import { TasksType } from "@/types/types";
import ViewTask from "@/shared-components/viewTask/ViewTask";

import { colTasksContainer, subtasks } from "./boardTaskStyles";

type BTProps = {
    boardID: string
    columnsNames: {value: string, label: string}[]
    tasks: TasksType[]  
    colIndex: number
    toggleIsTask: (colIndex: number, taskIndex: number) => void
}

const { Text } = Typography;

const BoardTask = ({ boardID, columnsNames, tasks, colIndex, toggleIsTask }: BTProps) => {
    const { isDark } = useAppSelector(state => state.modalSlice.currentTheme);

    //function that return the total number of subtasks complete
    const subTasksCompleted = (subtasks: {isCompleted: boolean}[]) => {
        const completed = subtasks?.filter((subtask) => subtask.isCompleted === true);

        return completed.length ? completed.length : 0;
    }

    return(
        <>
            {tasks.map((task, k: number) => (
                <div 
                    key={`${task.status}${k}`} 
                    style={{
                        ...colTasksContainer,
                        backgroundColor: `${ !isDark ? `#FFF`:`#2B2C37`}`,
                    }}
                    className="hover-task"
                    onClick={(e) => { 
                        toggleIsTask(colIndex, k);
                    }}
                >
                    <Text className="task-title">
                        {task.title}
                    </Text>
                    <Text style={subtasks}>
                        {`${subTasksCompleted(task.subtasks)} of ${task.subtasks.length} subtasks`}
                    </Text>
                    {task.isTask && (
                        <ViewTask boardID={boardID}
                            columnsNames={columnsNames}
                            task={task} 
                            index={k} 
                            colIndex={colIndex}
                            toggleIsTask={toggleIsTask}
                            subTasksCompleted={subTasksCompleted}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default BoardTask;