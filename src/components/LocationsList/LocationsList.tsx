/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrentLocation } from '../../store/LocationListReducer';
import { setCurrentUserDislikedLocations, setCurrentUserLikedLocations, UserSelectors } from '../../store/UserReducer';
import { Location } from '../../types/Location';

type Props = {
  locationsArray: Location[],
};

export const LocationsList: React.FC<Props> = memo(({
  locationsArray,
}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const likedLocations = useAppSelector(UserSelectors.getLikedLocations);
  const dislikedLocations = useAppSelector(UserSelectors.getDislikedLocations);
  const user = useAppSelector(UserSelectors.getUser);

  return (
    <ul className="list-group list-group-light">
      {locationsArray.map(location => (
        <li
          key={location.id}
          className="
                myLink
                clickable
                bg-dark
                char
                list-group-item
                d-flex
                flex-lg-row
                flex-column
                justify-space-between
                align-items-start
                align-items-lg-center
                border-success"
          onClick={() => {
            dispatch(setCurrentLocation(null));
            navigate(`/locations/${location.id}`);
          }}
        >
          <div
            className="ms-2 me-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center"
            style={{ gap: '20px' }}
          >
            <h3 className="fw-bold">
              {location.name}
            </h3>

            <p
              className="badge rounded-pill badge-light"
            >
              {location.type}
            </p>
          </div>

          {user && (
            <div className="
                  btn-group
                  me-2
                  ms-2
                  mt-2
                  mt-lg-0
                  d-flex
                  justify-content-end
                  align-items-center"
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserLikedLocations(location));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-success': likedLocations[location.id],
                  },
                )}
              >
                <i className="fas fa-thumbs-up"></i>
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserDislikedLocations(location));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-danger': dislikedLocations[location.id],
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
  );
});
