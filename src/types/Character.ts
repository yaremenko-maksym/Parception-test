/* eslint-disable import/no-cycle */
import { Episode } from './Episode';
import { Location } from './Location';

export interface Character {
  id: number | string,
  name: string,
  status: 'Alive' | 'Dead' | 'unknown',
  species: string,
  type: string,
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown',
  origin: Location,
  location: Location,
  image: string,
  episode: Episode[],
  created: string,
}
