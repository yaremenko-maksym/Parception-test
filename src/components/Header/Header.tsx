/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import './Header.scss';

import { FacebookResponse } from '../../types/FacebookResponse';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectors, setUser } from '../../store/CharsListReducer';
import { Search } from '../Search/Search';

export const Header: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const user = useAppSelector(selectors.getUser);

  const responseFacebook = useCallback((response: FacebookResponse) => {
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
      searchParams.delete('code');
    } catch {
      dispatch(setUser(null));
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-light"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://www.freeiconspng.com/thumbs/rick-and-morty-folder-icon/rick-and-morty-icon-png-images-29.png"
                height="50"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink
                  to="/"
                  className="nav-link text-light"
                >
                  Characters List
                </NavLink>
              </li>
            </ul>

            <Search />
          </div>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="nav-link text-light">
                    {user.name}
                  </div>

                  <img
                    className="rounded-circle nav-link"
                    height="50"
                    src={user.image}
                    alt="My avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end bg-dark"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <NavLink
                      to="/profile"
                      className="dropdown-item text-light"
                    >
                      My profile
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-light btn btn-danger"
                      href="#"
                      onClick={() => {
                        dispatch(setUser(null));
                        navigate('/list');
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>

            ) : (
              <div className="nav-link">
                <FacebookLogin
                  appId="3056667237918240"
                  autoLoad
                  fields="name,picture"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  textButton="LOGIN"
                  cssClass="facebook"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});
