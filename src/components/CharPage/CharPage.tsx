/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  loadCharByIDFromServer,
  CharsSelectors,
  setCurrentCharPhoto,
  setIsCharPageLoading,
} from '../../store/CharsListReducer';

import { Loader } from '../Loader';
import { urlValidator } from '../../functions/URLValidator';

import './CharPage.scss';
import { UserSelectors } from '../../store/UserReducer';

export const CharPage: React.FC = memo(() => {
  const { charID } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isPhotoChangeInputVisible, setIsPhotoChangeInputVisible] = useState(false);
  const [isURLValid, setIsURLValid] = useState(true);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const currentChar = useAppSelector(CharsSelectors.getCurrentChar);
  const isCharPageLoading = useAppSelector(CharsSelectors.getIsCharPageLoading);
  const user = useAppSelector(UserSelectors.getUser);
  const totalChars = useAppSelector(CharsSelectors.getTotalChars);

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
    setNewPhotoUrl('');
    dispatch(setCurrentCharPhoto(newPhotoUrl));
  }, [newPhotoUrl]);

  useEffect(() => {
    if (charID) {
      dispatch(setIsCharPageLoading(true));

      if (totalChars !== 0
        && (+charID > totalChars || +charID < 0 || Number.isNaN(+charID))) {
        navigate('/characters');

        return;
      }

      dispatch(loadCharByIDFromServer(+charID));
    }
  }, [charID, totalChars]);

  return (
    <div className="container charPage-container bg-dark">
      {isCharPageLoading && <Loader size="big" />}

      {currentChar && (
        <div className="d-flex flex-column">
          <div>
            <h2 className="display-3 text-light mb-5 border-bottom border-success">
              {currentChar.name}
            </h2>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className="me-3">
              <img
                src={currentChar.image}
                alt={`${currentChar.name} poster`}
                className="img-thumbnail char-image"
              />

              {user && (
                <div>
                  {isPhotoChangeInputVisible ? (
                    <div className="d-flex flex-column">
                      <input
                        type="text"
                        value={newPhotoUrl}
                        onChange={({ target }) => {
                          setNewPhotoUrl(target.value);
                          setIsURLValid(true);
                        }}
                        placeholder="Image URL..."
                        className="form-control mb-1"
                      />

                      {!isURLValid && (
                        <p className="form-helper text-danger">*Invalid url</p>
                      )}

                      <button
                        type="submit"
                        onClick={handleNewImgUpload}
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
                {'Last known location: '}
                {currentChar.location.name !== 'unknown'
                  ? (
                    <Link
                      to={`/locations/${currentChar.location.id}`}
                      className="text-success"
                    >
                      {currentChar.location.name}
                    </Link>
                  )
                  : (
                    <span className="text-warning">
                      {currentChar.location.name}
                    </span>
                  )}
              </h3>

              <h3 className="text-light">
                {'Origin location: '}
                {currentChar.origin.name !== 'unknown'
                  ? (
                    <Link
                      to={`/locations/${currentChar.origin.id}`}
                      className="text-success"
                    >
                      {currentChar.origin.name}
                    </Link>
                  )
                  : (
                    <span className="text-warning">
                      {currentChar.origin.name}
                    </span>
                  )}
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
                {currentChar.episode.map(episode => (
                  <li
                    key={episode.id}
                    className="dropdown-item"
                    onClick={() => {
                      navigate(`/episodes/${episode.id}`);
                    }}
                  >
                    <b className="text-success">
                      {`${episode.episode}: `}
                    </b>
                    {episode.name}
                  </li>
                ))}
              </ul>

              <h3 className="text-light">
                {'Status: '}
                <span
                  className={classNames(
                    { 'text-success': currentChar.status === 'Alive' },
                    { 'text-danger': currentChar.status === 'Dead' },
                    { 'text-warning': currentChar.status === 'unknown' },
                  )}
                >
                  {currentChar.status}
                </span>
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
