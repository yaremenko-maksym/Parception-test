import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { paginate } from '../../functions/paginate';

import './Pagination.scss';

import { useAppSelector } from '../../store';

import { CharsSelectors } from '../../store/CharsListReducer';
import { LocationSelectors } from '../../store/LocationListReducer';
import { EpisodeSelectors } from '../../store/EpisodeListReducer';

export const Pagination: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = searchParams.get('page') || 1;

  const [isPrevDisabled, setPrevDisability] = useState(true);
  const [isNextDisabled, setNextDisability] = useState(false);

  const lastCharsPage = useAppSelector(CharsSelectors.getCharsPagesCount);
  const lastLocationsPage = useAppSelector(LocationSelectors.getLocationsPagesCount);
  const lastEpisodesPage = useAppSelector(EpisodeSelectors.getEpisodesPageCount);

  const visiblePages = useMemo(() => {
    switch (true) {
      case location.pathname.includes('characters'):
        return paginate(+currentPage, lastCharsPage, 2);

      case location.pathname.includes('locations'):
        return paginate(+currentPage, lastLocationsPage, 1);

      case location.pathname.includes('episodes'):
        return paginate(+currentPage, lastEpisodesPage, 2);

      default:
        return paginate(1, 1, 1);
    }
  }, [location, lastCharsPage, lastLocationsPage, lastEpisodesPage]);

  useEffect(() => {
    if (+currentPage === visiblePages[visiblePages.length - 1].value) {
      setNextDisability(true);
    } else {
      setNextDisability(false);
    }

    if (+currentPage > 1) {
      setPrevDisability(false);
    } else {
      setPrevDisability(true);
    }
  }, [location, lastCharsPage, lastLocationsPage, lastEpisodesPage]);

  return (
    <div className="container pagination-container bg-dark d-flex justify-content-center align-items-center">
      <nav className="Page navigation example">

        <div className="pagination">
          <button
            type="button"
            onClick={() => {
              searchParams.set('page', (+currentPage - 1).toString());
              navigate(`?page=${(+currentPage - 1).toString()}`);
            }}
            disabled={isPrevDisabled}
            className="page-item page-link pagination-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>

          {visiblePages.map(item => {
            if (item.value === '...') {
              return (
                <p
                  key={item.id}
                  className="page-item page-link pagination-link"
                >
                  {item.value}
                </p>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  searchParams.set('page', item.value.toString());
                  navigate(`?page=${item.value}`);
                }}
                className={classNames(
                  'page-link pagination-link',
                  { 'pagination__button--selected': +currentPage === item.value },
                )}
              >
                {item.value}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              searchParams.set('page', (+currentPage + 1).toString());
              navigate(`?page=${(+currentPage + 1).toString()}`);
            }}
            disabled={isNextDisabled}
            className="page-item page-link pagination-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </div>
      </nav>
    </div>
  );
});
