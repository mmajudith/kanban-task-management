import { Checkbox, Modal, Typography } from "antd";
import DropDown from "../dropdown/DropDown";
import { TasksType } from "@/types/types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type VTProps = {
    task: TasksType
    index: number
    colIndex: number
    isView: boolean
    toggleIsTask: (colIndex: number, taskIndex: number) => void
    subTasksCompleted: (subtasks: [{isCompleted: boolean}]) => number
}

const { Text } = Typography;

const ViewTask = ({ task, index, colIndex,   isView, toggleIsTask, subTasksCompleted }: VTProps) => {
    console.log(task, 'viewtask')
    console.log(index, 'viewtask index')
    console.log(isView, 'isssss')
    const { description, isTask, status, subtasks, title } = task;

    const onChange = (e: CheckboxChangeEvent) => {
        console.log('checked = ', e.target.checked)
    }

    return(
        <Modal
            open={isView} 
            onCancel={() => toggleIsTask(colIndex, index)} 
            closeIcon={null} centered
            maskClosable={true} footer={null}
            style={{padding: '30px 0px'}}
        >
            <div>
                <Text>{title}</Text>
                {/* <DropDown label1={'Edit Task'} label2={'Delete Task'} onClick={onClick}/> */}
            </div>

            <Text>{description}</Text>

            <div>
                <Text>{`SubTasks (${subTasksCompleted(subtasks)} of ${subtasks.length})`}</Text>
                <div>
                    {subtasks.map(({isCompleted, title}, index) => (
                        <div key={index}>
                            {/* <Checkbox checked={isCompleted}>
                                {title}
                            </Checkbox> */}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                
            </div>
        </Modal>
    )
}

export default ViewTask;