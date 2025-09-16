import path from 'node:path';

import dotenv from 'dotenv';

import { Config } from '../types/config.type';
import { ObjectCannedACL } from '@aws-sdk/client-s3';

const env = process.env.NODE_ENV || 'dev';

const envPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({
  path: envPath,
});

export const config: Config = {
  app: {
    port: parseInt(process.env.APP_PORT as string),
    host: process.env.APP_HOST as string,
  },

  db: {
    uri: process.env.DB_URI as string,
  },

  aws: {
    accessKey: process.env.AWS_ACCESS_KEY as string,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY as string,

    region: process.env.AWS_REGION as string,
    s3BucketName: process.env.AWS_S3_BUTCKET_NAME as string,
    s3Endpoint: process.env.AWS_S3_ENDPOINT as string,
    s3ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
  },
};
