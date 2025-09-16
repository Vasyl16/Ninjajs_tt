import React from 'react';
import { CreateSuperheroForm } from '../components/CreateSuperheroForm';

export const CreateSuperhero: React.FC = () => {
  return (
    <div className="p-[30px_20px] ">
      <div className="container mx-auto">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-center text-[32px] font-bold ">
            Create Superhero
          </h1>

          <CreateSuperheroForm />
        </div>
      </div>
    </div>
  );
};
