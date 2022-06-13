/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store';

import {
  setCurrentUserDislikedChars,
  setCurrentUserLikedChars,
  loadPageOfCharsFromServer,
  selectors,
  setCurrentChar,
  setIsListLoading,
} from '../../store/CharsListReducer';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';

import './CharsList.scss';

export const CharsList: React.FC = memo(() => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(useLocation().search);
  const page = searchParams.get('page') || 1;

  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectors.getChars);
  const likedChars = useAppSelector(selectors.getLikedChars);
  const dislikedChars = useAppSelector(selectors.getDislikedChars);
  const isListLoading = useAppSelector(selectors.getIsListLoading);
  const user = useAppSelector(selectors.getUser);
  const maxPages = useAppSelector(selectors.getPagesCount);

  useEffect(() => {
    dispatch(setIsListLoading(true));

    if (+page > maxPages || +page < 1 || Number.isNaN(+page)) {
      navigate('/list/?page=1');

      return;
    }

    dispatch(loadPageOfCharsFromServer(+page));
  }, [page]);

  return (
    <>
      <div className="container bg-dark">
        <ul className="list-group list-group-light list-container">
          {isListLoading && <Loader size="big" />}
          {chars.map(char => (
            <li
              key={char.id}
              className="
                clickable
                bg-dark
                char
                list-group-item
                d-flex
                flex-md-row
                flex-column
                justify-space-between
                align-items-start
                align-items-md-center
                border-success"
              onClick={() => {
                dispatch(setCurrentChar(null));
                navigate(`/list/${char.id}`);
              }}
            >
              <div
                className="ms-2 me-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center"
                style={{ gap: '20px' }}
              >
                <img
                  src={char.image}
                  alt={`${char.name} poster`}
                  className="img-fluid rounded shadow-3 char__image"
                />

                <h3 className="fw-bold text-light">
                  {char.name}
                </h3>

                <p
                  className={classNames(
                    'badge rounded-pill badge-light',
                    { 'text-success': char.status === 'Alive' },
                    { 'text-danger': char.status === 'Dead' },
                    { 'text-warning': char.status === 'unknown' },
                  )}
                >
                  {char.status}
                </p>
              </div>

              {user && (
                <div className="
                  btn-group
                  me-2
                  ms-2
                  d-flex
                  justify-content-end
                  align-items-center"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(setCurrentUserLikedChars(char));
                    }}
                    className={classNames(
                      'btn btn-light btn-floating',
                      {
                        'bg-success': likedChars?.some(likedChar => {
                          return likedChar.id === char.id;
                        }),
                      },
                    )}
                  >
                    <i className="fas fa-thumbs-up"></i>
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(setCurrentUserDislikedChars(char));
                    }}
                    className={classNames(
                      'btn btn-light btn-floating',
                      {
                        'bg-danger': dislikedChars?.some(dislikedChar => {
                          return dislikedChar.id === char.id;
                        }),
                      },
                    )}
                  >
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Pagination />
    </>
  );
});
