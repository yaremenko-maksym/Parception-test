/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  loadFilteredCharactersFromServer,
  selectors,
  setCurrentChar,
  setCurrentQuery,
} from '../../store/CharsListReducer';

import styles from './Search.module.scss';

export const Search: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nameQuery = useAppSelector(selectors.getNameQuery);
  const filteredChars = useAppSelector(selectors.getFilteredCharacters);

  const [userInput, setUserInput] = useState(nameQuery);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const applyQuery = useCallback(
    debounce(async (newQuery: string) => {
      await dispatch(loadFilteredCharactersFromServer(newQuery));
      dispatch(setCurrentQuery(newQuery));
    }, 500),
    [nameQuery],
  );

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.currentTarget.value;

    setUserInput(currentInput);
    applyQuery(currentInput);
    setActiveSuggestion(0);
    setShowSuggestions(true);
  }, [nameQuery]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setUserInput(filteredChars[activeSuggestion].name);
      setActiveSuggestion(0);
      setShowSuggestions(false);
      dispatch(setCurrentChar(null));
      navigate(`/${filteredChars[activeSuggestion].id}`);
    }

    if (e.code === 'Tab') {
      setUserInput(filteredChars[activeSuggestion].name);
      setActiveSuggestion(0);
      setShowSuggestions(false);
    }

    if (e.code === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion((prevValue) => prevValue - 1);
    }

    if (e.code === 'ArrowDown') {
      if (activeSuggestion + 1 === filteredChars.length) {
        return;
      }

      setActiveSuggestion((prevValue) => prevValue + 1);
    }
  }, [activeSuggestion, filteredChars]);

  const suggestionsListComponent = useMemo(() => {
    if (showSuggestions && userInput) {
      if (filteredChars.length) {
        return (
          <ul
            className={classNames(
              'list-group list-group-light',
              styles.suggestionsList,
            )}
          >
            {filteredChars.map((char, index) => {
              return (
                <li
                  key={char.id}
                  onClick={() => {
                    setShowSuggestions(false);
                    navigate(`/list/${char.id}`);
                  }}
                  onMouseEnter={() => {
                    setActiveSuggestion(index);
                  }}
                  className={classNames(
                    'list-group-item px-3 border-0',
                    styles.suggestionsList__item,
                  )}
                >
                  {char.name}
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <div
          className={classNames(
            'list-group list-group-light',
            styles.suggestionsList,
          )}
        >
          <p
            className={classNames(
              'list-group-item px-3 border-0',
              styles.suggestionsList__item,
            )}
          >
            Nothing...
          </p>
        </div>
      );
    }

    return null;
  }, [userInput, showSuggestions, activeSuggestion, filteredChars]);

  return (
    <form className="input-group w-auto my-auto d-sm-flex">
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        className="form-control rounded"
        placeholder="Search"
        style={{ minWidth: '125px' }}
      />
      {suggestionsListComponent}
      <span className="input-group-text border-0 d-flex">
        <i className="fas fa-search text-light"></i>
      </span>
    </form>
  );
});
