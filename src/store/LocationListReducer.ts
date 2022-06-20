/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getFilteredLocationsFromServer, getLocationByIDFromServer, getLocationsFromServer } from '../api/locations';
import { Location } from '../types/Location';

type LocationListReducerState = {
  locations: Location[],
  currentLocation: Location | null,
  filteredLocations: Location[],
  isLocationListLoading: boolean,
  isLocationPageLoading: boolean,
  nextPage: string | null,
  prevPage: string | null,
  pagesCount: number,
  totalLocations: number,
};

const initialState: LocationListReducerState = {
  locations: [],
  currentLocation: null,
  filteredLocations: [],
  isLocationListLoading: false,
  isLocationPageLoading: false,
  nextPage: null,
  prevPage: null,
  pagesCount: 1,
  totalLocations: 0,
};

export const loadPageOfLocationsFromServer = createAsyncThunk(
  'LocationList/loadPageOfLocations',
  async (page: number) => {
    const response = await getLocationsFromServer(page);

    return response;
  },
);

export const loadLocationByIDFromServer = createAsyncThunk(
  'LocationList/loadLocationByID',
  async (id: number) => {
    const response = await getLocationByIDFromServer(id);

    return response;
  },
);

export const loadFilteredLocationsFromServer = createAsyncThunk(
  'LocationList/loadFilteredLocations',
  async (name: string) => {
    const response = await getFilteredLocationsFromServer(name);

    return response;
  },
);

const LocationListReducer = createSlice({
  name: 'LocationListReducer',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location | null>) => {
      state.currentLocation = action.payload;
    },
    setIsLocationListLoading: (state, action: PayloadAction<boolean>) => {
      state.isLocationListLoading = action.payload;
    },
    setIsLocationPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isLocationPageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPageOfLocationsFromServer.fulfilled, (state, action) => {
      state.locations = action.payload.data.locations.results;
      state.nextPage = action.payload.data.locations.info.next;
      state.prevPage = action.payload.data.locations.info.prev;
      state.pagesCount = action.payload.data.locations.info.pages;
      state.totalLocations = action.payload.data.locations.info.count;
      state.isLocationListLoading = false;
    });
    builder.addCase(loadLocationByIDFromServer.fulfilled, (state, action) => {
      state.currentLocation = action.payload.data.location;
      state.isLocationPageLoading = false;
    });
    builder.addCase(loadFilteredLocationsFromServer.fulfilled, (state, action) => {
      if (action.payload.data.locations.results) {
        state.filteredLocations = action.payload.data.locations.results;
      } else {
        state.filteredLocations = [];
      }
    });
  },
});

export const {
  setCurrentLocation,
  setIsLocationListLoading,
  setIsLocationPageLoading,
} = LocationListReducer.actions;

export const LocationSelectors = {
  getLocations: (state: RootState) => {
    return state.LocationListReducer.locations;
  },
  getFilteredLocations: (state: RootState) => {
    return state.LocationListReducer.filteredLocations;
  },
  getCurrentLocation: (state: RootState) => {
    return state.LocationListReducer.currentLocation;
  },
  getIsLocationListLoading: (state: RootState) => {
    return state.LocationListReducer.isLocationListLoading;
  },
  getIsLocationPageLoading: (state: RootState) => {
    return state.LocationListReducer.isLocationPageLoading;
  },
  getNextPage: (state: RootState) => {
    return state.LocationListReducer.nextPage;
  },
  getPrevPage: (state: RootState) => {
    return state.LocationListReducer.prevPage;
  },
  getTotalLocations: (state: RootState) => {
    return state.LocationListReducer.totalLocations;
  },
  getLocationsPagesCount: (state: RootState) => {
    return state.LocationListReducer.pagesCount;
  },
};

export default LocationListReducer.reducer;
