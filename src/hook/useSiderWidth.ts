import { Grid } from 'antd';

export const useSiderWidth = () => {
    const { useBreakpoint } = Grid;
    const { xl, md, sm } = useBreakpoint();
    const siderWidth = xl ? 300 : md ? 280 : 0; 

    return [siderWidth, xl, md, sm]  as const;
}