import { Button, Typography } from "antd";
import { btnStyle, textStyle, utilContainerStyle } from "./utilityStyles";

type NProps = {
    text: string;
    buttonText?: string
}

const Utility = ({text, buttonText}: NProps) => {
    return (
        <div style={utilContainerStyle}>
            <Typography.Text style={textStyle}>{text}</Typography.Text>
            <Button type="primary" style={btnStyle}>{buttonText}</Button>
        </div>
    )
}

export default Utility;