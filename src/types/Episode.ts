/* eslint-disable import/no-cycle */
import { Character } from './Character';

export type Episode = {
  id: number | string,
  name: string,
  air_date: string,
  episode: string,
  characters: Character[],
  created: string,
};
