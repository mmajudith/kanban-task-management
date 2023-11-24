'use client';

import { Button, Modal, Typography } from "antd";
import { btnCon, btnStyles, textStyles } from "./deleteStyles";

type DMProps = {
    name: string
    isDeleting: boolean
    isDelete: boolean
    contextHolder?:  unknown
    description: string
    onClick: () => void
    onDelete: () => void
}

const DeleteModal = ({ name, isDeleting, isDelete, contextHolder, description, onClick, onDelete}: DMProps) => {
    
    return(
        <>
            {contextHolder}
            <Modal title={<p className="del-title">Delete this {name}?</p>}
                open={isDelete}  
                closeIcon={null} centered
                maskClosable={false} footer={null}
            >
                <Typography.Text style={textStyles}>
                    {description}
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