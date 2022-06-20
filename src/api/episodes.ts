import { queryFetch } from './graphQL';

export const getEpisodesFromServer = async (page: number) => {
  return queryFetch(`
    query getEpisodes($page: Int) {
      episodes(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          episode
        }
      }
    }
  `, { page });
};

export const getEpisodeByIDFromServer = async (id: number) => {
  return queryFetch(`
    query getEpisodeByID($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
        created
      }
    }
  `, { id });
};

export const getFilteredEpisodesFromServer = async (name: string) => {
  return queryFetch(`
    query getFilteredEpisodes($name: String) {
      episodes(filter: {
        name: $name
      }) {
        results {
          id
          name
          episode
        }
      }
    }
  `, { name });
};
