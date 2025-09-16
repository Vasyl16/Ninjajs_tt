export interface ISuperpower {
  _id: string;
  name: string;
}

export type CreateSuperpowerDto = Pick<ISuperpower, 'name'>;
