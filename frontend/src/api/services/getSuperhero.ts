import { GET_SUPERHERO } from '../../constants/api';
import type {
  ISuperHeroQuery,
  SuperheroSliceStateRes,
} from '../../interface/superhero.interface';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const getSuperhero = async (
  options: ISuperHeroQuery
): Promise<SuperheroSliceStateRes> => {
  const { page, search } = options;

  const params = new URLSearchParams();

  if (page) {
    params.set('page', String(page));
  }

  if (search) {
    params.set('search', String(search));
  }

  const result = await axiosBackendInstance.get(GET_SUPERHERO, {
    params,
  });

  return result.data;
};
