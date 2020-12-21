import fetch from "node-fetch";

type Method = "POST" | "GET" | "PUT" | "DELETE"
type Path = string;

const succeed = <A>(a: A) => ({
    type: "succeeded" as const,
    data: a,
});

const fail = <A>(a: A) => ({
    type: "failed" as const,
    data: a,
});

export default (endpoint: string) => ({
    call: async <Response>(method: Method, path: Path, body?: unknown) => {
        const data = await fetch(endpoint + path, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        });
        if (data.status === 404) {
            return fail({
                type: "not-found",
                data: "Not Found",
            });
        }
        try {
            return succeed(await data.json() as Response);
        } catch (e) {
            return fail({
                type: "parse-error" as const,
                data: e,
            });
        }
    }
});
