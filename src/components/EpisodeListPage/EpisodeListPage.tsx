import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { EpisodeSelectors, loadPageOfEpisodesFromServer, setIsEpisodeListLoading } from '../../store/EpisodeListReducer';
import { EpisodesList } from '../EpisodesList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';

export const EpisodeListPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const episodes = useAppSelector(EpisodeSelectors.getEpisodes);
  const maxPages = useAppSelector(EpisodeSelectors.getEpisodesPageCount);
  const isListLoading = useAppSelector(EpisodeSelectors.getIsEpisodeListLoading);

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || 1;

  useEffect(() => {
    dispatch(setIsEpisodeListLoading(true));

    if (+page > maxPages || +page < 1 || Number.isNaN(+page)) {
      navigate('/locations/?page=1');

      return;
    }

    dispatch(loadPageOfEpisodesFromServer(+page));
  }, [location]);

  return (
    <>
      <div className="container p-2 rounded-6 bg-dark list-container">
        {isListLoading && <Loader size="big" />}
        <EpisodesList episodesArray={episodes} />
      </div>

      <Pagination />
    </>
  );
});
