import { Space, Button, Dropdown, Image} from 'antd';
import type { MenuProps } from "antd";
import { useAppDispatch } from '@/redux/store/hook';
import { deleteBoard, editBoard } from '@/redux/features/utilitiesReducer';
import { TasksType } from '@/types/types';
import AddIcon from '../../../../public/assets/icon-add-task-mobile.svg';
import { addTaskStyle } from './addEditDelStyles';

type AddTaskProps = {
    boardColumn: { name: string; tasks: TasksType[]; }[][] | undefined,
    boardNames: string[],
    md: Boolean | undefined,
    sm: Boolean | undefined
}

const  AddEditDelBoardTask = ({boardColumn, boardNames, md, sm}: AddTaskProps) => {
    const dispatch = useAppDispatch();
    const items: MenuProps['items'] = [
        {key: '1', label: 'Edit Board'}, 
        {key: '2', label: 'Delete Board', danger: true}
    ];
    
    const onClick: MenuProps['onClick'] = ({key}) => {
        if(key === '1') dispatch(editBoard());
        if(key === '2') dispatch(deleteBoard());
    }
    
    return (
        <Space size={sm ? 20:10}>
            <Button 
                type="primary" 
                disabled={Array.isArray(boardColumn) && boardColumn[0].length > 0 ? false : true}
                style={{
                    ...addTaskStyle,  
                    width: md? 164:45, 
                    height:md? 48:32, 
                    backgroundColor: Array.isArray(boardColumn) && boardColumn[0].length > 0 ? '#635FC7' : '#d8d7f1',
                    cursor: Array.isArray(boardColumn) && boardColumn[0].length > 0 ? 'pointer' : 'auto',
                }}
                className={`${Array.isArray(boardColumn) && boardColumn[0].length > 0 && `btn-hover`} flex-row center`}
            >
                {md ? ('+ Add New Task') : ( <AddIcon />)}
            </Button>
                
            {boardNames?.length > 0 && (
                <Dropdown 
                    menu={{items, onClick}} 
                    placement="bottomRight" 
                    trigger={["click"]} 
                    overlayStyle={{width: 192, position: 'fixed', top: 75}}
                >
                    <img src='/assets/icon-dots.svg' alt='dotted icon' className="flex-col center" style={{cursor: 'pointer'}}/>
                </Dropdown>
            )}
        </Space>
    )
}

export default AddEditDelBoardTask;