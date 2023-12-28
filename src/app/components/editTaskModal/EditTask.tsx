import { useState } from "react";
import { Modal, Form, Input,Typography, Button, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { editTask } from "@/redux/features/utilitiesReducer";
import { TasksType } from '@/types/types';
import CloseIcon from '../../../../public/assets/icon-cross.svg';
import ArrowIcon from '../../../../public/assets/icon-arrow.svg';
import { btnStyles, colItem, columnsIput, inputStyles } from "@/shared-components/createNewBoardModal/boardModalStyles";

type ETProps = {
    columnsNames: {value: string, label: string}[]
    colTask: TasksType
    setColTask: React.Dispatch<React.SetStateAction<TasksType>>
}

const EditTask = ({ columnsNames, colTask, setColTask }: ETProps) => {
    const { description, subtasks, title } = colTask;
    const initialValues = { description,
        subtasks: subtasks.map(subtask => subtask),
        title
    }

    const [ status, setStatus ] = useState(colTask.status);
    const dispatch = useAppDispatch();
    const { currentTheme, isEditTask } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;

    const onFinish = async (values: any) => {
        const newEditedTask = { ...values,  
            isTask: false,
            status,
            subtasks: values.subtasks.map((subtask: {title: string, isCompleted: boolean}) => {
                if(subtask.isCompleted === undefined){
                    return ({...subtask, isCompleted: false})
                }
                return subtask
            })
        }
        
        setColTask(newEditedTask);
        dispatch(editTask());
    }

    return ( 
        <div onClick={(e) => e.stopPropagation()}>
            <Modal title={'Edit Task'} 
                open={isEditTask} 
                onCancel={() => dispatch(editTask())} 
                closeIcon={null} centered
                maskClosable={true} footer={null}
                style={{padding: '15px 0px'}}
            >
                <Form 
                    onFinish={onFinish}
                    initialValues={initialValues}
                    layout="vertical" preserve={false}
                    name="edit-task" requiredMark={false}
                    colon={false} autoComplete='off'
                >
                    <Form.Item label={'Title'} name={'title'} 
                        rules={[{pattern: /[a-z]/, message: 'Task title must contain letters', required: true}]}  
                        style={{marginBottom: 24}}
                    >
                        <Input placeholder="e.g. Take coffee break" 
                            className="board-name" size="large" 
                            style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}
                        />
                    </Form.Item>

                    <Form.Item label={'Description'} name={'description'} 
                        rules={[{pattern: /[a-z]/, message: 'Task description must contain letters'}]}  
                        style={{marginBottom: 24}}
                    >
                        <Input.TextArea 
                            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." 
                            className="board-name" size="large" 
                            style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37', resize: 'none'}}
                        />
                    </Form.Item>

                    <Typography.Text>Subtasks</Typography.Text>

                    <Form.List name={'subtasks'}>
                        {(fields, { add, remove}) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={index}
                                        className="flex-row between" 
                                        style={columnsIput}
                                    >
                                        <Form.Item name={[field.name, 'title']} 
                                            style={colItem}
                                            rules={[{pattern: /[a-z]/, message: 'subTask must contain letters', required: true}]} 
                                        >
                                            <Input size="large" placeholder='e.g. Drink coffee & smile'  className="board-name"
                                                style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}
                                            />
                                        </Form.Item>

                                        <CloseIcon onClick={() => remove(index)} style={{cursor: 'pointer'}} />
                                    </div>
                                ))}
                                <Button 
                                    onClick={() => add()}
                                    style={{...btnStyles, marginBottom: 24}}
                                >
                                    + Add New Subtask
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Typography.Text>
                        Status
                    </Typography.Text>

                    <Select suffixIcon={<ArrowIcon />} 
                        onChange={(value) => setStatus(value)}
                        style={{width: '100%', marginTop: 10}}
                        options={columnsNames} size='large' value={status}
                    />

                    <Form.Item>
                        <Button htmlType="submit" type="primary" style={{
                                ...btnStyles, marginTop: 24,
                                cursor: 'pointer'
                            }}
                        >
                            Update Task
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default EditTask;