import { Spin, ConfigProvider } from "antd"

const spinContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', 
    margin: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
};

const SpinnerLoader = () => {
    return(
        <ConfigProvider theme={{
            components: {
                Spin:{
                    contentHeight: 500,
                    dotSizeLG: 50
                }
            }
        }}>
            <div style={spinContainerStyle}>
                <Spin size="large"/>
            </div>
        </ConfigProvider>
    )
}

export default SpinnerLoader;