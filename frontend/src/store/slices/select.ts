import type { RootState } from '../store';

export const selectSuperheroState = (state: RootState) => state.superheroSlice;
