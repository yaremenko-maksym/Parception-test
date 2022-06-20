/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-globals */
import classNames from 'classnames';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrentEpisode } from '../../store/EpisodeListReducer';
import { setCurrentUserDislikedEpisodes, setCurrentUserLikedEpisodes, UserSelectors } from '../../store/UserReducer';
import { Episode } from '../../types/Episode';

type Props = {
  episodesArray: Episode[],
};

export const EpisodesList: React.FC<Props> = memo(({
  episodesArray,
}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(UserSelectors.getUser);
  const likedEpisodes = useAppSelector(UserSelectors.getLikedEpisodes);
  const dislikedEpisodes = useAppSelector(UserSelectors.getDislikedEpisodes);

  return (
    <ul className="list-group list-group-light">
      {episodesArray.map(episode => (
        <li
          key={episode.id}
          className="
                myLink
                clickable
                bg-dark
                char
                list-group-item
                d-flex
                flex-lg-row
                flex-column
                justify-space-between
                align-items-start
                align-items-lg-center
                border-success"
          onClick={() => {
            dispatch(setCurrentEpisode(null));
            navigate(`/episodes/${episode.id}`);
          }}
        >
          <div
            className="ms-2 me-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center"
            style={{ gap: '20px' }}
          >
            <h3 className="fw-bold">
              {`Season: ${episode.episode.slice(1, 3)} `}
              {`Episode: ${episode.episode.slice(4, 6)}`}
            </h3>

            <p
              className="badge rounded-pill badge-light"
            >
              {episode.name}
            </p>
          </div>

          {user && (
            <div className="
                  btn-group
                  me-2
                  ms-2
                  mt-2
                  mt-lg-0
                  d-flex
                  justify-content-end
                  align-items-center"
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserLikedEpisodes(episode));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-success': likedEpisodes[episode.id],
                  },
                )}
              >
                <i className="fas fa-thumbs-up"></i>
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserDislikedEpisodes(episode));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-danger': dislikedEpisodes[episode.id],
                  },
                )}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
});
