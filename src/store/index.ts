/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import CharListReducer from './CharsListReducer';
import LocationListReducer from './LocationListReducer';
import EpisodeListReducer from './EpisodeListReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  CharListReducer,
  LocationListReducer,
  EpisodeListReducer,
  UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
