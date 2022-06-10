import { CharactersResponse } from '../types/CharactersResponse';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const getAllCharactersFromServer = async (page: number): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);

  return response.json();
};

export const getCharacterByIDFromServer = async (id: number) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  return response.json();
};
