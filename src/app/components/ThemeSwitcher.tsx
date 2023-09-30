"use Client"

import { Image, Switch } from "antd";

import { toggleTheme } from "@/redux/features/utilitiesReducer";
import { useAppSelector, useAppDispatch } from "@/redux/store/hook";

const switchContainerStyle: React.CSSProperties = {
    width: '85.5%', 
    height: 45, 
    margin: 'auto', 
    gap: 15,
    borderRadius: 6
};

const ThemeSwitcher = () => {
    const { currentTheme } = useAppSelector(state => state.themeSlice);
    const dispatch = useAppDispatch();

    return(
        <div style={{...switchContainerStyle, backgroundColor: !currentTheme? '#F4F7FD' : '#20212C'}}
        className="flex-row center"
    >
        <Image preview={false} src="/assets/icon-light-theme.svg" className="flex-row flex-start"/>
        <Switch 
            style={{backgroundColor: '#635fc7'}}
            checked={currentTheme} 
            onChange={() => dispatch(toggleTheme())}
        />
        <Image preview={false} src="/assets/icon-dark-theme.svg" className="flex-row flex-start"/>
    </div>
    )
}

export default ThemeSwitcher;