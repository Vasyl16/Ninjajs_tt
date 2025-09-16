import type { ISuperheroImage } from './superheroImage.interface';
import type { ISuperpower } from './superpower.interface';

export interface ISuperHero {
  _id: string;
  nickname: string;
  realName: string;
  originDescription?: string;
  superpowers: ISuperpower[];
  catchPhrase?: string;
  images?: ISuperheroImage[];
}

export interface ISuperHeroQuery {
  page?: number;
  search?: string;
}

export interface ISuperheroSliceState {
  page: number;
  total: number;
  results: ISuperHero[];
  status: 'success' | 'error' | 'loading';
}

export type SuperheroSliceStateRes = Omit<
  ISuperheroSliceState,
  'status' | 'results'
> & {
  entities: ISuperHero[];
};

export type SuperheroTextFields = Omit<ISuperHero, 'images' | 'superpowers'>;
