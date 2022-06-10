import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { CharPage } from './components/CharPage';
import { CharsList } from './components/CharsList';
import { MyProfilePage } from './components/MyProfilePage';
import { Header } from './components/Header';
import { RequireAuth } from './components/RequireAuth';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/list" element={<CharsList />} />
        <Route path="/list/:charID" element={<CharPage />} />
        <Route
          path="/profile"
          element={(
            <RequireAuth>
              <MyProfilePage />
            </RequireAuth>
          )}
        />
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    </div>
  );
};
