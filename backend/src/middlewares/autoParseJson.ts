import { NextFunction, Request, Response } from 'express';

export const autoParseJson = (fields: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fields.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (error) {
          throw Error(`Can not parse ${field}`);
        }
      }
    });
    next();
  };
};
