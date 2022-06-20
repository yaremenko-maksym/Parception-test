/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { useAppSelector } from '../../store';

import { UserSelectors } from '../../store/UserReducer';
import { CharsList } from '../CharsList';
import { EpisodesList } from '../EpisodesList';
import { LocationsList } from '../LocationsList';

import './MyProfilePage.scss';

export const MyProfilePage: React.FC = memo(() => {
  const likedChars = useAppSelector(UserSelectors.getLikedChars);
  const dislikedChars = useAppSelector(UserSelectors.getDislikedChars);
  const likedLocations = useAppSelector(UserSelectors.getLikedLocations);
  const dislikedLocations = useAppSelector(UserSelectors.getDislikedLocations);
  const likedEpisodes = useAppSelector(UserSelectors.getLikedEpisodes);
  const dislikedEpisodes = useAppSelector(UserSelectors.getDislikedEpisodes);

  return (
    <div className="container mt-3 mb-3">
      <div className="accordion border border-2 rounded" id="accordionFlushExample">
        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Liked Chars:
            </button>
          </h2>

          <div
            id="collapseOne"
            className="accordion-collapse collapse show text-light"
            aria-labelledby="headingOne"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(likedChars).length ? (
                <CharsList charsArray={Object.values(likedChars)} />
              ) : (
                <i className="text-light">No liked characters yet</i>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Disliked Chars:
            </button>
          </h2>

          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(dislikedChars).length ? (
                <CharsList charsArray={Object.values(dislikedChars)} />
              ) : (
                <i className="text-light">No disliked characters yet</i>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Liked Locations:
            </button>
          </h2>

          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(likedLocations).length ? (
                <LocationsList locationsArray={Object.values(likedLocations)} />
              ) : (
                <i className="text-light">No liked locations yet</i>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Disliked Locations:
            </button>
          </h2>

          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(dislikedLocations).length ? (
                <LocationsList locationsArray={Object.values(dislikedLocations)} />
              ) : (
                <i className="text-light">No disliked locations yet</i>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Liked Episodes:
            </button>
          </h2>

          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(likedEpisodes).length ? (
                <EpisodesList episodesArray={Object.values(likedEpisodes)} />
              ) : (
                <i className="text-light">No liked episodes yet</i>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Disliked Episodes:
            </button>
          </h2>

          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              {Object.keys(dislikedEpisodes).length ? (
                <EpisodesList episodesArray={Object.values(dislikedEpisodes)} />
              ) : (
                <i className="text-light">No disliked episodes yet</i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
