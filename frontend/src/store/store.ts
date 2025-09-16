import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from './../../node_modules/react-redux/src/hooks/useDispatch';
import superheroSlice from './slices/superheroSlice';

export const store = configureStore({
  reducer: {
    superheroSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
