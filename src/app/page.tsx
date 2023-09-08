import { Button, ConfigProvider } from 'antd';
import theme from '../../themeConfig';
import { getBoards } from './clientApis/apis';

export default async function Home() {
  const boards = await getBoards()
  const { message, status } = boards;
  const board = JSON.parse(message)
			
  return (
    <ConfigProvider theme={theme}>
      <main className=''>
        <h1>Main Page</h1>
        <Button type='primary'>Button</Button>
            {status === 'empty' ? (
                <p>Board is empty</p>
            ) : (
                <p>{board[0].name}</p>
            )}
        <Button type='primary'>Click to dance</Button>
      </main>
    </ConfigProvider>
  )
}
