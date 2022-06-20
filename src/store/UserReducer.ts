/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Character } from '../types/Character';
import { Episode } from '../types/Episode';
import { Location } from '../types/Location';
import { User } from '../types/User';

type UserReducerState = {
  user: User | null,
};

const initialState: UserReducerState = {
  user: null,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setCurrentUserLikedChars: (state, action: PayloadAction<Character>) => {
      if (state.user) {
        if (state.user.likedChars[action.payload.id]) {
          delete state.user.likedChars[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.likedChars[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.dislikedChars[action.payload.id]) {
          delete state.user.dislikedChars[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserDislikedChars: (state, action: PayloadAction<Character>) => {
      if (state.user) {
        if (state.user.dislikedChars[action.payload.id]) {
          delete state.user.dislikedChars[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.dislikedChars[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.likedChars[action.payload.id]) {
          delete state.user.likedChars[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserLikedLocations: (state, action: PayloadAction<Location>) => {
      if (state.user) {
        if (state.user.likedLocations[action.payload.id]) {
          delete state.user.likedLocations[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.likedLocations[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.dislikedLocations[action.payload.id]) {
          delete state.user.dislikedLocations[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserDislikedLocations: (state, action: PayloadAction<Location>) => {
      if (state.user) {
        if (state.user.dislikedLocations[action.payload.id]) {
          delete state.user.dislikedLocations[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.dislikedLocations[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.likedLocations[action.payload.id]) {
          delete state.user.likedLocations[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserLikedEpisodes: (state, action: PayloadAction<Episode>) => {
      if (state.user) {
        if (state.user.likedEpisodes[action.payload.id]) {
          delete state.user.likedEpisodes[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.likedEpisodes[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.dislikedEpisodes[action.payload.id]) {
          delete state.user.dislikedEpisodes[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
    setCurrentUserDislikedEpisodes: (state, action: PayloadAction<Episode>) => {
      if (state.user) {
        if (state.user.dislikedEpisodes[action.payload.id]) {
          delete state.user.dislikedEpisodes[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        } else {
          state.user.dislikedEpisodes[action.payload.id] = action.payload;
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }

        if (state.user.likedEpisodes[action.payload.id]) {
          delete state.user.likedEpisodes[action.payload.id];
          localStorage.removeItem(state.user.userID);
          localStorage.setItem(state.user.userID, JSON.stringify(state.user));
        }
      }
    },
  },
});

export const {
  setUser,
  setCurrentUserLikedChars,
  setCurrentUserDislikedChars,
  setCurrentUserLikedLocations,
  setCurrentUserDislikedLocations,
  setCurrentUserLikedEpisodes,
  setCurrentUserDislikedEpisodes,
} = UserReducer.actions;

export const UserSelectors = {
  getUser: (state: RootState) => {
    return state.UserReducer.user;
  },
  getLikedChars: (state: RootState) => {
    return state.UserReducer.user?.likedChars || {};
  },
  getDislikedChars: (state: RootState) => {
    return state.UserReducer.user?.dislikedChars || {};
  },
  getLikedLocations: (state: RootState) => {
    return state.UserReducer.user?.likedLocations || {};
  },
  getDislikedLocations: (state: RootState) => {
    return state.UserReducer.user?.dislikedLocations || {};
  },
  getLikedEpisodes: (state: RootState) => {
    return state.UserReducer.user?.likedEpisodes || {};
  },
  getDislikedEpisodes: (state: RootState) => {
    return state.UserReducer.user?.dislikedEpisodes || {};
  },
};

export default UserReducer.reducer;
