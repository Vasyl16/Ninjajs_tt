import { model, Schema } from 'mongoose';

import { ISuperheroImage } from '../interface/image.interface';

const superheroImageSchema = new Schema(
  {
    path: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const SuperheroImage = model<ISuperheroImage>(
  'SuperheroImage',
  superheroImageSchema
);
