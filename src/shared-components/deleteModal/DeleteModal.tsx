'use client';

import { Button, Modal, Typography } from "antd";
import { btnCon, btnStyles, textStyles } from "./deleteStyles";

type DMProps = {
    isDelete: boolean
    contextHolder:  unknown
    name: string
    onClick: () => void
    onDelete: () => void
}

const DeleteModal = ({ isDelete, contextHolder, name, onClick, onDelete}: DMProps) => {
    
    return(
        <>
            {contextHolder}
            <Modal title={<p className="del-title">Delete this board?</p>}
                open={isDelete}  
                closeIcon={null} centered
                maskClosable={false} footer={null}
            >
                <Typography.Text style={textStyles}>
                    Are you sure you want to delete the '{name}' board? 
                    This action will remove all columns and tasks and cannot be reversed.
                </Typography.Text>
                
                <div className="flex-row between" style={btnCon}>
                    <Button type="primary"
                        onClick={onDelete} 
                        style={btnStyles} 
                        className="btn-del"
                    >
                        Delete
                    </Button>
                    <Button onClick={onClick} style={btnStyles}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal;