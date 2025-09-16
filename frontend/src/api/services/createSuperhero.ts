import { CREATE_SUPERHERO } from '../../constants/api';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const createSuperhero = async (data: FormData) => {
  return axiosBackendInstance.post(CREATE_SUPERHERO, data);
};
