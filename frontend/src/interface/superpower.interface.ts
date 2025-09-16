export interface ISuperpower {
  _id: string;
  name: string;
}

export type CreateSuperpower = Omit<ISuperpower, '_id'>;
