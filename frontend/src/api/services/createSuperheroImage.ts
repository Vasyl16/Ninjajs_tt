import { createSuperheroImage } from '../../constants/api';
import type { ISuperpower } from '../../interface/superpower.interface';
import { axiosBackendInstance } from '../axios/axiosBackendInstance';

export const createSuperheroImageFun = async (
  superheroImage: FormData,
  superheroId: string
): Promise<ISuperpower> => {
  const res = await axiosBackendInstance.post(
    createSuperheroImage(superheroId),
    superheroImage
  );
  return res.data;
};
