import { queryFetch } from './graphQL';

export const getCharactersFromServer = (page: number) => {
  return queryFetch(`
    query getCharactersPage($page: Int) {
      characters(page: $page) {
        results {
          id
          name
          status
          image
        }
        info {
          count
          pages
          next
          prev
        }
      }
    }
  `, { page });
};

export const getFilteredCharactersFromServer = (
  name: string,
) => {
  return queryFetch(`
  query getFilteredCharacters($name: String) {
    characters(filter: {
      name: $name
    }) {
      results {
        name
        id
      }
    }
  }
  `, { name });
};

export const getCharacterByIDFromServer = (
  id: number,
) => {
  return queryFetch(`
    query getCharacterByID($id: ID!) {
      character(id: $id) {
        name
        image
        species
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          episode
          name
        }
        status
        created
      }
    }
  `, { id });
};
