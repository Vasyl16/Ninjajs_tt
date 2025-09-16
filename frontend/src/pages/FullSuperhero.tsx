import React from 'react';
import { SuperheroSwiper } from '../components/SuperheroSwiper';
import { EditSuperheroTextFields } from '../components/EditSuperheroTextFields';
import { EditSuperpowerFields } from '../components/EditSuperpowerFields';
import { useGetMovieFull } from '../api/query/useGetSuperheroFull';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import type { SuperheroTextFields } from '../interface/superhero.interface';
import { deleteSuperheroFun } from '../api/services/deleteSuperhero';
import toast from 'react-hot-toast';

export const FullSuperhero: React.FC = () => {
  const { id = '' } = useParams();

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetMovieFull(id);

  const onDeleteSuperhero = async () => {
    try {
      toast.loading('adding superhero', { duration: 1000 });
      await deleteSuperheroFun(id);
      toast.success('Superhero was deleted');
      navigate(ROUTES.HOME || '/');
    } catch (error) {
      const customError = error as { response: { data: { message: string } } };
      console.error(error);

      const customMessage = customError.response.data.message;

      if (customMessage) {
        toast.error(customMessage);
      } else {
        toast.error('superhero was not edited');
      }
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error || !data) {
    return (
      <div className="text-center">
        <button
          onClick={() => navigate(ROUTES.HOME || '/')}
          className="text-white mx-auto mt-[40px] cursor-pointer hover:opacity-50 duration-300 text-[20px] font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
        >
          Back
        </button>
      </div>
    );
  }

  const superheroTextFields: SuperheroTextFields = {
    nickname: data.nickname,
    _id: data._id,
    realName: data.realName,
    catchPhrase: data.catchPhrase,
    originDescription: data.originDescription,
  };

  return (
    <div className="p-[20px_30px] container mx-auto ">
      <div className="flex w-full gap-[30px] ">
        <div className="w-[300px] ">
          <SuperheroSwiper superheroId={data._id} images={data.images} />
        </div>

        <div className="flex-1">
          <EditSuperheroTextFields superheroTextFields={superheroTextFields} />

          <div className="mt-[80px]">
            <EditSuperpowerFields
              superpowers={data.superpowers}
              superheroId={data._id}
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-[30px] ">
        <button
          className={`shrink-0 text-nowrap text-white uppercase cursor-pointer  duration-300 text-[24px] font-semibold bg-main-button-bg  p-[14px_26px] rounded-[7px]`}
          type="button"
          onClick={onDeleteSuperhero}
        >
          Delete Superhero
        </button>{' '}
      </div>
    </div>
  );
};
