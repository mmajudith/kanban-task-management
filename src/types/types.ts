export type TasksType = {
    description: string
    status: string
    subtasks: [
        {
            isCompleted: boolean
        }
    ]
    title: string
    isTask: boolean
}

export type BoardType = {
    id: string
    name: string, 
    columns: {
        name: string,
        tasks: TasksType[]
    }[]
}
 
export type BoardsState = {
    boards: BoardType[]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

export type BoardState = {
    board: BoardType[]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}