import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { http } from '@google-cloud/functions-framework';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

if (process.env.NODE_ENV === 'development') {
  NestFactory.create(AppModule).then((app) => app.listen(3000));
} else {
  const server = express();
  NestFactory.create(AppModule, new ExpressAdapter(server)).then((app) =>
    app.init(),
  );
  http('nest', server);
}
