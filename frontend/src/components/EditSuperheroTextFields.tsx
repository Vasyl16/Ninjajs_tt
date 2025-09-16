import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SuperheroTextFields } from '../interface/superhero.interface';
import { areObjectsEqual } from '../helper/areObjectsEqual';
import {
  editsuperheroTextFieldsSchema,
  type EditsuperheroTextFieldsFormData,
} from '../validation/editTextFieldsValidation';
import toast from 'react-hot-toast';
import { editSuperheroTextFields } from '../api/services/editSuperheroTextFields';
import { useQueryClient } from '@tanstack/react-query';

export const EditSuperheroTextFields: React.FC<{
  superheroTextFields: SuperheroTextFields;
}> = ({ superheroTextFields }) => {
  const {
    register,
    handleSubmit,
    watch,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nickname: superheroTextFields.nickname,
      realName: superheroTextFields.realName,
      originDescription: superheroTextFields.originDescription,
      catchPhrase: superheroTextFields.catchPhrase,
    },
    resolver: zodResolver(editsuperheroTextFieldsSchema),
  });

  const queryClient = useQueryClient();

  const currentValues = watch();

  const initialValues = useMemo(
    () => ({
      nickname: superheroTextFields.nickname,
      realName: superheroTextFields.realName,
      originDescription: superheroTextFields.originDescription,
      catchPhrase: superheroTextFields.catchPhrase,
    }),
    [superheroTextFields]
  );

  const isChanged = useMemo(
    () => !areObjectsEqual(currentValues, initialValues),
    [currentValues, initialValues]
  );

  const onSubmit = async (data: EditsuperheroTextFieldsFormData) => {
    try {
      const updatedData: Partial<EditsuperheroTextFieldsFormData> =
        Object.entries(data).reduce((acc, [key, value]) => {
          if (value !== initialValues[key as keyof typeof initialValues]) {
            acc[key as keyof EditsuperheroTextFieldsFormData] = value;
          }
          return acc;
        }, {} as Partial<EditsuperheroTextFieldsFormData>);

      if (Object.keys(updatedData).length === 0) return; // no

      toast.loading('Editing text fields', { duration: 1000 });
      await editSuperheroTextFields(updatedData, superheroTextFields._id);

      queryClient.invalidateQueries({ queryKey: ['superhero'] });

      toast.success('Text fields were edited');
    } catch (error) {
      const customError = error as { response: { data: { message: string } } };
      console.error(error);

      const customMessage = customError.response.data.message;

      if (customMessage) {
        toast.error(customMessage);
      } else {
        toast.error('Text fields were not edited');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto w-full">
      <h2 className="text-[24px] mb-[10px]">Edit text fields</h2>

      <div className="flex flex-col gap-[20px]">
        <div className="">
          <label htmlFor="superheroNickname" className="text-[18px]">
            Superhero nickname*
          </label>
          <input
            {...register('nickname')}
            id="superheroNickname"
            className="text-[18px] mt-2 bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
          />
          {errors.nickname && (
            <p className="bg-red-700 p-[7px_15px] rounded-4xl text-black mt-[10px]">
              {errors.nickname.message}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="superheroRealName" className="text-[18px]">
            Superhero real name*
          </label>
          <input
            {...register('realName')}
            id="superheroRealName"
            className="text-[18px] mt-2 bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
          />
          {errors.realName && (
            <p className="bg-red-700 p-[7px_15px] rounded-4xl text-black mt-[10px]">
              {errors.realName.message}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="superheroCatchPhrase" className="text-[18px]">
            Superhero catch phrase
          </label>
          <input
            {...register('catchPhrase')}
            id="superheroCatchPhrase"
            className="text-[18px] mt-2 bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
          />

          {errors.catchPhrase && (
            <p className="bg-red-700 p-[7px_15px] rounded-4xl text-black mt-[10px]">
              {errors.catchPhrase.message}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="superheroDescription" className="text-[18px]">
            Superhero description
          </label>
          <textarea
            {...register('originDescription')}
            id="superheroDescription"
            className="min-h-[130px] resize-none text-[18px] mt-2 bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
          />

          {errors.originDescription && (
            <p className="bg-red-700 p-[7px_15px] rounded-4xl text-black mt-[10px]">
              {errors.originDescription.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="bg-red-700 p-[7px_15px] rounded-[10px] text-black mt-[10px]">
            {errors.root.message}
          </p>
        )}

        <div className="mt-[10px]">
          {isChanged && (
            <button
              disabled={isSubmitting}
              className={`text-white uppercase  cursor-pointer duration-300 text-[20px] font-semibold bg-main-button-bg p-[15px_20px] rounded-[7px]
              ${
                isSubmitting
                  ? 'select-none opacity-30 cursor-[default_!important]'
                  : 'hover:opacity-50'
              }`}
            >
              Edit Superhero Text fields
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
