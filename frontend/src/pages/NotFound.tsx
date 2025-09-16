import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-[40px]  gap-[30px] ">
      <h4 className="text-[30px]">Page Not Found</h4>

      <div className="flex gap-[20px] items-center ">
        <p className="text-[20px] ">Please go back</p>

        <button
          onClick={() => navigate(ROUTES.HOME || '/')}
          className="text-white cursor-pointer hover:opacity-50 duration-300 text-[20px] font-semibold bg-main-button-bg py-[6px] px-[10px] rounded-[7px]"
        >
          Back
        </button>
      </div>
    </div>
  );
};
