
import { Todo, TodoUpdate, TodoCreate } from "./type";
import rpc from "./rpc";

const endpoint = "https://jsonplaceholder.typicode.com"

type Schema = {
    resource: {
        "/todos": {
            GET: {
                response: Todo[]
            },
            POST: {
                body: TodoCreate,
                response: Todo
            },
        },
        "/todos/1": {
            GET: {
                response: Todo
            },
            PUT: {
                body: TodoUpdate,
                response: Todo
            },
            DELETE: {
                body: { id: Todo["id"] },
                response: Todo
            },
        },
    },
};

const main = async () => {
    const apiClient = rpc<Schema>(endpoint);

    const result = await apiClient.call(
        "POST",
        "/todos",
        { userId: 1, title: "test", completed: false }
    )

    if (result.type === "succeeded") {
        console.log(result.data)
    } else if (result.type === "failed") {
        console.log(result.data)
    }
}

main();
