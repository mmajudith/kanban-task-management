export type TasksType = {
    description: string
    status: string
    subtasks: [
        {
            isCompleted: boolean
            title: string
        }
    ]
    title: string
    isTask: boolean
    id: string | undefined
}

export type BoardType = {
    id: string
    name: string, 
    columns: {
        name: string,
        tasks: TasksType[]
    }[]
    status?: string
}
 
export type BoardsState = {
    boards: BoardType[]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}