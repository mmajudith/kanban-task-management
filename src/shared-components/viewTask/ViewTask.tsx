import { Checkbox, Modal, Typography, Select } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import type { MenuProps } from "antd";
import DropDown from "../dropdown/DropDown";
import ArrowIcon from "../../../public/assets/icon-arrow.svg"
import { TasksType } from "@/types/types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type VTProps = {
    columnsNames: {value: string, label: string}[]
    task: TasksType
    index: number
    colIndex: number
    toggleIsTask: (colIndex: number, taskIndex: number) => void
    subTasksCompleted: (subtasks: [{isCompleted: boolean}]) => number
}

const { Text } = Typography;

const ViewTask = ({columnsNames, task, index, colIndex, toggleIsTask, subTasksCompleted }: VTProps) => {
    console.log(task, 'viewtask')
    console.log(index, 'viewtask index')
    const { description, isTask, status, subtasks, title } = task;
    const { isDark } = useAppSelector(state => state.modalSlice.currentTheme);

    const onClick: MenuProps['onClick'] = ({key}) => {
        if(key === '1') console.log('edited');
        if(key === '2') console.log('deleted');
    }

    const onChange = (e: CheckboxChangeEvent) => {
        console.log('checked = ', e.target.checked)
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal title={
                    <div className="flex-row between" id='task-title' style={{gap: 24, marginBottom: 20, position: 'relative'}}>
                        {title}
                        <DropDown 
                            label1={'Edit Task'} label2={'Delete Task'} 
                            placement={"bottom"} position={'absolute'} 
                            top={'110%'} task={'task'} onClick={onClick}
                        />
                    </div>
                }
                open={isTask} maskClosable={true} destroyOnClose
                onCancel={(e) => {toggleIsTask(colIndex, index)}}
                closeIcon={null} centered footer={null} 
            >

                <Text style={{color: '#828FA3'}}>{description}</Text>

                <div style={{margin: '20px 0px'}}>
                    <Text style={{fontSize: 12, fontWeight: 700}}>
                        {`SubTasks (${subTasksCompleted(subtasks)} of ${subtasks.length})`}
                    </Text>
                    
                    {subtasks.map(({isCompleted, title}, index) => (
                        <div key={index} 
                            style={{
                                marginTop: 10, 
                                background: !isDark ? '#F4F7FD' : '#20212C', 
                                borderRadius: 4
                            }}
                            className="flex-row flex-start"
                        >
                            <Checkbox checked={isCompleted} onChange={onChange} 
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
                    // className="ant-select-suffix"
                        style={{width: '100%', marginTop: 10}}
                        options={columnsNames} size='large'
                        defaultValue={status}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ViewTask;