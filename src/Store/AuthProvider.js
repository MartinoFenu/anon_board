import React, { useReducer } from 'react';
import { AuthContext } from '../Context/Context';
import authReducer from '../reducers/authReducer';

const initialState = {
  isAuthenticated: false
}

const  AuthProvider = props => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const value = { authState, dispatch };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
