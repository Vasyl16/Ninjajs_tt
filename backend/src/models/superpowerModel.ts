import { model, Schema } from 'mongoose';

import { ISuperpower } from '../interface/superpower.interface';

const superpowerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Superpower = model<ISuperpower>('Superpower', superpowerSchema);
