import { Button, ConfigProvider } from 'antd';
import theme from '../../themeConfig';
import { getBoards } from './frontendApis/apis';

export default async function Home() {

  // const boards = await getBoards();
  // const firstBoard = boards[0]
  // console.log(firstBoard)
  
			
  return (
    <ConfigProvider theme={theme}>
      <main className=''>
        <h1>Main Page</h1>
        <Button type='primary'>Button</Button>
      </main>
    </ConfigProvider>
  )
}
