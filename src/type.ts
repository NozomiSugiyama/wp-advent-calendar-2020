export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type TodoUpdate = Pick<Todo, "id"> & Partial<Todo>;
export type TodoCreate = Omit<Todo, "id">;
