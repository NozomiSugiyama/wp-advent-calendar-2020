
import { Todo, TodoUpdate, TodoCreate } from "./type";
import rpc, { Schema } from "./rpc";

const expect = <A>() => <B extends A>(b: B) => b;
const endpoint = "https://jsonplaceholder.typicode.com"

const schema = expect<Schema>()({
    endpoint,
    resource: {
        "/todos": {
            GET: {
                response: {} as Todo[]
            },
            POST: {
                body: {} as TodoCreate,
                response: {} as Todo
            },
        },
        "/todos/:id": {
            GET: {
                params: {} as {
                    id: number;
                },
                response: {} as Todo
            },
            PUT: {
                body: {} as TodoUpdate,
                response: {} as Todo
            },
            DELETE: {
                body: {} as { id: Todo["id"] },
                response: {} as Todo
            },
        },
    },
});

const main = async () => {
    const apiClient = rpc(schema);
    console.log("GET    /todos", await apiClient.call("GET", "/todos"));
    console.log("POST   /todos", await apiClient.call("POST", "/todos", { userId: 12, title: "test", completed: false }));
    console.log("GET    /todos/:id", await apiClient.call("GET", "/todos/:id", { id: 1 }));
    console.log("PUT    /todos/:id", await apiClient.call("PUT", "/todos/:id", { id: 1, title: "test" }));
    console.log("DELETE /todos/:id", await apiClient.call("DELETE", "/todos/:id", { id: 1 }));
}

main();
