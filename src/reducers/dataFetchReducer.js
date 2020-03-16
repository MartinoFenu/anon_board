import * as actionTypes from './actions/actionTypes';

const fetchInit = (state, action) => {
  return {
    ...state,
    isLoading: true,
    isError: false
  };
}

const fetchFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    isError: true,
    statusCode: action.statusCode
  };
}

const fetchSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    isError: false,
    statusCode: action.statusCode,
    data: action.data,
  }
}

const requestInit = ( state, action ) => {
  return {
    ...state,
    requestType: action.requestType,
    url: action.url,
    reqBody: action.reqBody,
    config: action.config
  }
}


const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INIT:
      return fetchInit( state, action );
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess( state, action );
    case actionTypes.FETCH_FAILURE:
      return fetchFailed( state, action );
    case actionTypes.REQUEST_INIT:
      return requestInit( state, action );
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
