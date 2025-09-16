import { ISuperheroImage } from './image.interface';
import { CreateSuperpowerDto, ISuperpower } from './superpower.interface';

export interface ISuperHero {
  _id: string;
  nickname: string;
  realName: string;
  originDescription?: string;
  superpowers: ISuperpower[];
  catchPhrase?: string;
  images?: ISuperheroImage[];
}

export type CreateSuperheroDto = Omit<
  ISuperHero,
  '_id' | 'images' | 'superpowers'
> & {
  superpowers: CreateSuperpowerDto[];
};

export type CreateSuperheroObj = Omit<
  ISuperHero,
  '_id' | 'images' | 'superpowers'
> & {
  superpowers: string[];
  images?: string[];
};

export type UpdateSuperheroDto = Partial<
  Omit<ISuperHero, '_id' | 'images' | 'superpowers'>
>;

export interface ISuperheroListQuery {
  limit?: number;
  page?: number;
  search?: string;
}

export interface ISuperheroListResponse {
  page: number;
  total: number;
  entities: ISuperHero[];
  query: ISuperheroListQuery;
}
