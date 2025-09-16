import React, { useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createSuperheroSchema,
  type CreatesuperHeroFormData,
} from '../validation/superheroValidation';
import { CircleX } from 'lucide-react';
import { useCreateSuperhero } from '../api/query/useCreateSuperhero';

export const CreateSuperheroForm: React.FC = () => {
  const [superheroImagesPreview, setSuperheroImagesPreview] = useState<
    { preview: string }[]
  >([]);

  const [superpowerInput, setSuperpowerInput] = useState('');

  const createSuperhero = useCreateSuperhero();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createSuperheroSchema),
    defaultValues: {
      images: [],
      superpowers: [],
    },
  });

  const {
    fields: superpowerFields,
    append: appendSuperpower,
    remove: removeSuperpower,
  } = useFieldArray({
    control,
    name: 'superpowers',
  });

  const { append: appendSuperheroImage, remove: removeSuperheroImage } =
    useFieldArray({
      control,
      name: 'images',
    });

  const onAddSuperheroImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const superheroImage = e.target.files?.[0];

    if (!superheroImage) {
      return;
    }

    if (!superheroImage.type.startsWith('image/')) {
      console.error('Only image files are allowed!');
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (superheroImage.size > maxSizeInBytes) {
      setError('images', { message: 'File size exceeds 5MB limit!' });
      return;
    }

    appendSuperheroImage({ file: superheroImage });

    const superheroImagePreview = URL.createObjectURL(superheroImage);

    setSuperheroImagesPreview((prev) => [
      ...prev,
      { preview: superheroImagePreview },
    ]);

    e.target.value = '';
  };

  const onDeleteSuperheroImage = (index: number) => {
    setSuperheroImagesPreview((prev) => prev.filter((_, i) => i !== index));

    removeSuperheroImage(index);
  };

  const onAddSuperpower = () => {
    const superpowerName = superpowerInput;

    if (!superpowerName) {
      setError('superpowers', { message: 'superpower should now be empty' });
      return;
    }

    const isSuperpowerExist = superpowerFields.some(
      ({ name }) => name.toLowerCase() === superpowerName.toLowerCase()
    );

    if (isSuperpowerExist) {
      setError('superpowers', {
        message: 'superpower alread exist in this superhero',
      });

      return;
    }
    clearErrors('superpowers');

    appendSuperpower({ name: superpowerName });

    setSuperpowerInput('');
  };

  const onDeleteSuperpower = (index: number) => {
    removeSuperpower(index);
  };

  const onSubmit = async (data: CreatesuperHeroFormData) => {
    const {
      nickname,
      realName,
      catchPhrase,
      originDescription,
      superpowers,
      images,
    } = data;

    const formData = new FormData();

    formData.append('nickname', nickname);
    formData.append('realName', realName);

    if (catchPhrase) formData.append('catchPhrase', catchPhrase);
    if (originDescription)
      formData.append('originDescription', originDescription);

    formData.append('superpowers', JSON.stringify(superpowers));

    images.forEach((image) => {
      formData.append(image.file.name, image.file);
    });

    try {
      await createSuperhero.mutateAsync(formData);
    } catch (error) {
      const customError = error as { response: { data: { message: string } } };
      console.error(error);

      const customMessage = customError.response.data.message;

      if (customMessage) {
        setError('root', { message: customMessage });
      }

      return;
    }

    reset();
    setSuperheroImagesPreview([]);
    setSuperpowerInput('');
  };

  const addFilleInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[600px] mx-auto w-full"
    >
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

        <div>
          <label htmlFor="superpower" className="text-[18px]">
            Add superpower
          </label>

          <div className="flex gap-[20px] mt-[10px]">
            <div className="flex gap-[15px]">
              {superpowerFields.map(({ name }, i) => (
                <div
                  key={name}
                  className="min-w-[80px] relative  inline-flex flex-col justify-center"
                >
                  <p className=" shrink-0 flex-1  w-full  text-center text-nowrap text-white text-[16px] font-semibold bg-main-button-bg  p-[4px_16px] rounded-[7px]">
                    {name}
                  </p>

                  <CircleX
                    onClick={() => onDeleteSuperpower(i)}
                    className="absolute size-[20px] top-0 right-0 translate-x-[40%] hover:scale-[1.1] duration-300 translate-y-[-40%] fill-main-button-bg cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {errors.superpowers && (
            <p className="bg-red-700 p-[7px_15px] rounded-[10px] text-black mt-[10px]">
              {errors.superpowers.message}
            </p>
          )}

          <div className="flex gap-[20px] mt-[10px] ">
            <input
              value={superpowerInput}
              onChange={(e) => setSuperpowerInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (superpowerInput.trim()) {
                    onAddSuperpower();
                  }
                }
              }}
              id="superpower"
              className="text-[18px] bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
            />
            <button
              className={`shrink-0 text-nowrap text-white uppercase cursor-pointer  duration-300 text-[16px] font-semibold bg-main-button-bg  p-[4px_16px] rounded-[7px]
                ${
                  !superpowerInput || isSubmitting
                    ? 'select-none opacity-30 cursor-[default_!important]'
                    : 'hover:opacity-50'
                }`}
              disabled={!superpowerInput || isSubmitting}
              onClick={onAddSuperpower}
              type="button"
            >
              Add superpower
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] items-start mt-[10px]">
          <label htmlFor="superheroImage" className="text-[18px]">
            Superhero images*
          </label>

          <input
            id="superheroImage"
            className="hidden"
            ref={addFilleInputRef}
            onChange={onAddSuperheroImage}
            type="file"
            accept="image/*"
          />

          <div className="flex gap-[20px]">
            {superheroImagesPreview.map(({ preview }, index) => (
              <div key={index} className=" h-[130px] width-[100px] relative">
                <CircleX
                  onClick={() => {
                    onDeleteSuperheroImage(index);
                  }}
                  className="absolute size-[30px] top-0 right-0 translate-x-[40%] hover:scale-[1.1] duration-300 translate-y-[-40%] fill-main-button-bg cursor-pointer "
                />

                <img src={preview} className="object-cover h-full width-full" />
              </div>
            ))}
          </div>

          {errors.images && (
            <p className="bg-red-700 p-[7px_15px] rounded-[10px] text-black mt-[10px]">
              {errors.images.message}
            </p>
          )}

          <button
            disabled={isSubmitting}
            type="button"
            className={`text-white uppercase cursor-pointer duration-300 text-[18px] font-semibold bg-main-button-bg py-[6px] p-[12px_16px] rounded-[7px]
                ${
                  isSubmitting
                    ? 'select-none opacity-30 cursor-[default_!important]'
                    : 'hover:opacity-50'
                }`}
            onClick={() => {
              addFilleInputRef.current?.click();
            }}
          >
            Add file
          </button>
        </div>

        {errors.root && (
          <p className="bg-red-700 p-[7px_15px] rounded-[10px] text-black mt-[10px]">
            {errors.root.message}
          </p>
        )}

        <div className="mt-[20px]">
          <button
            disabled={isSubmitting}
            className={`text-white uppercase  cursor-pointer duration-300 text-[20px] font-semibold bg-main-button-bg p-[15px_20px] rounded-[7px]
              ${
                isSubmitting
                  ? 'select-none opacity-30 cursor-[default_!important]'
                  : 'hover:opacity-50'
              }`}
          >
            Create Superhero
          </button>
        </div>
      </div>
    </form>
  );
};
