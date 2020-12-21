import fetch from "node-fetch";

type GrandChildren<A extends {}> = { [I in keyof A]: keyof A[I] }[keyof A];

type Owns<A extends {}, S extends string | symbol | number> = {
    [I in keyof A]: S extends keyof A[I] ? I : never;
}[keyof A];

type Get<A, K> = K extends keyof A ? A[K] : undefined;

type ExcludeUndefined<X> = X extends [undefined] ? []
                         : X extends [infer A]   ? [A]
                         :                         []

const succeed = <A>(a: A) => ({
    type: "succeeded" as const,
    data: a,
});

const fail = <A>(a: A) => ({
    type: "failed" as const,
    data: a,
});

export default <A extends Schema>(endpoint: string) => ({
    call: async <
        Method extends GrandChildren<A["resource"]>,
        Path extends Owns<A["resource"], Method>,
        Body extends Get<A["resource"][Path][Method], "body">
    >(
        method: Method,
        path: Path,
        ...body: ExcludeUndefined<[Body]>
    ) => {
        const data = await fetch(endpoint + path, {
            method: method as string,
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
            return succeed(await data.json() as A["resource"][Path][Method]["response"]);
        } catch (e) {
            return fail({
                type: "parse-error" as const,
                data: e,
            });
        }
    }
});

export type Schema = {
    resource: {
        [path: string]: {
            [method: string]: {
                body?: {};
                response: unknown;
            };
        };
    };
};
