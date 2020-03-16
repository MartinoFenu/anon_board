import { useContext } from 'react';
import { AuthContext } from '../Context/Context';

export const useIsUserAuth = () => {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated;
};
