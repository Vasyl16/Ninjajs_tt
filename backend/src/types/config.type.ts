import { ObjectCannedACL } from '@aws-sdk/client-s3';

export type Config = {
  app: AppConfig;
  db: DBConfig;
  aws: AWSConfig;
};

export type AppConfig = {
  host: string;
  port: number;
};

export type DBConfig = {
  uri: string;
};

export type AWSConfig = {
  s3BucketName: string;
  accessKey: string;
  secretKey: string;
  region: string;
  s3ACL: ObjectCannedACL;
  s3Endpoint: string;
};
