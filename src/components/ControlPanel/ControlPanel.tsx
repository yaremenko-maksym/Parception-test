import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ControlPanel.module.scss';

import { useAppDispatch, useAppSelector } from '../../store';
import { selectors, setCurrentChar } from '../../store/CharsListReducer';
import { Character } from '../../types/Character';

export const ControlPanel: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectors.getChars);

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Character[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.currentTarget.value;

    const filteredChars = chars.filter(char => {
      return char.name.toLowerCase().includes(currentInput.toLowerCase());
    });

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredChars);
    setShowSuggestions(true);
    setUserInput(currentInput);
  }, [userInput, chars]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setUserInput(filteredSuggestions[activeSuggestion].name);
      setActiveSuggestion(0);
      setShowSuggestions(false);
      dispatch(setCurrentChar(null));
      navigate(`/${filteredSuggestions[activeSuggestion].id}`);
    }

    if (e.code === 'Tab') {
      setUserInput(filteredSuggestions[activeSuggestion].name);
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
            {filteredSuggestions.map((char, index) => {
              return (
                <li
                  key={char.id}
                >
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/${char.id}`);
                    }}
                    className={classNames(
                      { [styles.active]: index === activeSuggestion },
                      styles.suggestionsList__item,
                    )}
                    onMouseEnter={() => {
                      setActiveSuggestion(index);
                    }}
                  >
                    {char.name}
                  </button>
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <div className={styles.noMatch}>
          <p>No suggestions, you&apos;re on your own!</p>
        </div>
      );
    }

    return null;
  }, [userInput, showSuggestions, activeSuggestion, filteredSuggestions]);

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          Filter
        </legend>

        <label
          htmlFor="titleQuery"
          className={styles.label}
        >
          <input
            type="text"
            id="titleQuery"
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
            placeholder="Name..."
            autoComplete="off"
          />
          {suggestionsListComponent}
        </label>
      </fieldset>
    </div>
  );
});
