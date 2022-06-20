import { queryFetch } from './graphQL';

export const getLocationsFromServer = async (page: number) => {
  return queryFetch(`
    query getLocations($page: Int) {
      locations(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          type
          dimension
        }
      }
    }
  `, { page });
};

export const getLocationByIDFromServer = (id: number) => {
  return queryFetch(`
    query getLocationByID($id: ID!) {
      location(id: $id) {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
        created
      }
    }
  `, { id });
};

export const getFilteredLocationsFromServer = (
  name: string,
) => {
  return queryFetch(`
    query getFilteredLocations($name: String) {
      locations(filter: {
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
