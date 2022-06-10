export interface Character {
  id: number,
  name: string,
  status: string,
  species: 'Alive' | 'Dead' | 'unknown',
  type: string,
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown',
  origin: {
    name: string,
    url: string,
  },
  location: {
    name: string,
    url: string,
  },
  image: string,
  episode: string[],
  url: string,
  created: string,
}
