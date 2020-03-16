import { useContext, useCallback } from 'react';
import { AuthContext } from '../Context/Context';
import * as actions from '../reducers/actions/index';

const useAuth = () => {
  const { authState, dispatch } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    dispatch(actions.logout())
  }, [dispatch]);

  const checkAuthTimeout = useCallback(expirationTime => {
    setTimeout(() => {
      handleLogout();
    }, expirationTime)
  }, [handleLogout])

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if(!token) return handleLogout();
    else {
      const now = new Date().getTime();
      const expirationDate = localStorage.getItem('expirationDate');
      if( expirationDate <= now ) handleLogout();
      else {
        checkAuthTimeout(expirationDate - now);
        dispatch(actions.login(token, expirationDate));
      }
    }
  }, [handleLogout, dispatch, checkAuthTimeout]);


  const handleLogin = ( expiresIn, token ) => {
    const expirationDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    checkAuthTimeout(expiresIn * 1000);
    dispatch(actions.login(token, expirationDate));
  };

  return {
    handleLogin,
    checkAuth,
    handleLogout,
    isAuthenticated: authState.isAuthenticated
  }
}

export default useAuth;
