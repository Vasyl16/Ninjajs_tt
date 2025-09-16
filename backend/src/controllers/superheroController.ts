import { NextFunction, Request, Response } from 'express';

import * as superheroService from '../services/superheroService';
import * as superpowerService from '../services/superpowerService';
import {
  CreateSuperheroDto,
  ISuperheroListQuery,
  UpdateSuperheroDto,
} from '../interface/superhero.interface';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { deleteSuperheroFile, deleteSuperheroFolder } from '../services/s3';
import { FileItemTypeEnum } from '../enums/file-item-type.enum';
import { CreateSuperpowerDto } from '../interface/superpower.interface';

export const createSuperhero = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = req.body as CreateSuperheroDto;

    const superheroImages = req.files as fileUpload.FileArray | undefined;

    const superhero = await superheroService.createSuperhero(
      dto,
      superheroImages
    );

    return res.status(201).send(superhero);
  } catch (error) {
    next(error);
  }
};

export const getSuperhero = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query as ISuperheroListQuery;

  const superheros = await superheroService.getSuperheroList(query);

  res.send(superheros);

  try {
  } catch (error) {
    next(error);
  }
};

export const findSuperheroById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const superhero = await superheroService.findSuperheroById(id);

    res.send(superhero);
  } catch (error) {
    next(error);
  }
};

export const deletSuperheroById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const superhero = await superheroService.deleteSuperheroById(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateSuperheroById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const dto = req.body as UpdateSuperheroDto;

    const newSuperhero = await superheroService.updateSuperheroById(id, dto);

    res.send(newSuperhero);
  } catch (error) {
    next(error);
  }
};

export const deleteSuperpowerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const superpowerId = req.params.superpowerId;

    const superheroId = req.params.superheroId;

    await superheroService.deleteSuperpowerById(superheroId, superpowerId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createSuperPower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = req.body as CreateSuperpowerDto;

    const superheroId = req.params.superheroId;

    const superpower = await superheroService.createAndAddSuperPower(
      superheroId,
      dto
    );

    res.status(201).send(superpower);
  } catch (error) {
    next(error);
  }
};

export const deleteSuperheroImageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const superheroId = req.params.superheroId;

    const superheroImageId = req.params.superheroImageId;

    await superheroService.deleteSuperheroImageById(
      superheroId,
      superheroImageId
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createSuperheroImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const superheroImages = req.files as fileUpload.FileArray;

    const superheroId = req.params.superheroId;

    const superhero = await superheroService.createAndAddSuperheroImage(
      superheroId,
      superheroImages
    );

    res.status(201).send(superhero);
  } catch (error) {
    next(error);
  }
};
