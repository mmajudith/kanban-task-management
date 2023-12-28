import { usePathname } from "next/navigation";
import { useState } from "react";
import { Checkbox, Modal, Typography, Select, notification } from "antd";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { postDeletePut } from "@/app/clientApi/postDeletePut";
import { shuffletask } from "@/firebase/firestore/tasks/shuffleTask";
import { editTask, savedBoard, deleteTask, deletedBoard } from "@/redux/features/utilitiesReducer";
import type { MenuProps } from "antd";
import DropDown from "../dropdown/DropDown";
import EditTask from "../../app/components/editTaskModal/EditTask";
import DeleteModal from "../deleteModal/DeleteModal";
import ArrowIcon from "../../../public/assets/icon-arrow.svg";
import { TasksType } from "@/types/types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type VTProps = {
    boardID: string
    columnsNames: {value: string, label: string}[]
    task: TasksType
    index: number
    colIndex: number
    toggleIsTask: (colIndex: number, taskIndex: number) => void
    subTasksCompleted: (subtasks: {isCompleted: boolean}[]) => number
}

const { Text } = Typography;

const ViewTask = ({ boardID, columnsNames, task, index, colIndex, toggleIsTask, subTasksCompleted }: VTProps) => {
    console.log(task, 'task!!!!!')
    const pathName = usePathname();
    const [api, contextHolder] = notification.useNotification();

    const [ colTask, setColTask ] = useState(task);
    const [isDeleting, setIsDeleting] = useState(false);
    const { currentTheme, isEditTask, isDeleteTask } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;
    const dispatch = useAppDispatch();

    const onClick: MenuProps['onClick'] = ({key}) => {
        if(key === '1') dispatch(editTask());
        if(key === '2') dispatch(deleteTask());
    }

    const onChange = (e: CheckboxChangeEvent, subTaskIndex: number) => {
        console.log('checked = ', e.target.checked);
        const { checked } = e.target;
        const subtasks = colTask.subtasks.map((subTask, index) => {
            return ({...subTask, isCompleted: index === subTaskIndex ? !subTask.isCompleted : subTask.isCompleted})
        })


        // subTaskChecked(boardID, colIndex, index, subTaskIndex, checked);
        setColTask({...colTask, subtasks })
    }

    const handleDeleteTask = async() => {
        const deletedTask = { id: boardID, colIndex, taskIndex: index }
        setIsDeleting(true);
        const { message } = await postDeletePut('DELETE', deletedTask)
        if(message === 'Network error!'){
            setIsDeleting(false);
            api['error']({message, placement: 'top'});
        }
        api['success']({message: `${colTask.title} task successfully deleted`, placement: 'top'});
    
        window.setTimeout(() => {
            dispatch(deleteTask());
            toggleIsTask(colIndex, index);
        
            if(pathName === `/`){
                dispatch(deletedBoard());
            }else{
                dispatch(savedBoard())
            }
        }, 3000);
    }

    const handleStatus = async() => {
        const prevStatus = task.status;
        const currentStatus = colTask.status;
        
        if(prevStatus !== currentStatus){
            await shuffletask(boardID, colIndex, index, currentStatus );
            dispatch(savedBoard())
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal title={
                    <div className="flex-row between" id='task-title' style={{gap: 24, marginBottom: 20, position: 'relative'}}>
                        {colTask.title}
                        <DropDown 
                            label1={'Edit Task'} label2={'Delete Task'} 
                            placement={"bottom"} position={'absolute'} 
                            top={'110%'} task={'task'} onClick={onClick}
                        />
                    </div>
                }
                style={{padding: '15px 0px'}}
                open={task.isTask} maskClosable={true} destroyOnClose
                onCancel={(e) => {
                    handleStatus();
                    toggleIsTask(colIndex, index);
                }}
                closeIcon={null} centered footer={null} 
            >

                <Text style={{color: '#828FA3'}}>{colTask.description}</Text>

                <div style={{margin: '20px 0px'}}>
                    <Text style={{fontSize: 12, fontWeight: 700}}>
                        {`SubTasks (${subTasksCompleted(colTask.subtasks)} of ${colTask.subtasks.length})`}
                    </Text>
                    
                    {colTask?.subtasks.map(({isCompleted, title}, index) => (
                        <div key={index} 
                            style={{
                                marginTop: 10, 
                                background: !isDark ? '#F4F7FD' : '#20212C', 
                                borderRadius: 4
                            }}
                            className="flex-row flex-start"
                        >
                            <Checkbox checked={isCompleted} onChange={(e) => onChange(e, index)} 
                                className={`${!isCompleted && `sub-hover`}`}
                                style={{ width: '100%', borderRadius: 4,
                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                    color: isCompleted ? '#828FA3' : !isDark ? '#000112' : '#FFF',
                                    fontWeight: 600,
                                    fontSize: 12, padding: '13px 10px',
                                }}
                            >
                                {title}
                            </Checkbox>
                        </div>
                    ))}
                </div>

                <div>
                    <Text style={{fontSize: 12, fontWeight: 700}}>
                        Current Status
                    </Text>
                    <Select suffixIcon={<ArrowIcon />} 
                        onChange={(value) => setColTask({...colTask, status: value})}
                        style={{width: '100%', marginTop: 10}}
                        options={columnsNames} size='large' value={colTask.status}
                    />
                </div>

            </Modal>

            {isEditTask && (
                <EditTask 
                    columnsNames={columnsNames} 
                    colTask={colTask}
                    setColTask={setColTask}
                />
            )}
            {isDeleteTask && (
                <DeleteModal 
                    name={'task'}
                    isDeleting={isDeleting} 
                    isDelete={isDeleteTask} 
                    onClick={() => dispatch(deleteTask())}
                    contextHolder={contextHolder}
                    description={`Are you sure you want to delete the ‘${colTask.title}’ task and its subtasks? 
                        This action cannot be reversed.`}
                    onDelete={handleDeleteTask}
                />
            )}
        </div>
    )
}

export default ViewTask;