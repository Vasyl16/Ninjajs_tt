/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';

import { config } from './configs/config';
import superheroRouter from './router/superheroRouter';
import { AppError, ValidationError } from './errors/errors';

const appConfig = config.app;

const dbConfig = config.db;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());

app.use('/superhero', superheroRouter);

app.use(
  (
    err: AppError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(err);

    if (err instanceof ValidationError) {
      res.status(err.status || 500).json({
        message: err.message,
        fields: err.fields,
      });
      return;
    }

    console.log(err);

    res.status(err?.status || 500).json({
      message: err.message,
    });
  }
);

app.listen(appConfig.port, async () => {
  await mongoose.connect(dbConfig.uri);

  console.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
});
