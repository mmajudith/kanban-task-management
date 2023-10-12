import { useAppSelector } from "@/redux/store/hook";
import { useSiderWidth } from "@/hook/useSiderWidth";
import { Button, Typography } from "antd";
import { btnStyle, textStyle, utilContainerStyle } from "./utilityStyles";

type NProps = {
    text: string;
    buttonText?: string
}

const Utility = ({text, buttonText}: NProps) => {
    const { isCollapse } = useAppSelector(state => state.themeSlice);
    const [siderWidth ] = useSiderWidth();   

    return (
        <div style={{
                ...utilContainerStyle, 
                padding: `0px 0px 0px ${isCollapse ? 0 : siderWidth}px`
            }}
        >
            <Typography.Text style={textStyle}>{text}</Typography.Text>
            <Button type="primary" style={btnStyle}>{buttonText}</Button>
        </div>
    )
}

export default Utility;