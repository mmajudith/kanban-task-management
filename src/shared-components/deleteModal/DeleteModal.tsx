'use client';

import { Button, Modal, Typography, Grid } from "antd";
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
    const { useBreakpoint } = Grid;
    const { md } = useBreakpoint();

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
                
                <div className={`${!md ? `flex-col center` : `flex-row between`}`} style={btnCon}>
                    <Button type="primary"
                        onClick={onDelete} 
                        style={{...btnStyles,
                            width: !md ? `100%` : `50%`, 
                            cursor: isDeleting ? 'wait' : 'pointer'
                        }} 
                        className="btn-del"
                    >
                        {isDeleting ? 'Deleting' : 'Delete'}
                    </Button>
                    <Button 
                        onClick={onClick} 
                        style={{...btnStyles,
                            width: !md ? `100%` : `50%`, 
                            cursor: isDeleting ? 'default' : 'pointer'
                        }}
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