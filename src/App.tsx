import React from 'react';
import './App.scss';
import { CharsList } from './components/CharsList';

export const App: React.FC = () => {
  return (
    <div className="App">
      <CharsList />
    </div>
  );
};
