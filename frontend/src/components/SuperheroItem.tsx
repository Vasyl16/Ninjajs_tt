import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../helper/truncateText';
import { getSuperheroById } from '../constants/api';

export const SuperheroItem: React.FC<{
  nickname: string;
  image: string | undefined;
  _id: string;
}> = ({ nickname, image, _id }) => {
  return (
    <article className="relative basis-[200px] shrink-0 gap-[1px] flex flex-col  ">
      <Link
        to={getSuperheroById(_id)}
        className="inline-block overflow-hidden rounded-[10px]"
      >
        <img
          className="block bg-[#bbbbbb] w-full h-[250px] duration-300 hover:scale-[1.1] object-cover "
          src={image || './img/superhero/superheroPlaceholder.png'}
        />
      </Link>
      <h3 className="text-[18px] mt-[4px] font-medium grow">
        {truncateText(nickname, 40)}
      </h3>
    </article>
  );
};
