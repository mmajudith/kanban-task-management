'use client';

import { Button, Modal, Typography } from "antd";
import { btnCon, btnStyles, textStyles } from "./deleteStyles";

type DMProps = {
    isDeleting: boolean
    isDelete: boolean
    contextHolder:  unknown
    name: string
    onClick: () => void
    onDelete: () => void
}

const DeleteModal = ({ isDeleting, isDelete, contextHolder, name, onClick, onDelete}: DMProps) => {
    
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
                        style={{...btnStyles, cursor: isDeleting ? 'wait' : 'pointer'}} 
                        className="btn-del"
                    >
                        {isDeleting ? 'Deleting' : 'Delete'}
                    </Button>
                    <Button 
                        onClick={onClick} 
                        style={{...btnStyles, cursor: isDeleting ? 'default' : 'pointer'}}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal;