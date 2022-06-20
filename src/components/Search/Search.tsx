/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, {
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  loadFilteredCharactersFromServer,
  CharsSelectors,
  setCurrentQuery,
} from '../../store/CharsListReducer';

import './Search.scss';
import { loadFilteredLocationsFromServer, LocationSelectors } from '../../store/LocationListReducer';
import { EpisodeSelectors, loadFilteredEpisodesFromServer } from '../../store/EpisodeListReducer';

enum PossibleLists {
  Characters = 'characters',
  Locations = 'locations',
  Episodes = 'episodes',
}

export const Search: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nameQuery = useAppSelector(CharsSelectors.getNameQuery);

  const filteredChars = useAppSelector(CharsSelectors.getFilteredCharacters);
  const filteredLocations = useAppSelector(LocationSelectors.getFilteredLocations);
  const filteredEpisodes = useAppSelector(EpisodeSelectors.getFilteredEpisodes);

  const [userInput, setUserInput] = useState(nameQuery);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [
    activeSuggestionList,
    setActiveSuggestionList,
  ] = useState<PossibleLists>(PossibleLists.Characters);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      Promise.all([
        dispatch(loadFilteredCharactersFromServer(newQuery)),
        dispatch(loadFilteredLocationsFromServer(newQuery)),
        dispatch(loadFilteredEpisodesFromServer(newQuery)),
      ]);
      dispatch(setCurrentQuery(newQuery));
    }, 500),
    [nameQuery],
  );

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.currentTarget.value;

    setUserInput(currentInput);
    applyQuery(currentInput);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }, [nameQuery, activeSuggestionIndex, activeSuggestionList]);

  const handleChoose = useCallback(
    () => {
      setUserInput(filteredChars[activeSuggestionIndex].name);
      setShowSuggestions(false);
      setActiveSuggestionIndex(0);

      switch (activeSuggestionList) {
        case PossibleLists.Characters:
          navigate(`/${activeSuggestionList}/${filteredChars[activeSuggestionIndex].id}`);
          break;

        case PossibleLists.Locations:
          navigate(`/${activeSuggestionList}/${filteredLocations[activeSuggestionIndex].id}`);
          break;

        case PossibleLists.Episodes:
          navigate(`/${activeSuggestionList}/${filteredEpisodes[activeSuggestionIndex].id}`);
          break;

        default:
      }
    },
    [
      filteredChars,
      filteredLocations,
      filteredEpisodes,
      activeSuggestionIndex,
      activeSuggestionList,
      nameQuery,
    ],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();

      if (!filteredChars.length) {
        return;
      }

      handleChoose();
    }

    if (e.code === 'Tab') {
      e.preventDefault();

      if (!filteredChars.length) {
        return;
      }

      setUserInput(filteredChars[activeSuggestionIndex].name);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }

    if (e.code === 'ArrowUp') {
      e.preventDefault();

      if (activeSuggestionIndex === 0) {
        if (activeSuggestionList === PossibleLists.Characters) {
          return;
        }

        if (activeSuggestionList === PossibleLists.Locations) {
          setActiveSuggestionIndex(filteredChars.length - 1);
          setActiveSuggestionList(PossibleLists.Characters);

          return;
        }

        if (activeSuggestionList === PossibleLists.Episodes) {
          setActiveSuggestionIndex(filteredLocations.length - 1);
          setActiveSuggestionList(PossibleLists.Locations);

          return;
        }
      }

      setActiveSuggestionIndex((prevValue) => prevValue - 1);
    }

    if (e.code === 'ArrowDown') {
      e.preventDefault();

      if ([
        filteredChars.length,
        filteredLocations.length,
        filteredEpisodes.length,
      ].includes(activeSuggestionIndex + 1)) {
        if (activeSuggestionList === PossibleLists.Characters) {
          setActiveSuggestionIndex(0);
          setActiveSuggestionList(PossibleLists.Locations);

          return;
        }

        if (activeSuggestionList === PossibleLists.Locations) {
          setActiveSuggestionIndex(0);
          setActiveSuggestionList(PossibleLists.Episodes);

          return;
        }

        if (activeSuggestionList === PossibleLists.Episodes) {
          return;
        }
      }

      setActiveSuggestionIndex((prevValue) => prevValue + 1);
    }
  }, [activeSuggestionIndex, activeSuggestionList, filteredChars, nameQuery]);

  useEffect(() => {
    if (filteredChars.length !== 0) {
      setActiveSuggestionList(PossibleLists.Characters);

      return;
    }

    if (filteredLocations.length !== 0) {
      setActiveSuggestionList(PossibleLists.Locations);
    }
  }, [filteredChars, filteredLocations]);

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
      {showSuggestions && userInput && (
        <ul
          className="bg-light my-dropdown suggestionsList"
        >
          {filteredChars.length !== 0 && (
            <>
              <span
                className="bg-light border-bottom p-1 border-dark suggestionsList__category"
              >
                Characters :
              </span>
              {filteredChars.map((char, index) => (
                <li
                  key={char.id}
                  onClick={handleChoose}
                  onMouseEnter={() => {
                    setActiveSuggestionList(PossibleLists.Characters);
                    setActiveSuggestionIndex(index);
                  }}
                  className={classNames(
                    'suggestionsList__item border-0',
                    { 'bg-success': index === activeSuggestionIndex && activeSuggestionList === PossibleLists.Characters },
                  )}
                >
                  {char.name}
                </li>
              ))}
            </>
          )}

          {filteredLocations.length !== 0 && (
            <>
              <span
                className="bg-light border-bottom p-1 border-dark suggestionsList__category"
              >
                Locations :
              </span>
              {filteredLocations.map((location, index) => (
                <li
                  key={location.id}
                  onClick={handleChoose}
                  onMouseEnter={() => {
                    setActiveSuggestionList(PossibleLists.Locations);
                    setActiveSuggestionIndex(index);
                  }}
                  className={classNames(
                    'suggestionsList__item border-0',
                    { 'bg-success': index === activeSuggestionIndex && activeSuggestionList === PossibleLists.Locations },
                  )}
                >
                  {location.name}
                </li>
              ))}
            </>
          )}

          {filteredEpisodes.length !== 0 && (
            <>
              <span
                className="bg-light border-bottom p-1 border-dark suggestionsList__category"
              >
                Episodes :
              </span>
              {filteredEpisodes.map((episode, index) => (
                <li
                  key={episode.id}
                  onClick={handleChoose}
                  onMouseEnter={() => {
                    setActiveSuggestionList(PossibleLists.Episodes);
                    setActiveSuggestionIndex(index);
                  }}
                  className={classNames(
                    'suggestionsList__item border-0',
                    { 'bg-success': index === activeSuggestionIndex && activeSuggestionList === PossibleLists.Episodes },
                  )}
                >
                  {episode.name}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
      <button
        type="button"
        onClick={handleChoose}
        className="input-group-text border-0 d-flex"
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();

            setUserInput('');
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);

            if (!filteredChars.length) {
              return;
            }

            navigate(`/${PossibleLists.Characters}/${filteredChars[activeSuggestionIndex].id}`);
          }
        }}
      >
        <i className="fas fa-search myLink"></i>
      </button>
    </form>
  );
});
