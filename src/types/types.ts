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
    id: string 
    colIndex?: number, 
    taskIndex?: number,
}

export type DeleteTaskType = {
    id: string, 
    colIndex: number | undefined, 
    taskIndex: number | undefined,
    status?: string
}

export type BoardType = {
    id: string
    name: string, 
    columns: {
        name: string,
        tasks: TasksType[]
    }[]
    status?: string
    colIndex?: number, 
    taskIndex?: number,
}

export type ColumnType = { 
    name: string,
    tasks: TasksType[]
}[]
 
export type BoardsState = {
    boards: BoardType[]
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}