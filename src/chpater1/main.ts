
import { Todo } from "./type";
import rpc from "./rpc";

const endpoint = "https://jsonplaceholder.typicode.com"

const main = async () => {
    const apiClient = rpc(endpoint);

    const result = await apiClient.call<Todo>(
        "POST",
        "/todos",
        { userId: 1, title: "aaa", completed: false }
    )

    if (result.type === "succeeded") {
        console.log(result.data)
    } else if (result.type === "failed") {
        console.log(result.data)
    }
}

main();
