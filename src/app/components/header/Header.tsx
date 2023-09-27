"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store/hook";
import type { MenuProps } from "antd";
import { Layout, Image, Typography, Grid, Button, Dropdown, Space} from "antd";
import { headerStyle, logoStyle, headerTitleStyle, addTaskStyle } from "./headerStyles";

const { Header } = Layout;

const items: MenuProps['items'] = [{key: '1', label: 'Edit Board'}, {key: '2', label: 'Delete Board', danger: true}]

const HeaderNav = () => {
    const pathName = usePathname();
    const removedDash = pathName.replaceAll('/-', ' ');
    const { currentTheme } = useAppSelector(state => state.themeSlice);
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData?.boards?.map((board: {name: string}) => board.name);

    const { Text } = Typography;
    const { useBreakpoint } = Grid;
    const { xl, md } = useBreakpoint();
    const logoWidth = xl ? 300 : md ? 280 : 'content-fit';

    return (
        <Header style={headerStyle} className="flex-row between">
            <div 
                style={{...logoStyle, width: logoWidth, borderRightColor: !currentTheme ? '#E4EBFA' : '#3E3F4E'}} 
                className="flex-row flex-start"
            >
                <Image preview={false} 
                    src={`${!currentTheme ? `/assets/logo-dark.svg`:`/assets/logo-light.svg`}`} 
                    alt="site logo"
                />
            </div>
            <div style={{width: `calc(100% - ${logoWidth}px)`, height: '100%', margin: 'auto 23px' }} className="flex-row between">
                <Text style={headerTitleStyle}>
                    {boardNames?.length > 0 && (pathName === '/' ? boardNames[0] : pathName.replace(/[/-]/g, ' '))}
                </Text>
                <div>
                    <Space size={20}>
                        <Button type="primary" style={addTaskStyle}>+ Add New Task</Button>
                        <Dropdown menu={{items}} placement="bottomRight" trigger={["click"]} overlayStyle={{width: 192}}>
                            <Image preview={false} 
                                src={`/assets/icon-dots.svg`} 
                                alt="site logo"
                                onClick={(e) => e.preventDefault()}
                                style={{cursor: 'pointer'}}
                            />
                        </Dropdown>
                    </Space>
                </div>
            </div>
        </Header>
    )
}

export default HeaderNav