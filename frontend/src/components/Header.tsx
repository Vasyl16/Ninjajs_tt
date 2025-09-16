import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

export const Header: React.FC = () => {
  return (
    <header className="bg-main-bg shadow-main transition-theme top-0 sticky z-10">
      <div className="flex justify-center items-center p-[20px] min-h-[90px] container justify-self-center ">
        <nav className="flex justify-center gap-[60px]">
          <ul className="text-[20px] p-2  cursor-pointer">
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `${isActive && 'text-main-button-bg'}`
              }
            >
              Home
            </NavLink>
          </ul>

          <ul className="text-[20px] p-2  cursor-pointer">
            <NavLink
              to={ROUTES.CREATE_SUPERHERO}
              className={({ isActive }) =>
                `${isActive && 'text-main-button-bg'}`
              }
            >
              Create Superhero
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};
