import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { CharPage } from './components/CharPage';
import { MyProfilePage } from './components/MyProfilePage';
import { Header } from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import { Footer } from './components/Footer';
import { CharListPage } from './components/CharListPage';
import { HomePage } from './components/HomePage';
import { LocationListPage } from './components/LocationListPage';
import { LocationPage } from './components/LocationPage';
import { EpisodeListPage } from './components/EpisodeListPage';
import { EpisodePage } from './components/EpisodePage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <main className="main bg-image main-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharListPage />} />
          <Route path="/characters/:charID" element={<CharPage />} />
          <Route path="/locations" element={<LocationListPage />} />
          <Route path="/locations/:locationID" element={<LocationPage />} />
          <Route path="/episodes" element={<EpisodeListPage />} />
          <Route path="/episodes/:episodeID" element={<EpisodePage />} />
          <Route
            path="/profile"
            element={(
              <RequireAuth>
                <MyProfilePage />
              </RequireAuth>
            )}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
