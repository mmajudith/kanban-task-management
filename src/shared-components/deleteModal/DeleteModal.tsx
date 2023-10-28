import { Button, Modal, Typography } from "antd";
import { btnCon, btnStyles, textStyles } from "./deleteStyles";

type DMProps = {
    isDelete: boolean
    onClick: () => void
}

const DeleteModal = ({ isDelete, onClick}: DMProps) => {
    return(
        <Modal title={<p className="del-title">Delete this board?</p>}
            open={isDelete}  
            closeIcon={null} centered
            maskClosable={false} footer={null}
        >
            <Typography.Text style={textStyles}>
                Are you sure you want to delete the ‘Platform Launch’ board? 
                This action will remove all columns and tasks and cannot be reversed.
            </Typography.Text>
            
            <div className="flex-row between" style={btnCon}>
                <Button type="primary" style={btnStyles} className="btn-del">
                    Delete
                </Button>
                <Button onClick={onClick} style={btnStyles}>
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteModal;