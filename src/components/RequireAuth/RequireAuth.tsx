import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { selectors } from '../../store/CharsListReducer';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectors.getUser);

  if (!user) {
    return <Navigate to="/list" replace />;
  }

  return children;
};
