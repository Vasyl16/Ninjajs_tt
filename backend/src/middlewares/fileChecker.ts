import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { BadRequestError, ErrorField, ValidationError } from '../errors/errors';

const processFile = (
  file: UploadedFile,
  fieldName: string,
  errors: ErrorField[],
  maxSizeMB: number
) => {
  if (!file.mimetype.startsWith('image/')) {
    errors.push({
      name: file.name,
      message: 'File is not an image',
    });
    return;
  }

  // Check file size (convert MB to bytes)
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    errors.push({
      name: file.name,
      message: `File is too large (max ${maxSizeMB}MB)`,
    });
    return;
  }
};

export const multiImageMiddleware = (
  isRequired: boolean = false,
  maxFiles: number = 5,
  maxSizeMB: number = 5
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isRequired && !req.files) {
        throw new BadRequestError('At least one file is required');
      } else if (!req.files || Object.keys(req.files).length === 0) {
        next();
        return;
      }

      if (Object.keys(req.files).length > maxFiles) {
        next(new BadRequestError('Too much files(maximum 5)'));
        return;
      }

      const files = req.files;
      const errors: ErrorField[] = [];

      // Convert files object to array and validate each file
      Object.keys(files).forEach((key) => {
        const file = files[key] as UploadedFile;

        // Handle single file or array of files
        processFile(file, key, errors, maxSizeMB);
      });

      if (errors.length) {
        next(new ValidationError('Bad files request', errors));
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
