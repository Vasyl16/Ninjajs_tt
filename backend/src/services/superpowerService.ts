import { BadRequestError } from '../errors/errors';
import * as superpowerRepo from '../repo/superpowerRepo';

export const deleteSuperpowerById = async (id: string): Promise<void> => {
  const deletedSuperpower = await superpowerRepo.deleteSuperpowerById(id);

  if (!deletedSuperpower) {
    throw new BadRequestError('Super power does not exist');
  }

  return;
};
