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
  setUser,
} from '../../store/CharsListReducer';
import { GoBack } from '../GoBackButton';

import styles from './MyProfilePage.module.scss';

export const MyProfilePage: React.FC = memo(() => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const likedChars = useAppSelector(selectors.getLikedChars);
  const dislikedChars = useAppSelector(selectors.getDislikedChars);

  return (
    <>
      <GoBack />

      <div className={styles.wrapper}>

        <div className={styles.container}>
          <h2 className={styles.charsList__title}>
            Liked Chars List:
          </h2>
          {likedChars?.length ? (
            <ul className={styles.charsList}>
              {likedChars.map(char => (
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
                          [styles.item__buttonLikeActive]: likedChars.some(likedChar => {
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
                </li>
              ))}
            </ul>
          ) : (
            <i>No liked characters yet</i>
          )}

        </div>

        <div className={styles.container}>
          <h2 className={styles.charsList__title}>
            Disliked Chars List:
          </h2>
          {dislikedChars?.length ? (
            <ul className={styles.charsList}>
              {dislikedChars.map(char => (
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
                          [styles.item__buttonDislikeActive]: dislikedChars.some(dislikedChar => {
                            return dislikedChar.id === char.id;
                          }),
                        },
                      )}
                    >
                      Dislike
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
      <button
        type="button"
        onClick={() => {
          dispatch(setUser(null));
          navigate('/list');
        }}
        className={styles.logOut}
      >
        Log Out
      </button>
    </>
  );
});
