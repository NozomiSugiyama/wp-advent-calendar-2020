
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
        "/todos/:id": {
            GET: {
                params: {
                    id: number;
                },
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
        "GET",
        "/todos/:id",
        { id: 1 }
    );

    if (result.type === "succeeded") {
        result.data.
    }
}

main();
