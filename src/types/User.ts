import { Character } from './Character';
import { Episode } from './Episode';
import { Location } from './Location';

export interface User {
  name: string,
  image: string,
  userID: string,
  likedChars: {
    [key: string]: Character,
  },
  dislikedChars: {
    [key: string]: Character,
  },
  likedLocations: {
    [key: string]: Location,
  }
  dislikedLocations: {
    [key: string]: Location,
  }
  likedEpisodes: {
    [key: string]: Episode,
  }
  dislikedEpisodes: {
    [key: string]: Episode,
  }
}
