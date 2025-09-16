import { Router } from 'express';

import * as superheroController from '../controllers/superheroController';
import { multiImageMiddleware } from '../middlewares/fileChecker';
import {
  validateCreateSuperhero,
  validateCreateSuperheroImages,
  validateCreateSuperpower,
  validateDeleteSuperheroImage,
  validateDeleteSuperpowerParams,
  validateSuperheroIdParam,
  validateSuperheroQuery,
  validateUpdateSuperhero,
} from '../validation/superheroValidation';
import { handleValidationError } from '../middlewares/handleValidationError';
import { autoParseJson } from '../middlewares/autoParseJson';

const router = Router();

router.post(
  '',
  multiImageMiddleware(),
  validateCreateSuperhero,
  handleValidationError,
  autoParseJson(['superpowers']),
  superheroController.createSuperhero
);

router.post(
  '/:superheroId/superpower',
  validateCreateSuperpower,
  handleValidationError,
  superheroController.createSuperPower
);

router.post(
  '/:superheroId/superheroImage',
  multiImageMiddleware(true),
  validateCreateSuperheroImages,
  handleValidationError,
  superheroController.createSuperheroImage
);

router.get(
  '',
  validateSuperheroQuery,
  handleValidationError,
  superheroController.getSuperhero
);

router.get(
  '/:id',
  validateSuperheroIdParam,
  handleValidationError,
  superheroController.findSuperheroById
);

router.patch(
  '/:id',
  validateUpdateSuperhero,
  handleValidationError,
  superheroController.updateSuperheroById
);

router.delete(
  '/:id',
  validateSuperheroIdParam,
  handleValidationError,
  superheroController.deletSuperheroById
);

router.delete(
  '/:superheroId/superpower/:superpowerId',
  validateDeleteSuperpowerParams,
  handleValidationError,
  superheroController.deleteSuperpowerById
);

router.delete(
  '/:superheroId/superheroImage/:superheroImageId',
  validateDeleteSuperheroImage,
  handleValidationError,
  superheroController.deleteSuperheroImageById
);

export default router;
