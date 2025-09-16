import React from 'react';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const AppLayout: React.FC = () => {
  return (
    <>
      <Header />

      <Toaster position="top-right" />

      <Outlet />
    </>
  );
};
