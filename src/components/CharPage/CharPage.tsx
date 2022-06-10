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
import { GoBack } from '../GoBackButton';
import { urlValidator } from '../../functions/URLValidator';

import styles from './CharPage.module.scss';

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
  }, []);

  return (
    <div className={styles.container}>
      <GoBack />

      {isCharPageLoading && <Loader size="big" />}

      {currentChar && (
        <div className={styles.card}>
          <h2 className={styles.card__title}>
            {currentChar.name}
          </h2>

          <img
            src={currentChar.image}
            alt={`${currentChar.name} poster`}
            className={styles.card__image}
          />

          {user && (
            <div className={styles.changePhoto}>
              {isPhotoChangeInputVisible ? (
                <>
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={({ target }) => {
                      setIsURLValid(true);
                      setNewPhotoUrl(target.value);
                    }}
                    placeholder="Image URL..."
                    className={styles.changePhoto__input}
                  />

                  {!isURLValid && (
                    <p className={styles.changePhoto__error}>*Invalid url</p>
                  )}

                  <button
                    type="submit"
                    onClick={(event) => {
                      handleNewImgUpload(event);
                    }}
                    className={styles.changePhoto__button}
                  >
                    Apply Change
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPhotoChangeInputVisible(true)}
                  className={styles.changePhoto__button}
                >
                  Change Photo
                </button>
              )}
            </div>
          )}

          <p className={styles.card__species}>
            {currentChar.species}
          </p>

          <p className={styles.card__gender}>
            {currentChar.gender}
          </p>

          <p className={styles.card__location}>
            {'Location: '}
            <a
              href={currentChar.location.url}
              className={styles.card__locationLink}
            >
              {currentChar.location.name}
            </a>
          </p>

          <ul className={styles.card__episodeList}>
            {'Episodes: '}
            {currentChar.episode.map(link => (
              <li
                key={link}
                className={styles.card__episodeListItem}
              >
                <a href={link} className={styles.card__episodeListItemLink}>
                  {link.split('/')[5]}
                </a>
              </li>
            ))}
          </ul>

          <p
            className={classNames(
              styles.card__status,
              { [styles.card__status__alive]: currentChar.status === 'Alive' },
              { [styles.card__status__dead]: currentChar.status === 'Dead' },
              { [styles.card__status__unknown]: currentChar.status === 'unknown' },
            )}
          >
            {currentChar.status}
          </p>

          <p className={styles.card__created}>
            {`Created date: ${currentCharDate?.day}.${currentCharDate?.month}.${currentCharDate?.year}`}
          </p>
        </div>
      )}
    </div>
  );
});
