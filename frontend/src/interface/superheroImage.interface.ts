export interface ISuperheroImage {
  _id: string;
  title: string;
  path: string;
}

export type CreateSuperheroImage = {
  [key: string]: File;
};
