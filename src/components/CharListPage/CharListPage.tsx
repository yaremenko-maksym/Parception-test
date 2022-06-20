/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';

import {
  loadPageOfCharsFromServer,
  CharsSelectors,
  setIsCharListLoading,
} from '../../store/CharsListReducer';
import { Pagination } from '../Pagination';

import './CharListPage.scss';
import { CharsList } from '../CharsList';
import { Loader } from '../Loader';

export const CharListPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || 1;

  const dispatch = useAppDispatch();
  const chars = useAppSelector(CharsSelectors.getChars);
  const maxPages = useAppSelector(CharsSelectors.getCharsPagesCount);
  const isListLoading = useAppSelector(CharsSelectors.getIsCharListLoading);

  useEffect(() => {
    dispatch(setIsCharListLoading(true));

    if (+page > maxPages || +page < 1 || Number.isNaN(+page)) {
      navigate('/characters/?page=1');

      return;
    }

    dispatch(loadPageOfCharsFromServer(+page));
  }, [location]);

  return (
    <>
      <div className="container p-2 rounded-6 bg-dark list-container">
        {isListLoading && <Loader size="big" />}
        <CharsList charsArray={chars} />
      </div>

      <Pagination />
    </>
  );
});
