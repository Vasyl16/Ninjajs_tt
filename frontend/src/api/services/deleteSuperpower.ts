import { deleteSuperpower } from '../../constants/api';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const deleteSuperpowerFun = async (
  superheroId: string,
  superpowerId: string
) => {
  return await axiosBackendInstance.delete(
    deleteSuperpower(superheroId, superpowerId)
  );
};
