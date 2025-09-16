import { randomUUID } from 'crypto';
import path from 'path';

import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import { config } from '../configs/config';
import { FileItemTypeEnum } from '../enums/file-item-type.enum';
import { InternalServerError } from '../errors/errors';
import { CreateSuperheroImageDto } from '../interface/image.interface';

const awsConfig = config.aws;

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: awsConfig.accessKey,
    secretAccessKey: awsConfig.secretKey,
  },
});

const buildPath = (
  itemType: FileItemTypeEnum,
  fileName: string,
  itemSupehero: string
) => {
  return `${itemType}/${itemSupehero}/${randomUUID()}${path.extname(fileName)}`;
};

export const uploadSeperheroFiles = async (
  fileName: string,
  file: UploadedFile,
  superheroId: string,
  itemType: FileItemTypeEnum
): Promise<CreateSuperheroImageDto> => {
  try {
    const filePath = buildPath(itemType, fileName, superheroId);

    await client.send(
      new PutObjectCommand({
        Bucket: awsConfig.s3BucketName,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: awsConfig.s3ACL,
      })
    );

    return { title: fileName, path: filePath };
  } catch (error) {
    throw new InternalServerError('Can not upload file');
  }
};

export const deleteSuperheroFile = async (filePath: string) => {
  try {
    const res = await client.send(
      new DeleteObjectCommand({
        Bucket: awsConfig.s3BucketName,
        Key: filePath,
      })
    );
  } catch (error) {
    throw new InternalServerError('Can not delete file');
  }
};

export const deleteSuperheroFolder = async (
  itemType: FileItemTypeEnum,
  folderName: string
) => {
  const folderPath = `${itemType}/${folderName}/`;

  try {
    let continuationToken: string | undefined;
    let totalDeleted = 0;

    do {
      const listCommand = new ListObjectsV2Command({
        Bucket: awsConfig.s3BucketName,
        Prefix: folderPath,
        ContinuationToken: continuationToken,
      });

      const listResult = await client.send(listCommand);

      if (!listResult.Contents || listResult.Contents.length === 0) {
        return;
      }

      const deleteCommand = new DeleteObjectsCommand({
        Bucket: awsConfig.s3BucketName,
        Delete: {
          Objects: listResult.Contents.map((object) => ({ Key: object.Key! })),
          Quiet: false, // Return errors for individual deletions
        },
      });

      const deleteResult = await client.send(deleteCommand);
      totalDeleted += deleteResult.Deleted?.length || 0;

      // Log any deletion errors
      if (deleteResult.Errors && deleteResult.Errors.length > 0) {
        console.error('Errors during deletion:', deleteResult.Errors);
      }

      continuationToken = listResult.NextContinuationToken;
    } while (continuationToken);
  } catch (error) {
    throw new InternalServerError(`Cannot delete folder: ${folderPath}`);
  }
};
