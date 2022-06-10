/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store';

import {
  setCurrentUserDislikedChars,
  setCurrentUserLikedChars,
  loadCharsFromServer,
  selectors,
  setCurrentChar,
  setIsListLoading,
} from '../../store/CharsListReducer';
import { Loader } from '../Loader';
import { ControlPanel } from '../ControlPanel';
import { Pagination } from '../Pagination';

import styles from './CharsList.module.scss';

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

  useEffect(() => {
    dispatch(setIsListLoading(true));
    dispatch(loadCharsFromServer(+page));
  }, []);

  return (
    <>
      <ControlPanel />

      <div className={styles.container}>
        <ul className={styles.charsList}>
          {isListLoading && <Loader size="big" />}
          {chars.map(char => (
            <li
              key={char.id}
              className={styles.item}
              onClick={() => {
                dispatch(setCurrentChar(null));
                navigate(`/list/${char.id}`);
              }}
            >
              <div className={styles.item__infoContainer}>
                <img
                  src={char.image}
                  alt={`${char.name} poster`}
                  className={styles.item__image}
                />

                <h3 className={styles.item__name}>
                  {char.name}
                </h3>

                <p
                  className={classNames(
                    styles.item__status,
                    { [styles.item__status__alive]: char.status === 'Alive' },
                    { [styles.item__status__dead]: char.status === 'Dead' },
                    { [styles.item__status__unknown]: char.status === 'unknown' },
                  )}
                >
                  {char.status}
                </p>
              </div>

              {user && (
                <div className={styles.item__buttons}>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(setCurrentUserLikedChars(char));
                    }}
                    className={classNames(
                      styles.item__button,
                      styles.item__buttonLike,
                      {
                        [styles.item__buttonLikeActive]: likedChars?.some(likedChar => {
                          return likedChar.id === char.id;
                        }),
                      },
                    )}
                  >
                    Like
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(setCurrentUserDislikedChars(char));
                    }}
                    className={classNames(
                      styles.item__button,
                      styles.item__buttonDislike,
                      {
                        [styles.item__buttonDislikeActive]: dislikedChars?.some(dislikedChar => {
                          return dislikedChar.id === char.id;
                        }),
                      },
                    )}
                  >
                    Dislike
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
