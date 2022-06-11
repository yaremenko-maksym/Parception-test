/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  loadCharByIDFromServer,
  selectors,
  setCurrentCharPhoto,
  setIsCharPageLoading,
} from '../../store/CharsListReducer';

import { Loader } from '../Loader';
import { urlValidator } from '../../functions/URLValidator';

import './CharPage.scss';

export const CharPage: React.FC = memo(() => {
  const { charID } = useParams();

  const dispatch = useAppDispatch();

  const [isPhotoChangeInputVisible, setIsPhotoChangeInputVisible] = useState(false);
  const [isURLValid, setIsURLValid] = useState(true);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const currentChar = useAppSelector(selectors.getCurrentChar);
  const isCharPageLoading = useAppSelector(selectors.getIsCharPageLoading);
  const user = useAppSelector(selectors.getUser);

  const currentCharDate = useMemo(() => {
    if (currentChar) {
      const date = new Date(currentChar.created);

      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }

    return null;
  }, [currentChar]);

  const handleNewImgUpload = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!urlValidator(newPhotoUrl)) {
      setIsURLValid(false);

      return;
    }

    setIsURLValid(true);
    setIsPhotoChangeInputVisible(false);
    dispatch(setCurrentCharPhoto(newPhotoUrl));
  }, []);

  useEffect(() => {
    if (charID) {
      dispatch(setIsCharPageLoading(true));
      dispatch(loadCharByIDFromServer(+charID));
    }
  }, [charID]);

  return (
    <div className="container charPage-container bg-dark">
      {isCharPageLoading && <Loader size="big" />}

      {currentChar && (
        <div className="d-flex flex-column">
          <div>
            <h2 className="text-light">
              {currentChar.name}
            </h2>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className="me-3">
              <img
                src={currentChar.image}
                alt={`${currentChar.name} poster`}
                className="img-thumbnail"
              />

              {user && (
                <div>
                  {isPhotoChangeInputVisible ? (
                    <div className="d-flex flex-column">
                      <input
                        type="text"
                        value={newPhotoUrl}
                        onChange={({ target }) => {
                          setIsURLValid(true);
                          setNewPhotoUrl(target.value);
                        }}
                        placeholder="Image URL..."
                        className="form-control mb-1"
                      />

                      {!isURLValid && (
                        <p className="form-helper text-danger">*Invalid url</p>
                      )}

                      <button
                        type="submit"
                        onClick={(event) => {
                          handleNewImgUpload(event);
                        }}
                        className="text-light btn btn-success mb-1"
                      >
                        Apply Change
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsPhotoChangeInputVisible(false);
                        }}
                        className="text-light btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <i
                      className="fas fa-camera-retro fa-2x text-success clickable"
                      onClick={() => setIsPhotoChangeInputVisible(true)}
                    >
                    </i>
                  )}
                </div>
              )}
            </div>

            <div className="d-flex flex-column info">
              <h3 className="text-light">
                {currentChar.species}
              </h3>

              <h3 className="text-light">
                {currentChar.gender}
              </h3>

              <h3 className="text-light">
                {'Location: '}
                {currentChar.location.name}
              </h3>

              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                Episodes
              </button>
              <ul
                className="dropdown-menu my-dropdown"
              >
                {currentChar.episode.map(link => (
                  <li
                    key={link}
                    className="dropdown-item"
                  >
                    {link.split('/')[5]}
                  </li>
                ))}
              </ul>

              <h3 className={classNames(
                { 'text-success': currentChar.status === 'Alive' },
                { 'text-danger': currentChar.status === 'Dead' },
                { 'text-warning': currentChar.status === 'unknown' },
              )}
              >
                {currentChar.status}
              </h3>

              <h3 className="text-light">
                {`Created date: ${currentCharDate?.day}.${currentCharDate?.month}.${currentCharDate?.year}`}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
