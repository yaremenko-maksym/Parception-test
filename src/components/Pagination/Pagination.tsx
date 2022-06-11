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

import { useAppDispatch, useAppSelector } from '../../store';

import {
  loadCharsFromServer,
  selectors,
} from '../../store/CharsListReducer';

export const Pagination: React.FC = memo(() => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const currentPage = searchParams.get('page') || 1;

  const [isPrevDisabled, setPrevDisability] = useState(true);
  const [isNextDisabled, setNextDisability] = useState(false);

  const total = useAppSelector(selectors.getTotalChars);
  const last = useAppSelector(selectors.getPagesCount);
  const perPage = useMemo(() => 20, []);

  const visiblePages = useMemo(() => {
    return paginate(+currentPage, last);
  }, [currentPage, total, perPage]);

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

    dispatch(loadCharsFromServer(+currentPage));
  }, [currentPage, total]);

  return (
    <div className="container pagination-container bg-dark d-flex justify-content-center align-items-center">
      <nav className="Page navigation example">
        {/* <p className="pagination__title">
        {`${firstElementOnPage} - ${lastElementOnPage} of ${total}`}
      </p> */}

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
