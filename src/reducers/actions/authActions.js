import * as actionTypes from './actionTypes';

export const login = token => {
  return {
    type: actionTypes.LOGIN,
    token
  }
}
export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}
