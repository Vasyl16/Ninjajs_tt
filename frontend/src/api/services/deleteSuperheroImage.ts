import { deleteSuperheroImage } from '../../constants/api';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const deleteSuperheroImageFun = async (
  superheroId: string,
  superheroImageId: string
) => {
  return await axiosBackendInstance.delete(
    deleteSuperheroImage(superheroId, superheroImageId)
  );
};
