import React, { memo, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './EpisodePage.scss';

import { useAppDispatch, useAppSelector } from '../../store';
import { EpisodeSelectors, loadEpisodeByIDFromServer, setIsEpisodePageLoading } from '../../store/EpisodeListReducer';

import { CharsList } from '../CharsList';
import { Loader } from '../Loader';

export const EpisodePage: React.FC = memo(() => {
  const { episodeID } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentEpisode = useAppSelector(EpisodeSelectors.getCurrentEpisode);
  const isEpisodePageLoading = useAppSelector(EpisodeSelectors.getIsEpisodePageLoading);
  const totalEpisodes = useAppSelector(EpisodeSelectors.getTotalEpisodes);

  const currentEpisodeDate = useMemo(() => {
    if (currentEpisode) {
      const date = new Date(currentEpisode.created);

      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }

    return null;
  }, [currentEpisode]);

  useEffect(() => {
    if (episodeID) {
      dispatch(setIsEpisodePageLoading(true));

      if (totalEpisodes !== 0
        && (+episodeID > totalEpisodes || +episodeID < 0 || Number.isNaN(+episodeID))) {
        navigate('/locations');

        return;
      }

      dispatch(loadEpisodeByIDFromServer(+episodeID));
    }
  }, [episodeID, totalEpisodes]);

  return (
    <div className="container bg-dark mt-3 mb-3 p-3 rounded-6">
      {isEpisodePageLoading && <Loader size="big" />}

      {currentEpisode && (
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div className="d-flex flex-column info p-4">
            <h1 className="display-3 text-light mb-5 mb-lg-10 border-bottom border-success">
              {`${currentEpisode.episode}: ${currentEpisode.name}`}
            </h1>

            <div>
              <h3 className="text-light mb-lg-6">
                {`Air date: ${currentEpisode.air_date}`}
              </h3>

              <h3 className="text-light">
                {`Created date: ${currentEpisodeDate?.day}.${currentEpisodeDate?.month}.${currentEpisodeDate?.year}`}
              </h3>
            </div>
          </div>

          <div className="p-4">
            <h2
              className="display-5 text-light"
            >
              Characters :
            </h2>
            <div className="episode-characters">
              <CharsList charsArray={currentEpisode.characters} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
