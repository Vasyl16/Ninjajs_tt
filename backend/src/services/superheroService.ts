import fileUpload, { UploadedFile } from 'express-fileupload';
import {
  BadRequestError,
  ConflictError,
  PayloadTooLarge,
} from '../errors/errors';
import {
  CreateSuperheroObj,
  CreateSuperheroDto,
  ISuperHero,
  ISuperheroListQuery,
  ISuperheroListResponse,
  UpdateSuperheroDto,
} from '../interface/superhero.interface';
import * as superheroRepo from '../repo/superheroRepo';
import * as superpowerService from '../services/superpowerService';
import * as superheroImageService from '../services/superheroImageService';
import { FileItemTypeEnum } from '../enums/file-item-type.enum';
import { createSuperheroImage } from '../repo/superheroImageRepo';
import {
  CreateSuperheroImageDto,
  ISuperheroImage,
} from '../interface/image.interface';
import {
  CreateSuperpowerDto,
  ISuperpower,
} from '../interface/superpower.interface';
import {
  deleteSuperheroFile,
  deleteSuperheroFolder,
  uploadSeperheroFiles,
} from './s3';
import { superheroPresenter } from '../presenters/superheroPresenter';
import * as superpowerRepo from '../repo/superpowerRepo';

export const createSuperhero = async (
  dto: CreateSuperheroDto,
  superheroImages: fileUpload.FileArray | undefined
): Promise<ISuperHero> => {
  const { superpowers, nickname } = dto;

  const isSuperheroExist = await superheroRepo.findSuperheroByParams({
    nickname,
  });

  if (isSuperheroExist) {
    throw new ConflictError(
      'The superhero with specified nickname already exist'
    );
  }

  const superpowerCreationPromises = superpowers.map((superpower) =>
    superpowerRepo.createSuperpower(superpower)
  );

  const createdSuperpowers: ISuperpower[] = await Promise.all(
    superpowerCreationPromises
  );

  const superPowersIds = createdSuperpowers.map((sp) => sp._id);

  const createSuperheroObj: CreateSuperheroObj = {
    ...dto,
    superpowers: superPowersIds,
  };

  const superhero = await superheroRepo.createSuperhero(createSuperheroObj);

  if (superheroImages) {
    const superheroImagesCreationAWSPromises = Object.keys(superheroImages).map(
      (fileName) => {
        const file = superheroImages[fileName] as UploadedFile;

        return uploadSeperheroFiles(
          file.name,
          file,
          superhero._id,
          FileItemTypeEnum.SUPERHERO
        );
      }
    );

    const createdSuperheroAWSImages: CreateSuperheroImageDto[] =
      await Promise.all(superheroImagesCreationAWSPromises);

    const superheroImagesCreationDbPromises = createdSuperheroAWSImages.map(
      (superheroImageData) => createSuperheroImage(superheroImageData)
    );

    const createdSuperheroDbImages: ISuperheroImage[] = await Promise.all(
      superheroImagesCreationDbPromises
    );

    const superheroImagesIds = createdSuperheroDbImages.map((img) => img._id);

    createSuperheroObj.images = superheroImagesIds;

    await superheroRepo.createSuperheroImages(
      superhero._id,
      superheroImagesIds
    );
  }

  return superheroPresenter.toPublicResponse(superhero);
};

export const createAndAddSuperPower = async (
  id: string,
  dto: CreateSuperpowerDto
): Promise<ISuperpower> => {
  const isSuperheroExist = await superheroRepo.findSuperheroById(id);

  if (!isSuperheroExist) {
    throw new BadRequestError('Superhero id not found');
  }

  const isSuperpowerExist = isSuperheroExist.superpowers.some(({ name }) => {
    name.toLowerCase() === dto.name.toLowerCase();
  });

  if (isSuperpowerExist) {
    throw new ConflictError('Super hero already have this superpower');
  }

  const superpower = await superpowerRepo.createSuperpower(dto);

  const superhero = (await superheroRepo.createSuperPower(
    id,
    superpower._id
  )) as ISuperHero;

  return superpower;
};

