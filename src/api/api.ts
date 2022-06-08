import { CharactersResponse } from '../types/CharactersResponse';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const getAllCharactersFromServer = async (): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character`);

  return response.json();
};
