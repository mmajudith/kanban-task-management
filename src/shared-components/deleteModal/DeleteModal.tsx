import { usePathname } from "next/navigation";
import { useBoardNames } from "@/hook/useBoardNames";
import { Button, Modal, Typography } from "antd";
import { btnCon, btnStyles, textStyles } from "./deleteStyles";

type DMProps = {
    isDelete: boolean
    onClick: () => void
}

const DeleteModal = ({ isDelete, onClick}: DMProps) => {
    const pathName = usePathname();
    const boardName = pathName.replace(/[/-]/g, ' ').trim();
    const { boardNames } = useBoardNames();

    // const deleteBoard = async () => {

    // }
    
    return(
        <Modal title={<p className="del-title">Delete this board?</p>}
            open={isDelete}  
            closeIcon={null} centered
            maskClosable={false} footer={null}
        >
            <Typography.Text style={textStyles}>
                Are you sure you want to delete the '{boardNames?.length > 0 && (pathName === '/' ? boardNames[0] : boardName)}' board? 
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