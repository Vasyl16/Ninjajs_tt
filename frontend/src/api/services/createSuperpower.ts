import { createSuperpower } from '../../constants/api';
import type {
  CreateSuperpower,
  ISuperpower,
} from '../../interface/superpower.interface';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const createSuperpowerFun = async (
  superpower: CreateSuperpower,
  superheroId: string
): Promise<ISuperpower> => {
  const res = await axiosBackendInstance.post(createSuperpower(superheroId), {
    name: superpower.name,
  });
  return res.data;
};
