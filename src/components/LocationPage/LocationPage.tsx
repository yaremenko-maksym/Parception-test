import React, { memo, useEffect, useMemo } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import './LocationPage.scss';

import { useAppDispatch, useAppSelector } from '../../store';
import { loadLocationByIDFromServer, LocationSelectors, setIsLocationPageLoading } from '../../store/LocationListReducer';

import { Loader } from '../Loader';
import { CharsList } from '../CharsList';

export const LocationPage: React.FC = memo(() => {
  const { locationID } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector(LocationSelectors.getCurrentLocation);
  const isLocationPageLoading = useAppSelector(LocationSelectors.getIsLocationPageLoading);
  const totalLocations = useAppSelector(LocationSelectors.getTotalLocations);

  const currentLocationDate = useMemo(() => {
    if (currentLocation) {
      const date = new Date(currentLocation.created);

      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }

    return null;
  }, [currentLocation]);

  useEffect(() => {
    if (locationID) {
      dispatch(setIsLocationPageLoading(true));

      if (totalLocations !== 0
        && (+locationID > totalLocations || +locationID < 0 || Number.isNaN(+locationID))) {
        navigate('/locations');

        return;
      }

      dispatch(loadLocationByIDFromServer(+locationID));
    }
  }, [locationID, totalLocations]);

  return (
    <div className="container bg-dark mt-3 mb-3 p-3 rounded-6">
      {isLocationPageLoading && <Loader size="big" />}

      {currentLocation && (
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div className="d-flex flex-column info p-4">
            <h1 className="display-3 text-light mb-5 mb-lg-10 border-bottom border-success">
              {currentLocation.name}
            </h1>

            <div>
              <h3 className="text-light mb-lg-6">
                {`Type: ${currentLocation.type}`}
              </h3>

              <h3 className="text-light mb-lg-6">
                {`Dimension: ${currentLocation.dimension}`}
              </h3>

              <h3 className="text-light">
                {`Created date: ${currentLocationDate?.day}.${currentLocationDate?.month}.${currentLocationDate?.year}`}
              </h3>
            </div>
          </div>

          <div className="p-4">
            <h2
              className="display-5 text-light"
            >
              Residents :
            </h2>
            <div className="location-residents">
              <CharsList charsArray={currentLocation.residents} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
