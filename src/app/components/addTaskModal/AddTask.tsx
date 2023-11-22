import { useState } from 'react';
import { Modal, Form, Input,Typography, Button, Select, notification } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { postDeletePut } from '@/app/clientApi/postDeletePut';
import { addTask } from "@/redux/features/utilitiesReducer";
import CloseIcon from '../../../../public/assets/icon-cross.svg';
import ArrowIcon from '../../../../public/assets/icon-arrow.svg';
import { btnStyles, colItem, columnsIput, inputStyles } from "@/shared-components/createNewBoardModal/boardModalStyles";

type ATProps = {
    columnsNames: {value: string, label: string}[]
}

const AddTask = ({columnsNames}: ATProps) => {
    const initialValues = { description: '', subtasks: [{ title: '' }, { title: ''}], title: '' }
    const [api, contextHolder] = notification.useNotification();
    const [ status, setStatus ] = useState<string>(columnsNames[0].value)
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const dispatch = useAppDispatch();
    const { isAddTask,  currentTheme } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;

    const onFinish = async (values: any) => {
        const newTask = {
            ...values,   
            isTask: false, 
            status,
            subtasks: values.subtasks.map((subtask: { title: '' }) => ({...subtask, isCompleted: false}))
        }
        setIsCreatingTask(true);
      
        const { message } = await postDeletePut('POST', newTask);
        if(message === 'Network error!'){
            setIsCreatingTask(false);
            api['error']({message, placement: 'top'});
        }
        api['success']({message: `${newTask.title} task successfully created.`, placement: 'top'});
        setIsCreatingTask(false);
    }

    return (
        <>
            {contextHolder}
            <Modal title={'Add New Task'} 
                open={isAddTask} 
                onCancel={() => dispatch(addTask())} 
                closeIcon={null} centered
                maskClosable={true} footer={null}
                style={{padding: '15px 0px'}}
            >
                <Form 
                    onFinish={onFinish}
                    initialValues={initialValues}
                    layout="vertical" preserve={false}
                    name="create-task" requiredMark={false}
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
                                    <div key={field.key}
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

                                        <CloseIcon onClick={() => remove(field.name)} style={{cursor: 'pointer'}} />
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
                        options={columnsNames} size='large'
                        defaultValue={columnsNames[0].value}
                    />

                    <Form.Item>
                        <Button htmlType="submit" type="primary" style={{
                                ...btnStyles, marginTop: 24,
                                cursor: isCreatingTask ? 'wait' : 'pointer'
                            }}
                        >
                            {isCreatingTask ? 'Creating Task' : 'Create Task'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddTask;