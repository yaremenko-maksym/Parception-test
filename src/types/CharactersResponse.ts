import { Character } from './Character';
import { PageInfo } from './PageInfo';

export interface CharactersResponse {
  info: PageInfo,
  results: Character[],
}
