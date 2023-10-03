"use Client"

import { Image, Switch } from "antd";

import { toggleTheme } from "@/redux/actions/themeAction";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";

const switchContainerStyle: React.CSSProperties = {
    width: '85.5%', 
    height: 45, 
    margin: 'auto', 
    gap: 15,
    borderRadius: 6
};

const ThemeSwitcher = () => {
    const { isDark } = useAppSelector(state => state.themeSlice.currentTheme);
    const dispatch = useAppDispatch();

    return(
        <div style={{...switchContainerStyle, backgroundColor: !isDark? '#F4F7FD' : '#20212C'}}
        className="flex-row center"
    >
        <Image preview={false} src="/assets/icon-light-theme.svg" className="flex-row flex-start"/>
        <Switch 
            className="switch"
            checked={isDark} 
            onChange={() => dispatch(toggleTheme())}
        />
        <Image preview={false} src="/assets/icon-dark-theme.svg" className="flex-row flex-start"/>
    </div>
    )
}

export default ThemeSwitcher;