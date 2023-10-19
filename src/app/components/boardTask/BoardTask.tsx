import { Typography } from "antd";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { viewTask } from "@/redux/features/taskReducer";
import { isViewTask } from "@/redux/actions/taskAction";
import { TasksType } from "@/types/types";
import ViewTask from "@/shared-components/viewTask/ViewTask";

import { colTasksContainer, subtasks } from "./boardTaskStyles";

type BTProps = {
    tasks: []  
}

const { Text } = Typography;

const BoardTask = ({ tasks }: BTProps) => {
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const dispatch = useAppDispatch();

    //function that return the total number of subtasks complete
    const subTasksCompleted = (subtasks: [{isCompleted: boolean}]) => {
        const completed = subtasks.filter((subtask) => subtask.isCompleted === true);

        return completed.length;
    }

    return(
        <>
            {tasks.map((task: TasksType, k: number) => (
                <div 
                    key={`${task.status}${k}`} 
                    style={{
                        ...colTasksContainer,
                        backgroundColor: `${ !isDark ? `#FFF`:`#2B2C37`}`,
                    }}
                    className="hover-task"
                    onClick={() => { 
                        // dispatch(viewTask(task));
                        dispatch(isViewTask(task));
                    }}
                >
                    <Text className="task-title">
                        {task.title}
                    </Text>
                    <Text style={subtasks}>
                        {`${subTasksCompleted(task.subtasks)} of ${task.subtasks.length} subtasks`}
                    </Text>
                    {/* {!task.isTask && (<ViewTask />)} */}
                </div>
            ))}
        </>
    )
}

export default BoardTask;