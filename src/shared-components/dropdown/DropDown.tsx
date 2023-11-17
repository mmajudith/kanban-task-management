import { Dropdown } from "antd";
import type { MenuProps } from "antd";

type DDProps = {
    label1: string
    label2: string
    onClick: MenuProps['onClick']
}

const DropDown = ({ label1, label2, onClick }: DDProps) => {
    const items: MenuProps['items'] = [
        {key: '1', label: label1}, 
        {key: '2', label: label2, danger: true}
    ];

    return (
        <Dropdown 
            menu={{items, onClick}} 
            placement="bottomRight" 
            trigger={["click"]} 
            overlayStyle={{width: 192, position: 'fixed', top: 75}}
        >
            <img src='/assets/icon-dots.svg' alt='dotted icon' className="flex-col center" style={{cursor: 'pointer'}}/>
        </Dropdown>
    )
}

export default DropDown;