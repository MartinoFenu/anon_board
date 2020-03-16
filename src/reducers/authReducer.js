import * as actionTypes from './actions/actionTypes';

const login = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    token: action.token
  };
}

const logout = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    token: null
  };
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return login( state, action );
    case actionTypes.LOGOUT:
      return logout( state, action );
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
