/* eslint-disable import/no-cycle */
import { Character } from './Character';

export type Location = {
  id: number | string
  name: string
  type: string
  dimension: string
  residents: Character[]
  created: string
};
