export const CREATE_SUPERHERO = 'superhero';

export const GET_SUPERHERO = 'superhero';

export const getSuperheroById = (id: string) => `superhero/${id}`;

export const deleteSuperpower = (superheroId: string, superpowerId: string) =>
  `superhero/${superheroId}/superpower/${superpowerId}`;

export const createSuperpower = (superheroId: string) =>
  `superhero/${superheroId}/superpower`;

export const editSuperpowerTextFields = (superheroId: string) =>
  `superhero/${superheroId}`;

export const createSuperheroImage = (superheroId: string) =>
  `superhero/${superheroId}/superheroImage`;

export const deleteSuperheroImage = (
  superheroId: string,
  superheroImageId: string
) => `superhero/${superheroId}/superheroImage/${superheroImageId}`;

export const deleteSuperhero = (superheroId: string) =>
  `superhero/${superheroId}`;
