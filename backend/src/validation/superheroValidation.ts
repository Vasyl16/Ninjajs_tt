import { body, check, checkExact, query } from 'express-validator';
import { validateObjectIdParam } from '../helpers/validateObjectIdParam';

export const validateCreateSuperhero = checkExact([
  check('nickname')
    .trim()
    .notEmpty()
    .withMessage('Nickname is required')
    .bail()
    .isString()
    .withMessage('Nickname must be a string'),

  check('realName')
    .trim()
    .notEmpty()
    .withMessage('RealName is required')
    .bail()
    .isString()
    .withMessage('RealName must be a string'),
  check('originDescription')
    .optional()
    .trim()
    .isString()
    .withMessage('originDescription must be a string'),
  check('superpowers')
    .notEmpty()
    .withMessage('At least one superpower are required')
    .bail()
    .custom((value) => {
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;

        if (!Array.isArray(parsed)) {
          throw new Error();
        }

        return parsed.every((item, index) => {
          if (
            typeof item !== 'object' ||
            !item.name ||
            typeof item.name !== 'string' ||
            item.name?.trim()?.length === 0
          ) {
            throw new Error();
          }
          return true;
        });
      } catch (error) {
        throw new Error('Superpowers must be a valid JSON array');
      }
    }),
  check('catchPhrase')
    .trim()
    .optional()
    .isString()
    .withMessage('catchPhrase must be a string'),
]);

export const validateSuperheroIdParam = [validateObjectIdParam('id')];

export const validateSuperheroQuery = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a positive integer')
    .default(10),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .default(1),
  query('search')
    .trim()
    .optional()
    .isString()
    .withMessage('Search must be a string')
    .default(''),
];

export const validateUpdateSuperhero = [
  body().custom((value, { req }) => {
    const allowedFields = [
      'nickname',
      'realName',
      'originDescription',
      'catchPhrase',
    ];
    const receivedFields = Object.keys(req.body ?? {});

    if (receivedFields.length === 0) {
      throw new Error(
        'At least one field (nickname, realName, originDescription, or catchPhrase) is required for update.'
      );
    }

    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields in request: ${invalidFields.join(', ')}`);
    }

    return true;
  }),

  check('nickname')
    .trim()
    .optional()
    .isString()
    .withMessage('Nickname must be a string'),

  check('realName')
    .trim()
    .optional()
    .isString()
    .withMessage('RealName must be a string'),

  check('originDescription')
    .trim()
    .optional()
    .isString()
    .withMessage('originDescription must be a string'),

  check('catchPhrase')
    .trim()
    .optional()
    .isString()
    .withMessage('catchPhrase must be a string'),
];

export const validateDeleteSuperpowerParams = [
  validateObjectIdParam('superheroId'),
  validateObjectIdParam('superpowerId'),
];

export const validateCreateSuperpower = checkExact([
  validateObjectIdParam('superheroId'),
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Superpower should not be empty')
    .bail()
    .isString()
    .withMessage('Superpower must be a string'),
]);

export const validateDeleteSuperheroImage = [
  validateObjectIdParam('superheroId'),
  validateObjectIdParam('superheroImageId'),
];

export const validateCreateSuperheroImages = checkExact([
  validateObjectIdParam('superheroId'),
]);
