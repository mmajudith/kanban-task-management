export type BoardType = {
    name: string, 
    columns: []
}

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

export type BoardsState = {
    boards: [
        {
            name: string, 
            columns: []
        }
    ]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}