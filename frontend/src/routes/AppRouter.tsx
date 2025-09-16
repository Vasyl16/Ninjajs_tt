import type React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AppLayout } from '../layouts/AppLayout';
import { SuperheroList } from '../pages/SuperheroList';
import { CreateSuperhero } from '../pages/CreateSuperhero';
import { FullSuperhero } from '../pages/FullSuperhero';
import { NotFound } from '../pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route index element={<SuperheroList />} />

        <Route path={ROUTES.CREATE_SUPERHERO} element={<CreateSuperhero />} />

        <Route path={ROUTES.FULL_SUPERHERO} element={<FullSuperhero />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
