'use client';

import { useState } from "react";
import { Modal, Form, Input, Button, Typography, notification } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import CloseIcon from '../../../public/assets/icon-cross.svg';
import { btnStyles, colItem, columnsIput, inputStyles } from "./boardModalStyles";

type BMProps = {
    isBoardModal: boolean
    setIsBoardModal: () => void
}

type NotificationType = 'success' | 'error';

const BoardModal = ({isBoardModal, setIsBoardModal}: BMProps) => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const initialValue = {name: '', columns: [{ name: 'Todo' }, { name: 'Doing'}]}
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);

    const openNotification = (message: string, type: NotificationType) => {
        api[type]({message, placement: 'top'});
    }

    const onFinish = async (values: any) => {
        const newBoard = {...values, columns: values.columns.map((col: {name: string}) => ({...col, tasks: []}))}
        setIsCreatingBoard(true);
        
        const res = await fetch('/api', { 
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            cache: "no-cache",
            body: JSON.stringify(newBoard), 
        });
        const { message } = await res.json();
        if(message === 'Network error!'){
            setIsCreatingBoard(false);
            openNotification(message, 'error');
        }
        openNotification(message, 'success');
        setIsCreatingBoard(false);
    }

    return (
        <>
            {contextHolder}
            <Modal title={'Add New Board'} 
                open={isBoardModal} 
                onCancel={setIsBoardModal} 
                closeIcon={null} centered
                maskClosable={true} footer={null}
                style={{padding: '30px 0px'}}
            >
                <Form onFinish={onFinish}
                    initialValues={initialValue}
                    layout="vertical" preserve={false}
                    name="new-board" requiredMark={false}
                    colon={false} autoComplete='off'
                >
                    <Form.Item label={'Board Name'} name={'name'} 
                        rules={[{pattern: /[a-z]/, message: 'BoardName must contain letters', required: true}]}  
                        style={{marginBottom: 24}}
                    >
                        <Input placeholder="eg Web Design" 
                            className="board-name" size="large" 
                            style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}
                        />
                    </Form.Item>

                    <Typography.Text>BoardColumns</Typography.Text>
                    <Form.List name={'columns'}>
                        {(fields, { add, remove}) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key}
                                        className="flex-row between" 
                                        style={columnsIput}
                                    >
                                        <Form.Item name={[field.name, 'name']} 
                                            style={colItem}
                                            rules={[{pattern: /[a-z]/, message: 'Board columns must contain letters', required: true}]} 
                                        >
                                            <Input size="large" 
                                                style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}
                                            />
                                        </Form.Item>

                                        <CloseIcon onClick={() => remove(field.name)} style={{cursor: 'pointer'}} />
                                    </div>
                                ))}
                                <Button 
                                    onClick={() => add()}
                                    type="primary" 
                                    style={{...btnStyles, backgroundColor: !isDark ? 'rgba(99, 95, 199, 0.10)' : '#FFF', color: '#635FC7'}}
                                >
                                    + Add New Column
                                </Button>
                            </>
                        )}
                    </Form.List>
                
                    <Form.Item>
                        <Button htmlType="submit" type="primary" style={{
                                ...btnStyles, marginTop: 24,
                                cursor: isCreatingBoard ? 'wait' : 'pointer'
                            }}
                        >
                            {isCreatingBoard ? 'Creating new board' : 'Create New Board'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default  BoardModal;