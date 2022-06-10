import { Character } from './Character';

export interface User {
  name: string,
  image: string,
  userID: string,
  likedChars: Character[],
  dislikedChars: Character[],
}
