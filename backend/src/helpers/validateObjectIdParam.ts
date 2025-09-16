import { param } from 'express-validator';
import mongoose from 'mongoose';

export const validateObjectIdParam = (paramName: string) => {
  return param(paramName)
    .isMongoId()
    .withMessage(`${paramName} must be a valid MongoDB ObjectId`)
    .bail()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(`${paramName} is not a valid ObjectId`);
      }
      return true;
    });
};
