'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Button, Typography, notification } from "antd";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { boardModal } from "@/redux/features/utilitiesReducer";
import { postDeletePut } from "@/app/clientApi/postDeletePut";
import CloseIcon from '../../../public/assets/icon-cross.svg';
import { btnStyles, colItem, columnsIput, inputStyles } from "./boardModalStyles";

const BoardModal = () => {
    const router = useRouter();
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const initialValue = {name: '', columns: [{ name: 'Todo' }, { name: 'Doing'}]}
    const { currentTheme, isBoardModal } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;
    const { boards } = useAppSelector(state => state.boardsSlice);
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const newBoard = {...values, id: values.name, columns: values.columns.map((col: {name: string}) => ({...col, tasks: []}))}
        const replaceSpace = newBoard.name.replaceAll(' ', '-');
        setIsCreatingBoard(true);
      
        const { message } = await postDeletePut('POST', newBoard);
        if(message === 'Network error!'){
            setIsCreatingBoard(false);
            api['error']({message, placement: 'top'});
        }
        api['success']({message: `${newBoard.name} board successfully created.`, placement: 'top'});
        setIsCreatingBoard(false);

        window.setTimeout(() => {
            dispatch(boardModal());
            if(Array.isArray(boards) && !boards.length){
                return router.push(`/`);
            }
            router.push(`/${replaceSpace}`);
        }, 3000);
    }

    return (
        <>
            {contextHolder}
            <Modal title={'Add New Board'} 
                open={isBoardModal} 
                onCancel={() => dispatch(boardModal())} 
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
                                    <div key={index}
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

                                        <CloseIcon onClick={() => remove(index)} style={{cursor: 'pointer'}} />
                                    </div>
                                ))}
                                <Button 
                                    onClick={() => add()}
                                    style={{...btnStyles}}
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