import { Body, Injectable, ParseIntPipe, Query } from "@nestjs/common";
import { defer, LoaderArgs, TypedDeferredData } from "@remix-run/node";
import { Action, Loader, RemixArgs } from "nest-remix/core.server";
import { AppService } from "./app.service";

@Injectable()
export class HelloWorldBackend {
  constructor(private readonly appService: AppService) {
  }

  @Loader()
  getMessage(
    @Query("defaultMessage") defaultMessage: string,
    @Query("counter", ParseIntPipe) _counter: number,
    @RemixArgs() _remixArgs: LoaderArgs
  ): TypedDeferredData<{ a: Promise<{ message: string }>, b: Promise<{ message: string}> }> {
    return defer({
      a: new Promise(r => setTimeout(() => {
        console.log("resolved");
        r({ message: "Hello World" });
      }, 4000)),
      b: new Promise(r => setTimeout(() => {
        console.log("resolved");
        r({ message: "Hello World" });
      }, 2000))
    });
  }

  @Action()
  async setMessageFallback(@Body() body: { message: string }) {
    return { newMessage: body.message + " [POST, DELETE]" };
  }

  @Action.Put()
  async setMessage(@Body() body: { message: string }) {
    return { newMessage: body.message + " [PUT]" };
  }
}
