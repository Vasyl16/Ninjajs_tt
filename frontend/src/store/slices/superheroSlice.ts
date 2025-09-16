import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  ISuperHeroQuery,
  ISuperheroSliceState,
  SuperheroSliceStateRes,
} from '../../interface/superhero.interface';
import { getSuperhero } from '../../api/services/getSuperhero';
import toast from 'react-hot-toast';

const initialState: ISuperheroSliceState = {
  page: 1,
  total: 1,
  results: [],
  status: 'success',
};

export const fetchSuperHeros = createAsyncThunk(
  'superheroSlice/fetchSuperHerous',
  async (options: ISuperHeroQuery) => {
    const data = await getSuperhero(options);
    return data;
  }
);

export const superheroSlice = createSlice({
  name: 'superheroSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuperHeros.pending, (state) => {
      state.status = 'loading';
      toast.loading('Loading superheros', { duration: 1000 });
    });

    builder.addCase(fetchSuperHeros.rejected, (state) => {
      state.status = 'error';
      toast.error('Can not get superheros');
    });

    builder.addCase(
      fetchSuperHeros.fulfilled,
      (state, action: PayloadAction<SuperheroSliceStateRes>) => {
        state.status = 'success';
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.results = action.payload.entities;
        toast.success('Superheros fetched');
      }
    );
  },
});

export default superheroSlice.reducer;
