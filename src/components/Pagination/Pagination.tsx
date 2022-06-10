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
    <div className="pagination">
      {/* <p className="pagination__title">
        {`${firstElementOnPage} - ${lastElementOnPage} of ${total}`}
      </p> */}

      <div className="pagination__buttons">
        <button
          type="button"
          onClick={() => {
            searchParams.set('page', (+currentPage - 1).toString());
            navigate(`?page=${(+currentPage - 1).toString()}`);
          }}
          disabled={isPrevDisabled}
          className="pagination__button"
        >
          &laquo;
        </button>

        <div className="pagination__buttons-pages">
          {visiblePages.map(item => {
            if (item.value === '...') {
              return (
                <p
                  key={item.id}
                  className="pagination__buttons-dots"
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
                  'pagination__button',
                  { 'pagination__button--selected': +currentPage === item.value },
                )}
              >
                {item.value}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            searchParams.set('page', (+currentPage + 1).toString());
            navigate(`?page=${(+currentPage + 1).toString()}`);
          }}
          disabled={isNextDisabled}
          className="pagination__button"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
});
