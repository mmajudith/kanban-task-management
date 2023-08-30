import { Button, ConfigProvider } from 'antd';
import theme from '../../themeConfig';

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <main className=''>
        <h1>Main Page</h1>
        <Button type='primary'>Button</Button>
      </main>
    </ConfigProvider>
  )
}
