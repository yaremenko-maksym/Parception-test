import React, { useEffect, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import {
  loadCharsFromServer,
  selectors,
} from '../../store/CharsListReducer';
import { NameFinder } from '../NameFinder';

export const CharsList: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectors.getChars);

  useEffect(() => {
    dispatch(loadCharsFromServer());
  }, []);

  return (
    <>
      <NameFinder />

      <ul>
        {chars.map(char => (
          <li
            key={char.id}
          >
            <h3>
              {char.name}
            </h3>

            <p>
              {char.status}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
});
