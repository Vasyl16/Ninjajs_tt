import { BadRequestError } from '../errors/errors';
import { ISuperheroImage } from '../interface/image.interface';
import * as superheroImageRepo from '../repo/superheroImageRepo';

export const deleteSuperheroImageById = async (
  id: string
): Promise<ISuperheroImage> => {
  const deletedSuperheroImage =
    await superheroImageRepo.deleteSuperheroImageById(id);

  if (!deletedSuperheroImage) {
    throw new BadRequestError('Superhero image does not exist');
  }

  return deletedSuperheroImage;
};
