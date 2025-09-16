import mongoose, { model, Schema } from 'mongoose';

import { ISuperHero } from '../interface/superhero.interface';

const superheroSchema = new Schema(
  {
    nickname: {
      unique: true,
      type: String,
      required: [true, 'Nickname is required'],
    },

    realName: {
      type: String,
      required: [true, 'Real name is required'],
      trim: true,
    },

    originDescription: {
      type: String,
      required: [false, 'Origin description is required'],
    },

    superpowers: [
      {
        required: [true, 'At least one superpower is required'],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Superpower', // This tells Mongoose which model to use during population
      },
    ],

    catchPhrase: {
      type: String,
      required: [false, 'Catch phrase is required'],
      trim: true,
    },

    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SuperheroImage', // This tells Mongoose which model to use during population
      },
    ],
  },
  {
    versionKey: false,
  }
);

superheroSchema.pre('findOneAndDelete', async function (next) {
  try {
    const filter = this.getFilter();
    const superhero = await this.model.findOne(filter);

    if (superhero) {
      // Delete all related superpowers (if they're exclusive to this hero)
      await mongoose.model('Superpower').deleteMany({
        _id: { $in: superhero.superpowers },
      });

      // Delete all related images (usually exclusive to this hero)
      await mongoose.model('SuperheroImage').deleteMany({
        _id: { $in: superhero.images },
      });
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Superhero = model<ISuperHero>('Superhero', superheroSchema);