export const createAndAddSuperheroImage = async (
  superheroId: string,
  superheroImages: fileUpload.FileArray
): Promise<ISuperHero> => {
  const maximumImagesLength = 5;

  const totalNewImages = Object.keys(superheroImageService).length;

  const currentTotalSuperheroImages =
    await superheroRepo.countSuperheroImagesById(superheroId);

  if (totalNewImages + currentTotalSuperheroImages > maximumImagesLength) {
    throw new PayloadTooLarge(
      `Can not load more images than ${maximumImagesLength}(current images ${currentTotalSuperheroImages}, new images ${totalNewImages} )`
    );
  }

  const superhero = await superheroRepo.findSuperheroById(superheroId);

  if (!superhero) {
    throw new BadRequestError('Superehero was not found');
  }

  const superheroImagesCreationAWSPromises = Object.keys(superheroImages).map(
    (fileName) => {
      const file = superheroImages[fileName] as UploadedFile;

      return uploadSeperheroFiles(
        fileName,
        file,
        superhero._id,
        FileItemTypeEnum.SUPERHERO
      );
    }
  );

  const createdSuperheroAWSImages: CreateSuperheroImageDto[] =
    await Promise.all(superheroImagesCreationAWSPromises);

  const superheroImagesCreationDbPromises = createdSuperheroAWSImages.map(
    (superheroImageData) => createSuperheroImage(superheroImageData)
  );

  const createdSuperheroDbImages: ISuperheroImage[] = await Promise.all(
    superheroImagesCreationDbPromises
  );

  const superheroImagesIds = createdSuperheroDbImages.map((img) => img._id);

  const newSuperhero = (await superheroRepo.createSuperheroImages(
    superheroId,
    superheroImagesIds
  )) as ISuperHero;

  return newSuperhero;
};

export const getSuperheroList = async (
  query: ISuperheroListQuery
): Promise<ISuperheroListResponse> => {
  const [superheros, totalCount] = await superheroRepo.getSuperheroList(query);

  return superheroPresenter.toListResponse(superheros, totalCount, query);
};

export const findSuperheroById = async (id: string): Promise<ISuperHero> => {
  const superhero = await superheroRepo.findSuperheroById(id);

  if (!superhero) {
    throw new BadRequestError('Bad superhero id');
  }

  return superheroPresenter.toPublicResponse(superhero);
};

export const updateSuperheroById = async (
  id: string,
  dto: UpdateSuperheroDto
): Promise<ISuperHero> => {
  const { nickname } = dto;

  const isSuperheroExist = await superheroRepo.findSuperheroByParams({
    nickname,
  });

  if (isSuperheroExist) {
    throw new ConflictError(
      'The superhero with specified nickname already exist'
    );
  }

  const newSuperhero = await superheroRepo.updateSuperheroById(id, dto);

  if (!newSuperhero) {
    throw new BadRequestError('Bad superhero id');
  }

  return newSuperhero;
};

export const deleteSuperheroById = async (id: string): Promise<void> => {
  const deletedSuperhero = await superheroRepo.deleteSuperheroById(id);

  if (!deletedSuperhero) {
    throw new BadRequestError('Super hero does not exist');
  }

  await deleteSuperheroFolder(
    FileItemTypeEnum.SUPERHERO,
    deletedSuperhero.nickname
  );
};

export const deleteSuperpowerById = async (
  superheroId: string,
  superpowerId: string
): Promise<void> => {
  const superhero = await superheroRepo.deleteSuperpowerById(
    superheroId,
    superpowerId
  );

  if (!superhero) {
    throw new BadRequestError('Superhero id or superpower id is not found');
  }

  await superpowerService.deleteSuperpowerById(superpowerId);

  return;
};

export const deleteSuperheroImageById = async (
  superheroId: string,
  superheroImageId: string
): Promise<void> => {
  const superhero = await superheroRepo.deleteSuperheroImageById(
    superheroId,
    superheroImageId
  );

  if (!superhero) {
    throw new BadRequestError('Superhero id or superpower id is not found');
  }

  const deletedSuperheroImage =
    await superheroImageService.deleteSuperheroImageById(superheroImageId);

  await deleteSuperheroFile(deletedSuperheroImage.path);

  return;
};
