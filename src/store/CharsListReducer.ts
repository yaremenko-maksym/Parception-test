/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getAllCharactersFromServer } from '../api/api';
import { Character } from '../types/Character';

interface CharsListState {
  chars: Character[],
}

const initialState: CharsListState = {
  chars: [],
};

export const loadCharsFromServer = createAsyncThunk(
  'CharsList/loadChars',
  async () => {
    const response = await getAllCharactersFromServer();

    return response;
  },
);

const CharsListReducer = createSlice({
  name: 'CharsListReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCharsFromServer.fulfilled, (state, action) => {
      state.chars = action.payload.results;
    });
  },
});

export default CharsListReducer.reducer;

export const selectors = {
  getChars: (state: RootState) => {
    return state.CharsListReducer.chars;
  },
};
