/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getAllCharactersFromServer, getCharacterByIDFromServer, getFilteredCharactersFromServer } from '../api/api';
import { Character } from '../types/Character';
import { User } from '../types/User';

interface CharsListState {
  chars: Character[],
  currentChar: Character | null,
  filteredCharacters: Character[],
  nameQuery: string,
  isListLoading: boolean,
  isCharPageLoading: boolean,
  nextPage: string | null,
  prevPage: string | null,
  user: User | null,
  pagesCount: number,
  totalChars: number,
}

const initialState: CharsListState = {
  chars: [],
  currentChar: null,
  filteredCharacters: [],
  nameQuery: '',
  isListLoading: false,
  isCharPageLoading: false,
  nextPage: null,
  prevPage: null,
  user: null,
  pagesCount: 1,
  totalChars: 0,
};

export const loadCharsFromServer = createAsyncThunk(
  'CharsList/loadChars',
  async (page: number) => {
    const response = await getAllCharactersFromServer(page);

    return response;
  },
);

export const loadCharByIDFromServer = createAsyncThunk(
  'CharsList/loadCharByID',
  async (id: number) => {
    const response = await getCharacterByIDFromServer(id);

    return response;
  },
);

export const loadFilteredCharactersFromServer = createAsyncThunk(
  'CharsList/loadFilteredCharacters',
  async (query: string) => {
    const response = await getFilteredCharactersFromServer(query);

    return response;
  },
);

const CharsListReducer = createSlice({
  name: 'CharsListReducer',
  initialState,
  reducers: {
    setCurrentChar: (state, action: PayloadAction<Character | null>) => {
      state.currentChar = action.payload;
    },
    setIsListLoading: (state, action: PayloadAction<boolean>) => {
      state.isListLoading = action.payload;
    },
    setIsCharPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isCharPageLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setCurrentUserLikedChars: (state, action: PayloadAction<Character>) => {
      if (state.user) {
        if (state.user.likedChars?.some(char => char.id === action.payload.id)) {
          state.user.likedChars = state.user?.likedChars.filter(char => {
            return char.id !== action.payload.id;
          });
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.likedChars?.push(action.payload);
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user?.dislikedChars.some(char => char.id === action.payload.id)) {
          state.user.dislikedChars = state.user?.dislikedChars.filter(char => {
            return char.id !== action.payload.id;
          });
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserDislikedChars: (state, action: PayloadAction<Character>) => {
      if (state.user) {
        if (state.user?.dislikedChars.some(char => char.id === action.payload.id)) {
          state.user.dislikedChars = state.user?.dislikedChars.filter(char => {
            return char.id !== action.payload.id;
          });
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.dislikedChars?.push(action.payload);
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user?.likedChars.some(char => char.id === action.payload.id)) {
          state.user.likedChars = state.user?.likedChars.filter(char => {
            return char.id !== action.payload.id;
          });
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
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
    builder.addCase(loadCharsFromServer.fulfilled, (state, action) => {
      state.chars = action.payload.results;
      state.nextPage = action.payload.info.next;
      state.prevPage = action.payload.info.prev;
      state.pagesCount = action.payload.info.pages;
      state.totalChars = action.payload.info.count;
      state.isListLoading = false;
    });
    builder.addCase(loadCharByIDFromServer.fulfilled, (state, action) => {
      state.currentChar = action.payload;
      state.isCharPageLoading = false;
    });
    builder.addCase(loadFilteredCharactersFromServer.fulfilled, (state, action) => {
      if (action.payload.results) {
        state.filteredCharacters = action.payload.results;
      } else {
        state.filteredCharacters = [];
      }
    });
  },
});

export const {
  setIsListLoading,
  setIsCharPageLoading,
  setCurrentChar,
  setUser,
  setCurrentUserLikedChars,
  setCurrentUserDislikedChars,
  setCurrentCharPhoto,
  setCurrentQuery,
} = CharsListReducer.actions;

export default CharsListReducer.reducer;

export const selectors = {
  getChars: (state: RootState) => {
    return state.CharsListReducer.chars;
  },
  getLikedChars: (state: RootState) => {
    return state.CharsListReducer.user?.likedChars;
  },
  getFilteredCharacters: (state: RootState) => {
    return state.CharsListReducer.filteredCharacters;
  },
  getDislikedChars: (state: RootState) => {
    return state.CharsListReducer.user?.dislikedChars;
  },
  getCurrentChar: (state: RootState) => {
    return state.CharsListReducer.currentChar;
  },
  getIsListLoading: (state: RootState) => {
    return state.CharsListReducer.isListLoading;
  },
  getIsCharPageLoading: (state: RootState) => {
    return state.CharsListReducer.isCharPageLoading;
  },
  getNextPage: (state: RootState) => {
    return state.CharsListReducer.nextPage;
  },
  getPrevPage: (state: RootState) => {
    return state.CharsListReducer.prevPage;
  },
  getUser: (state: RootState) => {
    return state.CharsListReducer.user;
  },
  getTotalChars: (state: RootState) => {
    return state.CharsListReducer.totalChars;
  },
  getPagesCount: (state: RootState) => {
    return state.CharsListReducer.pagesCount;
  },
  getNameQuery: (state: RootState) => {
    return state.CharsListReducer.nameQuery;
  },
};
