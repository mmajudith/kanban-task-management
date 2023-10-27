import { Space, Button, Dropdown} from 'antd';
import type { MenuProps } from "antd";
import DotsIcon from '../../../../public/assets/icon-dots.svg';
import AddIcon from '../../../../public/assets/icon-add-task-mobile.svg';
import { addTaskStyle } from './addEditDelStyles';

type AddTaskProps = {
    boardColumn: [][] | undefined,
    md: Boolean | undefined,
    sm: Boolean | undefined
}

const items: MenuProps['items'] = [{key: '1', label: 'Edit Board'}, {key: '2', label: 'Delete Board', danger: true}]

const  AddEditDelBoardTask = ({boardColumn, md, sm}: AddTaskProps) => {
    
    return (
        <Space size={sm ? 20:10}>
            <Button 
                type="primary" 
                disabled={boardColumn?.length ? false : true}
                style={{
                    ...addTaskStyle,  
                    width: md? 164:45, 
                    height:md? 48:32, 
                    backgroundColor: boardColumn?.length ? '#635FC7' : '#d8d7f1',
                    cursor: boardColumn?.length ? 'pointer' : 'auto',
                }}
                className={`${boardColumn?.length && `btn-hover`} flex-row center`}
            >
                {md ? ('+ Add New Task') : ( <AddIcon />)}
            </Button>
                
            <Dropdown 
                menu={{items}} 
                placement="bottomRight" 
                trigger={["click"]} 
                overlayStyle={{width: 192, position: 'fixed', top: 75}}
            >
                <DotsIcon style={{cursor: 'pointer'}} className="flex-col center"/>
            </Dropdown>
        </Space>
    )
}

export default AddEditDelBoardTask;