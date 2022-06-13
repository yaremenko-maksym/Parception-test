/* eslint-disable no-console */
import { CharactersResponse } from '../types/CharactersResponse';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const getPageOfCharactersFromServer = async (
  page: number,
): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export const getCharacterByIDFromServer = async (id: number) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  return response.json();
};

export const getFilteredCharactersFromServer = async (
  query: string,
): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character/?name=${query}`);

  return response.json();
};
