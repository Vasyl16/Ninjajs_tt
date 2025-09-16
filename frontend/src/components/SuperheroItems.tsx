import React from 'react';
import { SuperheroItem } from './SuperheroItem';
import type { ISuperHero } from '../interface/superhero.interface';

export const SuperheroItems: React.FC<{
  superheroList: ISuperHero[];
}> = ({ superheroList }) => {
  return (
    <div className="flex gap-[20px] justify-center flex-wrap">
      {superheroList.map(({ nickname, _id, images }) => (
        <SuperheroItem
          _id={_id}
          key={_id}
          image={images?.[0]?.path}
          nickname={nickname}
        />
      ))}
    </div>
  );
};
