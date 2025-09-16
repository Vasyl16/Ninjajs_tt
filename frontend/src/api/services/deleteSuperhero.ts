import { deleteSuperhero } from '../../constants/api';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const deleteSuperheroFun = async (superheroId: string) => {
  return await axiosBackendInstance.delete(deleteSuperhero(superheroId));
};
