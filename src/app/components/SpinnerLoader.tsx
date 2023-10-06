import { Spin, ConfigProvider } from "antd"

const spinContainerStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh', 
    margin: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F4F7FD'
};

const SpinnerLoader = () => {
    return(
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#635fc7'
            },
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