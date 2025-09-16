export interface ISuperheroImage {
  _id: string;
  title: string;
  path: string;
}

export type CreateSuperheroImageDto = Omit<ISuperheroImage, '_id'>;
