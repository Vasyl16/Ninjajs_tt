import React from 'react';
import type { ISuperheroImage } from '../interface/superheroImage.interface';
import { CircleX } from 'lucide-react';

export const SuperheroSwiperSlide: React.FC<{
  image: ISuperheroImage;
  onDelete: (id: string) => void;
}> = ({ image, onDelete }) => {
  return (
    <div className="relative ">
      <img
        src={image.path}
        alt={image.title}
        className="w-full h-[400px] object-cover rounded-lg"
      />

      <CircleX
        onClick={() => {
          onDelete(image._id);
        }}
        className="absolute z-10 size-[40px] top-0 right-0  hover:scale-[1.1] duration-300  fill-main-button-bg cursor-pointer"
      />
    </div>
  );
};
