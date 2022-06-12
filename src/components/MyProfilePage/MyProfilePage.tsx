/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setCurrentUserDislikedChars,
  setCurrentUserLikedChars,
  selectors,
  setCurrentChar,
} from '../../store/CharsListReducer';

import './MyProfilePage.scss';

export const MyProfilePage: React.FC = memo(() => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const likedChars = useAppSelector(selectors.getLikedChars);
  const dislikedChars = useAppSelector(selectors.getDislikedChars);

  return (
    <div className="container">
      <div className="d-flex gap-3 flex-column flex-md-row">
        <div className="bg-dark favoriteList-container">
          <h2 className="text-light">
            Liked Chars List:
          </h2>
          {likedChars?.length ? (
            <ul className="list-group list-group-light list-container clickable">
              {likedChars.map(char => (
                <li
                  key={char.id}
                  className="
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
                </li>
              ))}
            </ul>
          ) : (
            <i>No liked characters yet</i>
          )}
        </div>

        <div className="bg-dark favoriteList-container">
          <h2 className="text-light">
            Disliked Chars List:
          </h2>
          {dislikedChars?.length ? (
            <ul className="list-group list-group-light list-container clickable">
              {dislikedChars.map(char => (
                <li
                  key={char.id}
                  className="
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
                </li>
              ))}
            </ul>
          ) : (
            <i>No disliked characters yet</i>
          )}
        </div>
      </div>
    </div>
  );
});
