/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

import { getEpisodeByIDFromServer, getEpisodesFromServer, getFilteredEpisodesFromServer } from '../api/episodes';

import { Episode } from '../types/Episode';

type EpisodeListState = {
  episodes: Episode[],
  currentEpisode: Episode | null,
  filteredEpisodes: Episode[],
  isEpisodeListLoading: boolean,
  isEpisodePageLoading: boolean,
  nextPage: string | null,
  prevPage: string | null,
  pagesCount: number,
  totalEpisodes: number,
};

const initialState: EpisodeListState = {
  episodes: [],
  currentEpisode: null,
  filteredEpisodes: [],
  isEpisodeListLoading: false,
  isEpisodePageLoading: false,
  nextPage: null,
  prevPage: null,
  pagesCount: 1,
  totalEpisodes: 0,
};

export const loadPageOfEpisodesFromServer = createAsyncThunk(
  'EpisodeList/loadPageOfEpisodes',
  async (page: number) => {
    const response = await getEpisodesFromServer(page);

    return response;
  },
);

export const loadEpisodeByIDFromServer = createAsyncThunk(
  'EpisodeList/loadEpisodeByID',
  async (id: number) => {
    const response = await getEpisodeByIDFromServer(id);

    return response;
  },
);

export const loadFilteredEpisodesFromServer = createAsyncThunk(
  'LocationList/loadFilteredEpisodes',
  async (name: string) => {
    const response = await getFilteredEpisodesFromServer(name);

    return response;
  },
);

const EpisodeListReducer = createSlice({
  name: 'EpisodeListReducer',
  initialState,
  reducers: {
    setCurrentEpisode: (state, action: PayloadAction<Episode| null>) => {
      state.currentEpisode = action.payload;
    },
    setIsEpisodeListLoading: (state, action: PayloadAction<boolean>) => {
      state.isEpisodeListLoading = action.payload;
    },
    setIsEpisodePageLoading: (state, action: PayloadAction<boolean>) => {
      state.isEpisodeListLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPageOfEpisodesFromServer.fulfilled, (state, action) => {
      state.episodes = action.payload.data.episodes.results;
      state.nextPage = action.payload.data.episodes.info.next;
      state.prevPage = action.payload.data.episodes.info.prev;
      state.pagesCount = action.payload.data.episodes.info.pages;
      state.totalEpisodes = action.payload.data.episodes.info.count;
      state.isEpisodeListLoading = false;
    });
    builder.addCase(loadEpisodeByIDFromServer.fulfilled, (state, action) => {
      state.currentEpisode = action.payload.data.episode;
      state.isEpisodePageLoading = false;
    });
    builder.addCase(loadFilteredEpisodesFromServer.fulfilled, (state, action) => {
      if (action.payload.data.episodes.results) {
        state.filteredEpisodes = action.payload.data.episodes.results;
      } else {
        state.filteredEpisodes = [];
      }
    });
  },
});

export const {
  setCurrentEpisode,
  setIsEpisodeListLoading,
  setIsEpisodePageLoading,
} = EpisodeListReducer.actions;

export const EpisodeSelectors = {
  getEpisodes: (state: RootState) => {
    return state.EpisodeListReducer.episodes;
  },
  getFilteredEpisodes: (state: RootState) => {
    return state.EpisodeListReducer.filteredEpisodes;
  },
  getCurrentEpisode: (state: RootState) => {
    return state.EpisodeListReducer.currentEpisode;
  },
  getIsEpisodeListLoading: (state: RootState) => {
    return state.EpisodeListReducer.isEpisodeListLoading;
  },
  getIsEpisodePageLoading: (state: RootState) => {
    return state.EpisodeListReducer.isEpisodePageLoading;
  },
  getNextPage: (state: RootState) => {
    return state.EpisodeListReducer.nextPage;
  },
  getPrevPage: (state: RootState) => {
    return state.EpisodeListReducer.prevPage;
  },
  getTotalEpisodes: (state: RootState) => {
    return state.EpisodeListReducer.totalEpisodes;
  },
  getEpisodesPageCount: (state: RootState) => {
    return state.EpisodeListReducer.pagesCount;
  },
};

export default EpisodeListReducer.reducer;
