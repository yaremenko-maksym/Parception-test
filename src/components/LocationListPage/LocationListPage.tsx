import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { loadPageOfLocationsFromServer, LocationSelectors, setIsLocationListLoading } from '../../store/LocationListReducer';

import { Loader } from '../Loader';
import { LocationsList } from '../LocationsList';
import { Pagination } from '../Pagination';

export const LocationListPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || 1;

  const dispatch = useAppDispatch();
  const locations = useAppSelector(LocationSelectors.getLocations);
  const maxPages = useAppSelector(LocationSelectors.getLocationsPagesCount);
  const isListLoading = useAppSelector(LocationSelectors.getIsLocationListLoading);

  useEffect(() => {
    dispatch(setIsLocationListLoading(true));

    if (+page > maxPages || +page < 1 || Number.isNaN(+page)) {
      navigate('/locations/?page=1');

      return;
    }

    dispatch(loadPageOfLocationsFromServer(+page));
  }, [location]);

  return (
    <>
      <div className="container p-2 rounded-6 bg-dark list-container">
        {isListLoading && <Loader size="big" />}
        <LocationsList locationsArray={locations} />
      </div>

      <Pagination />
    </>
  );
});
