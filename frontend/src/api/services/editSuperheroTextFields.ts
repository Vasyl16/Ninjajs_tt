import { editSuperpowerTextFields } from '../../constants/api';
import type { EditsuperheroTextFieldsFormData } from '../../validation/editTextFieldsValidation';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const editSuperheroTextFields = async (
  editFields: Partial<EditsuperheroTextFieldsFormData>,
  superheroId: string
) => {
  await axiosBackendInstance.patch(editSuperpowerTextFields(superheroId), {
    ...editFields,
  });
};
