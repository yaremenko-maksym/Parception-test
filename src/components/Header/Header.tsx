/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import './Header.scss';

import { FacebookResponse } from '../../types/FacebookResponse';
import { useAppDispatch, useAppSelector } from '../../store';
import { Search } from '../Search/Search';
import { setUser, UserSelectors } from '../../store/UserReducer';
import { User } from '../../types/User';

export const Header: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const user = useAppSelector(UserSelectors.getUser);

  const responseFacebook = useCallback((response: FacebookResponse) => {
    try {
      if (localStorage.getItem(response.userID) !== null) {
        dispatch(setUser(JSON.parse(localStorage.getItem(response.userID) || 'null')));

        return;
      }

      const userObject: User = {
        name: response.name,
        image: response.picture.data.url,
        userID: response.userID,
        likedChars: {},
        dislikedChars: {},
        likedLocations: {},
        dislikedLocations: {},
        likedEpisodes: {},
        dislikedEpisodes: {},
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
      <nav className="navbar navbar-expand-lg bg-dark">
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
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link myLink"
                  end
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/characters"
                  className="nav-link myLink"
                  end
                >
                  Characters
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/locations"
                  className="nav-link myLink"
                  end
                >
                  Locations
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/episodes"
                  className="nav-link myLink"
                  end
                >
                  Episodes
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
                  <div className="nav-link ps-0 myLink">
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
                  className="dropdown-menu dropdown-menu-start bg-dark"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <NavLink
                      to="/profile"
                      className="dropdown-item myLink btn"
                    >
                      My profile
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className="dropdown-item btn btn-danger myLink"
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
                  scope="public_profile"
                  fields="name,picture"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  textButton="LOGIN"
                  cssClass="facebook"
                  authType="reauthorize"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});
