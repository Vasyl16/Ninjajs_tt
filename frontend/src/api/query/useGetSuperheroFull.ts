import { useQuery } from '@tanstack/react-query';
import type { ISuperHero } from '../../interface/superhero.interface';
import { getSuperheroFull } from '../services/getSuperheroById';

export const useGetMovieFull = (id: string) => {
  return useQuery<ISuperHero>({
    queryKey: ['superhero', id],
    queryFn: () => getSuperheroFull(id),
  });
};
