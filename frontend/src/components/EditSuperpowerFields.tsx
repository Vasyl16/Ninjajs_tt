import { CircleX } from 'lucide-react';
import React, { useState } from 'react';
import type { ISuperpower } from '../interface/superpower.interface';
import { deleteSuperpowerFun } from '../api/services/deleteSuperpower';
import toast from 'react-hot-toast';
import { createSuperpowerFun } from '../api/services/createSuperpower';
import { useQueryClient } from '@tanstack/react-query';

export const EditSuperpowerFields: React.FC<{
  superpowers: ISuperpower[];
  superheroId: string;
}> = ({ superheroId, superpowers }) => {
  const [superpowerInput, setSuperpowerInput] = useState('');

  const queryClient = useQueryClient();

  const onDeleteSuperpower = async (i: string) => {
    try {
      await deleteSuperpowerFun(superheroId, i);

      queryClient.invalidateQueries({ queryKey: ['superhero'] });

      toast.success('Superpower was deleted');
    } catch (error) {
      console.error(error);
      toast.error('Superpower was not deleted');
    }
  };

  const onAddSuperpower = async () => {
    const isSuperpowerExist = superpowers.some(
      ({ name }) => name.toLowerCase() === superpowerInput.toLowerCase()
    );

    if (isSuperpowerExist) {
      toast.error('Superpower already exist');
      return;
    }

    const superpower = { name: superpowerInput };
    try {
      await createSuperpowerFun(superpower, superheroId);

      queryClient.invalidateQueries({ queryKey: ['superhero'] });

      setSuperpowerInput('');

      toast.success('Superpower was created');
    } catch (error) {
      const customError = error as { response: { data: { message: string } } };
      console.error(error);

      const customMessage = customError.response.data.message;

      if (customMessage) {
        toast.error(customMessage);
      } else {
        toast.error('Superpower was not create');
      }
    }
  };

  return (
    <div className="flex gap-[20px] mt-[10px] flex-col">
      <div className="flex gap-[15px]">
        {superpowers.map(({ name, _id }) => (
          <div
            key={_id}
            className="min-w-[80px] relative  inline-flex flex-col justify-center"
          >
            <p className=" shrink-0 flex-1  w-full  text-center text-nowrap text-white text-[18px] font-semibold bg-main-button-bg  p-[10px_16px] rounded-[7px]">
              {name}
            </p>

            <CircleX
              onClick={() => onDeleteSuperpower(_id)}
              className="absolute size-[20px] top-0 right-0 translate-x-[40%] hover:scale-[1.1] duration-300 translate-y-[-40%] fill-main-button-bg cursor-pointer"
            />
          </div>
        ))}
      </div>

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
                  !superpowerInput
                    ? 'select-none opacity-30 cursor-[default_!important]'
                    : 'hover:opacity-50'
                }`}
          disabled={!superpowerInput}
          type="button"
          onClick={onAddSuperpower}
        >
          Add superpower
        </button>
      </div>
    </div>
  );
};
