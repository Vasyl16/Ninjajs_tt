import { InternalServerError } from '../errors/errors';
import {
  ISuperpower,
  CreateSuperpowerDto,
} from '../interface/superpower.interface';
import { Superpower } from '../models/superpowerModel';

export const createSuperpower = async (dto: CreateSuperpowerDto) => {
  try {
    return await Superpower.create({ name: dto.name });
  } catch (error) {
    throw new InternalServerError('Can not create superpower');
  }
};

export const deleteSuperpowerById = async (
  id: string
): Promise<ISuperpower | null> => {
  try {
    return await Superpower.findByIdAndDelete(id);
  } catch (error) {
    throw new InternalServerError('Can not delete superpower');
  }
};
