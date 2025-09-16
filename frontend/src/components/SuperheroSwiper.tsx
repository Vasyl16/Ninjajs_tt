import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { ISuperheroImage } from '../interface/superheroImage.interface';

import 'swiper/swiper-bundle.css';
import { SuperheroSwiperSlide } from './SuperheroSwiperSlide';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { deleteSuperheroImageFun } from '../api/services/deleteSuperheroImage';
import { createSuperheroImageFun } from '../api/services/createSuperheroImage';

interface SuperheroSwiperProps {
  images: ISuperheroImage[] | undefined;
  superheroId: string;
}

export const SuperheroSwiper: React.FC<SuperheroSwiperProps> = ({
  images,
  superheroId,
}) => {
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDeleteSuperheroImage = async (id: string) => {
    try {
      toast.loading('Superhero image deleting', { duration: 1000 });
      await deleteSuperheroImageFun(superheroId, id);

      queryClient.invalidateQueries({ queryKey: ['superhero'] });

      toast.success('Superhero image was deleted');
    } catch (error) {
      const customError = error as { response: { data: { message: string } } };
      console.error(error);

      const customMessage = customError.response.data.message;

      if (customMessage) {
        toast.error(customMessage);
      } else {
        toast.error('Superhero image was not create');
      }
    }
  };

  const onAddSuperheroImage = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only images are allowed!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5 MB!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append(file.name, file);

      toast.loading('Superhero image adding', { duration: 1000 });
      await createSuperheroImageFun(formData, superheroId);

      queryClient.invalidateQueries({ queryKey: ['superhero'] });
      toast.success('Superhero image was added');
    } catch (error) {
      const customError = error as {
        response?: { data?: { message?: string } };
      };
      console.error(error);
      toast.error(customError.response?.data?.message || 'Failed to add image');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAddSuperheroImage(file);
  };

  return (
    <div className="w-full h-[400px] max-w-3xl mx-auto">
      <Swiper
        modules={[Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        {images ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <SuperheroSwiperSlide
                onDelete={onDeleteSuperheroImage}
                image={img}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src={'/img/superhero/superheroPlaceholder.png'}
              alt={'superhero'}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
        )}
      </Swiper>

      <div className="mt-[50px] text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-white uppercase cursor-pointer duration-300 text-[16px] font-semibold bg-main-button-bg p-[10px_18px] rounded-[7px] hover:opacity-70"
        >
          Add Image
        </button>
      </div>
    </div>
  );
};
