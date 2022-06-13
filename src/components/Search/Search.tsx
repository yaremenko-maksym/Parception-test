/* eslint-disable no-console */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
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

  const handleChoose = useCallback(() => {
    setUserInput(filteredChars[activeSuggestion].name);
    setShowSuggestions(false);
    setActiveSuggestion(0);
    navigate(`/list/${filteredChars[activeSuggestion].id}`);
  }, [filteredChars, activeSuggestion]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();

      setUserInput('');
      setActiveSuggestion(0);
      setShowSuggestions(false);

      if (!filteredChars.length) {
        return;
      }

      navigate(`/list/${filteredChars[activeSuggestion].id}`);
    }

    if (e.code === 'Tab') {
      if (!filteredChars.length) {
        return;
      }

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
  }, [activeSuggestion, filteredChars, nameQuery]);

  const suggestionsListComponent = useMemo(() => {
    if (showSuggestions && userInput) {
      if (filteredChars.length) {
        return (
          <ul
            className={classNames(
              'list-group list-group-light my-dropdown',
              styles.suggestionsList,
            )}
          >
            {filteredChars.map((char, index) => {
              return (
                <li
                  key={char.id}
                  onClick={() => handleChoose()}
                  onMouseEnter={() => {
                    setActiveSuggestion(index);
                  }}
                  className={classNames(
                    'list-group-item px-3 border-0',
                    { 'bg-success': index === activeSuggestion },
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
    <form
      className="input-group w-auto my-auto d-sm-flex"
    >
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
      <button
        type="button"
        onClick={handleChoose}
        className="input-group-text border-0 d-flex"
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();

            setUserInput('');
            setActiveSuggestion(0);
            setShowSuggestions(false);

            if (!filteredChars.length) {
              return;
            }

            navigate(`/list/${filteredChars[activeSuggestion].id}`);
          }
        }}
      >
        <i role="button" className="fas fa-search myLink"></i>
      </button>
    </form>
  );
});
