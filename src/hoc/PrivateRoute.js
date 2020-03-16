import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useIsUserAuth } from '../hooks/hooks';

const PrivateRoute = ({ component: Component, redirectPath, ...rest }) => {
  const isAuthenticated = useIsUserAuth();
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated
      ? <Component {...props} />
      : <Redirect to={redirectPath} />
    )} />
  )
}

export default PrivateRoute;
