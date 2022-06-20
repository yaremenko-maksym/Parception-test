/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getCharacterByIDFromServer, getCharactersFromServer, getFilteredCharactersFromServer } from '../api/characters';
import { Character } from '../types/Character';

interface CharListState {
  chars: Character[],
  currentChar: Character | null,
  filteredCharacters: Character[],
  nameQuery: string,
  isCharListLoading: boolean,
  isCharPageLoading: boolean,
  nextPage: string | null,
  prevPage: string | null,
  pagesCount: number,
  totalChars: number,
}

const initialState: CharListState = {
  chars: [],
  currentChar: null,
  filteredCharacters: [],
  nameQuery: '',
  isCharListLoading: false,
  isCharPageLoading: false,
  nextPage: null,
  prevPage: null,
  pagesCount: 1,
  totalChars: 0,
};

export const loadPageOfCharsFromServer = createAsyncThunk(
  'CharList/loadPageOfChars',
  async (page: number) => {
    try {
      const response = await getCharactersFromServer(page);

      return response;
    } catch {
      return 'Error';
    }
  },
);

export const loadCharByIDFromServer = createAsyncThunk(
  'CharList/loadCharPageByID',
  async (id: number) => {
    const response = await getCharacterByIDFromServer(id);

    return response;
  },
);

export const loadFilteredCharactersFromServer = createAsyncThunk(
  'CharList/loadFilteredCharacters',
  async (name: string) => {
    const response = await getFilteredCharactersFromServer(name);

    return response;
  },
);

const CharListReducer = createSlice({
  name: 'CharListReducer',
  initialState,
  reducers: {
    setCurrentChar: (state, action: PayloadAction<Character | null>) => {
      state.currentChar = action.payload;
    },
    setIsCharListLoading: (state, action: PayloadAction<boolean>) => {
      state.isCharListLoading = action.payload;
    },
    setIsCharPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isCharPageLoading = action.payload;
    },
    setCurrentCharPhoto: (state, action: PayloadAction<string>) => {
      if (state.currentChar) {
        state.currentChar.image = action.payload;
      }
    },
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.nameQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPageOfCharsFromServer.fulfilled, (state, action) => {
      if (action.payload === 'Error') {
        state.chars = [];
        state.nextPage = null;
        state.prevPage = null;
        state.pagesCount = 1;
        state.totalChars = 0;
        state.isCharListLoading = false;

        return;
      }

      state.chars = action.payload.data.characters.results;
      state.nextPage = action.payload.data.characters.info.next;
      state.prevPage = action.payload.data.characters.info.prev;
      state.pagesCount = action.payload.data.characters.info.pages;
      state.totalChars = action.payload.data.characters.info.count;
      state.isCharListLoading = false;
    });
    builder.addCase(loadCharByIDFromServer.fulfilled, (state, action) => {
      state.currentChar = action.payload.data.character;
      state.isCharPageLoading = false;
    });
    builder.addCase(loadFilteredCharactersFromServer.fulfilled, (state, action) => {
      if (action.payload.data.characters.results) {
        state.filteredCharacters = action.payload.data.characters.results;
      } else {
        state.filteredCharacters = [];
      }
    });
  },
});

export const {
  setIsCharListLoading,
  setIsCharPageLoading,
  setCurrentChar,
  setCurrentCharPhoto,
  setCurrentQuery,
} = CharListReducer.actions;

export default CharListReducer.reducer;

export const CharsSelectors = {
  getChars: (state: RootState) => {
    return state.CharListReducer.chars;
  },
  getFilteredCharacters: (state: RootState) => {
    return state.CharListReducer.filteredCharacters;
  },
  getCurrentChar: (state: RootState) => {
    return state.CharListReducer.currentChar;
  },
  getIsCharListLoading: (state: RootState) => {
    return state.CharListReducer.isCharListLoading;
  },
  getIsCharPageLoading: (state: RootState) => {
    return state.CharListReducer.isCharPageLoading;
  },
  getNextPage: (state: RootState) => {
    return state.CharListReducer.nextPage;
  },
  getPrevPage: (state: RootState) => {
    return state.CharListReducer.prevPage;
  },
  getTotalChars: (state: RootState) => {
    return state.CharListReducer.totalChars;
  },
  getCharsPagesCount: (state: RootState) => {
    return state.CharListReducer.pagesCount;
  },
  getNameQuery: (state: RootState) => {
    return state.CharListReducer.nameQuery;
  },
};
