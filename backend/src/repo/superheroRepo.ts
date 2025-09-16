import { FilterQuery } from 'mongoose';
import { BadRequestError, InternalServerError } from '../errors/errors';
import {
  CreateSuperheroObj,
  ISuperHero,
  ISuperheroListQuery,
  UpdateSuperheroDto,
} from '../interface/superhero.interface';
import { Superhero } from '../models/superheroModel';

export const createSuperhero = async (
  obj: CreateSuperheroObj
): Promise<ISuperHero> => {
  try {
    return await Superhero.create(obj);
  } catch (error) {
    throw new InternalServerError('Can not create superhero');
  }
};

export const getSuperheroList = async (
  query: ISuperheroListQuery
): Promise<[ISuperHero[], number]> => {
  const filetObj: FilterQuery<ISuperHero> = {};

  const limit = query.limit || 5;
  const page = query.page || 1;

  const totalPages = Math.ceil((await Superhero.countDocuments()) / limit);

  if (page > 1 && page > totalPages) {
    throw new BadRequestError('Page was not found');
  }

  const skip = (page - 1) * limit;

  if (query.search) {
    filetObj.nickname = { $regex: query.search, $options: 'i' };
  }

  const superheros = await Superhero.find(filetObj)
    .skip(skip)
    .limit(limit)
    .populate('superpowers')
    .populate('images');

  return [superheros, totalPages];
};

export const findSuperheroByParams = async (
  params: Partial<ISuperHero>
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findOne(params)
      .populate('superpowers')
      .populate('images');
  } catch (error) {
    throw new InternalServerError('Can not find superhero');
  }
};

export const findSuperheroById = async (
  id: string
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findById(id)
      .populate('superpowers')
      .populate('images');
  } catch (error) {
    throw new InternalServerError('Can not find superhero');
  }
};

export const deleteSuperheroById = async (
  id: string
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndDelete(id);
  } catch (error) {
    throw new InternalServerError('Can not delete superhero');
  }
};

export const updateSuperheroById = async (
  id: string,
  dto: UpdateSuperheroDto
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndUpdate(id, dto, { new: true });
  } catch (error) {
    throw new InternalServerError('Can not update superhero ');
  }
};

export const deleteSuperpowerById = async (
  superheroId: string,
  superpowerId: string
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndUpdate(
      superheroId,
      { $pull: { superpowers: superpowerId } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new InternalServerError('Can not update superhero');
  }
};

export const createSuperPower = async (
  superheroId: string,
  superpowerId: string
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndUpdate(
      superheroId,
      { $push: { superpowers: superpowerId } },
      { new: true, runValidators: true }
    )
      .populate('superpowers')
      .populate('images');
  } catch (error) {
    throw new InternalServerError('Can not add superpower');
  }
};

export const deleteSuperheroImageById = async (
  superheroId: string,
  superheroImageId: string
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndUpdate(superheroId, {
      $pull: { images: superheroImageId },
    });
  } catch (error) {
    throw new InternalServerError('Can not update superhero');
  }
};

export const countSuperheroImagesById = async (id: string): Promise<number> => {
  try {
    return await Superhero.find({ id: id }).countDocuments();
  } catch (error) {
    throw new InternalServerError('Can not count images of superhero');
  }
};

export const createSuperheroImages = async (
  superheroId: string,
  superheroImagesIds: string[]
): Promise<ISuperHero | null> => {
  try {
    return await Superhero.findByIdAndUpdate(
      superheroId,
      { $push: { images: { $each: superheroImagesIds } } },
      { new: true, runValidators: true }
    )
      .populate('superpowers')
      .populate('images');
  } catch (error) {
    throw new InternalServerError('Can not add superpowers');
  }
};
