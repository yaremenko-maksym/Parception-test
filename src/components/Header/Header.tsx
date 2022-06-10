/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import styles from './Header.module.scss';

import { FacebookResponse } from '../../types/FacebookResponse';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectors, setUser } from '../../store/CharsListReducer';

export const Header: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectors.getUser);

  const responseFacebook = (response: FacebookResponse) => {
    try {
      if (localStorage.getItem(response.userID) !== null) {
        dispatch(setUser(JSON.parse(localStorage.getItem(response.userID) || 'null')));

        return;
      }

      const userObject = {
        name: response.name,
        image: response.picture.data.url,
        userID: response.userID,
        likedChars: [],
        dislikedChars: [],
      };

      localStorage.setItem(response.userID, JSON.stringify(userObject));
      dispatch(setUser(userObject));
    } catch {
      dispatch(setUser(null));
    }
  };

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={styles.link}
      >
        Characters List
      </NavLink>

      {user ? (
        <NavLink
          to="/profile"
          className={styles.link}
        >
          <img
            className={styles.avatar}
            src={user.image}
            alt="My avatar"
          />
          <p className={styles.name}>
            {user.name}
          </p>
        </NavLink>
      ) : (
        <>
          <FacebookLogin
            appId="3056667237918240"
            autoLoad={false}
            fields="name,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            textButton="LOGIN"
            cssClass={styles.facebook}
          />
        </>
      )}
    </header>
  );
});
