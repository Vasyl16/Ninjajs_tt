import { getSuperheroById } from '../../constants/api';
import type { ISuperHero } from '../../interface/superhero.interface';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const getSuperheroFull = async (id: string) => {
  const response = await axiosBackendInstance<ISuperHero>(getSuperheroById(id));

  return response.data;
};
