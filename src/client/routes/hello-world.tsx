import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Await, Form, useActionData, useLoaderData } from "@remix-run/react";
import { wireAction, wireLoader } from "nest-remix/core.server";
import { HelloWorldBackend } from "./hello-world.server";
import { Suspense } from "react";

export const loader: LoaderFunction = (args) =>
  wireLoader(HelloWorldBackend, args);

export default function HelloWorld() {
  const data = useLoaderData<HelloWorldBackend["getMessage"]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Suspense fallback={<div>Loading</div>}>
        <Await resolve={Promise.all([data.a, data.b])}>
          {([a, b]) => <div>{a.message + b.message}</div>}
        </Await>
      </Suspense>
    </div>
  );
}
