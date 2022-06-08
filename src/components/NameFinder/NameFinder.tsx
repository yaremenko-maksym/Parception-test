/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';

import styles from './NameFinder.module.scss';

import { useAppSelector } from '../../store';
import { selectors } from '../../store/CharsListReducer';
import { Character } from '../../types/Character';

export const NameFinder: React.FC = memo(() => {
  const chars = useAppSelector(selectors.getChars);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Character[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.currentTarget.value;

    const filteredChars = chars.filter(char => {
      return char.name.toLowerCase().includes(currentInput.toLowerCase());
    });

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredChars);
    setShowSuggestions(true);
    setUserInput(currentInput);
  }, [userInput, chars]);

  const handleClickChoose = useCallback((e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setUserInput(filteredSuggestions[activeSuggestion].name);
      setActiveSuggestion(0);
      setShowSuggestions(false);
    } else if (e.code === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion((prevValue) => prevValue - 1);
    } else if (e.code === 'ArrowDown') {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion((prevValue) => prevValue + 1);
    }
  }, [activeSuggestion, filteredSuggestions]);

  const suggestionsListComponent = useMemo(() => {
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        return (
          <ul className={styles.suggestionsList}>
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  className={classNames(
                    { [styles.active]: index === activeSuggestion },
                    styles.suggestionsList__item,
                  )}
                  key={suggestion.id}
                  onClick={handleClickChoose}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <div className="no-suggestions">
          <em>No suggestions, you&apos;re on your own!</em>
        </div>
      );
    }

    return null;
  }, [userInput, showSuggestions, activeSuggestion]);

  return (
    <label htmlFor="titleQuery">
      Filter:
      <input
        type="text"
        id="titleQuery"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsListComponent}
    </label>
  );
});
