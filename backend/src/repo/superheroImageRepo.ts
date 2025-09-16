import { InternalServerError } from '../errors/errors';
import {
  CreateSuperheroImageDto,
  ISuperheroImage,
} from '../interface/image.interface';
import { SuperheroImage } from '../models/superheroImage';

export const createSuperheroImage = async (
  dto: CreateSuperheroImageDto
): Promise<ISuperheroImage> => {
  try {
    return await SuperheroImage.create(dto);
  } catch (error) {
    throw new InternalServerError('Can not create superhero image');
  }
};

export const deleteSuperheroImageById = async (
  id: string
): Promise<ISuperheroImage | null> => {
  try {
    return await SuperheroImage.findByIdAndDelete(id);
  } catch (error) {
    throw new InternalServerError('Can not delete superhero image');
  }
};
