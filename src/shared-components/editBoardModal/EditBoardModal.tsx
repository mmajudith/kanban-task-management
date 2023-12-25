'use client';

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { postDeletePut } from "@/app/clientApi/postDeletePut";
import { Modal, Form, Input, Button, Typography, notification } from "antd";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";
import { editBoard, savedBoard } from "@/redux/features/utilitiesReducer";
import CloseIcon from '../../../public/assets/icon-cross.svg';
import { btnStyles, colItem, columnsIput, inputStyles } from "../createNewBoardModal/boardModalStyles";
import { BoardType } from "@/types/types";

type EBMProps = {
    board:BoardType[]
}

const EditBoardModal = ({ board }: EBMProps) => {
    const router = useRouter();
    const pathName = usePathname();
    const [isSavingBoard, setIsSavingBoard] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const initialValues =  {name: board[0]?.name, columns: board[0]?.columns.map((column) => column)};
    
    const dispatch = useAppDispatch();
    const { currentTheme, isEditBoard } = useAppSelector(state => state.modalSlice);
    const { isDark } = currentTheme;

    const onFinish = async (values: any) => {
        const editedBoard = { ...values, id: board[0]?.id, columns: values.columns.map((column: {name: string, tasks: []}) =>{
                return !column.tasks ? ({...column, tasks: []}) : column
            })}
    
        const replaceSpace = editedBoard.name.replaceAll(' ', '-');
        setIsSavingBoard(true);
        
        const { message } = await postDeletePut('PUT', editedBoard);
        if(message === 'Network error!'){
            setIsSavingBoard(false);
            api['error']({message, placement: 'top'});
        }
        api['success']({message: 'Changes successfully made.', placement: 'top'});
        setIsSavingBoard(false);

        window.setTimeout(() => {
            dispatch(editBoard());
            if(pathName === `/`){
                return router.push(`/`);
            }
            dispatch(savedBoard())
            router.push(`/${replaceSpace}`);
        }, 3000);
    }

    return (
        <>
            {contextHolder}
            <Modal title={'Edit Board'} 
                open={isEditBoard} 
                onCancel={() => dispatch(editBoard())} 
                closeIcon={null} centered
                maskClosable={true} footer={null}
                style={{padding: '30px 0px'}}
            >
                <Form onFinish={onFinish}
                    initialValues={initialValues}
                    layout="vertical" preserve={false}
                    name="edit-board" requiredMark={false}
                    colon={false} autoComplete='off'
                >
                    <Form.Item label={'Board Name'} name={'name'}
                        rules={[{pattern: /[a-z]/, message: 'BoardName must contain letters', required: true}]}  
                        style={{marginBottom: 24}}
                    >
                        <Input 
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
                                cursor: isSavingBoard ? 'wait' : 'pointer'
                            }}
                        >
                            {isSavingBoard ? 'Saving Changes' : 'Save Changes'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default  EditBoardModal;