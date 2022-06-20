import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { UserSelectors } from '../../store/UserReducer';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(UserSelectors.getUser);

  if (!user) {
    return <Navigate to="/list" replace />;
  }

  return children;
};
