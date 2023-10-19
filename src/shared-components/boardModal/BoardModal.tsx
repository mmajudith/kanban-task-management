'use client';

import { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useAppSelector } from "@/redux/store/hook";
import CloseIcon from '../../../public/assets/icon-cross.svg';
import { btnStyles, colWrapper, inputStyles } from "./boardModalStyles";

type BMProps = {
    isBoardModal: boolean
    setIsBoardModal: () => void
}

const BoardModal = ({isBoardModal, setIsBoardModal}: BMProps) => {
    const [boardCol, setBoardCol] = useState<string[] | []>(['Todo', 'Doing', 'Done']);
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);

    //Function that removed a single board column
    const removeBoardCol = (boardCol: string[] | [], index: number) => {
        const filteredBoardCol = boardCol.filter((item, i) => i !== index);
        setBoardCol(filteredBoardCol);
    }

    //Function that add a single board column if it does exit
    const addBoardCol = (boardCol: string[] | []) => {
        const columns = ['Todo', 'Doing', 'Done'];

        for(let i = 0; i <= columns.length; i++){
            if(columns[i] !== boardCol[i]){
                setBoardCol((prev) => [...prev, columns[i]]);
                break;
            }
        }
    }
    
    //Removed the last board columns element on mount
    useEffect(() => {
        const sliceBoardCol = boardCol.slice(0, -1);
        setBoardCol(sliceBoardCol);
    }, []);

    return (
        <Modal title={'Add New Board'} 
            open={isBoardModal} 
            onCancel={setIsBoardModal} 
            closeIcon={null} footer={null} centered
            maskClosable={true}
        >
            <Form layout="vertical" name="new-board" labelCol={{span: 24}} wrapperCol={{span: 24}} colon={false}>

                <Form.Item label={'Board Name'}>
                    <Input placeholder="eg Web Design" className="board-name" size="large" style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}/>
                </Form.Item>

                <Form.Item label={'Board Columns'}> 
                    <div
                        className="flex-col center" 
                        style={colWrapper}
                    >
                        {boardCol.length > 0 && boardCol.map((item, index) => (
                            <div key={index} 
                                className="flex-row between" 
                                style={colWrapper}
                            >
                                <Input placeholder={item} size="large" readOnly
                                    className={`${!isDark ? `board-cols-light`:`board-cols-dark`}`}
                                    style={{...inputStyles, backgroundColor: !isDark ? '#FFF' : '#2B2C37'}}
                                />
                                <CloseIcon
                                    onClick={() => removeBoardCol(boardCol, index)} style={{cursor: 'pointer'}} 
                                />
                            </div>
                        ))}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button 
                        disabled={boardCol.length === 3 ? true : false}
                        onClick={() => addBoardCol(boardCol)}
                        type="primary" 
                        style={{...btnStyles, 
                            cursor: boardCol.length === 3 ? 'default' : 'pointer',
                            backgroundColor: !isDark ? 'rgba(99, 95, 199, 0.10)' : '#FFF', color: '#635FC7'
                        }}
                    >
                        {boardCol.length === 3 ? 'Columns completed' : '+ Add New Column'}
                    </Button>
                    <Button type="primary" style={{...btnStyles, marginTop: 12}}>Create New Board</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default  BoardModal;