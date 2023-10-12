export type BoardType = {
    name: string, 
    columns: []
}

export type TasksType = {
    subtasks: [
        {
            isCompleted: boolean
        }
    ], 
    status: string, 
    description: string, 
    title: string
}