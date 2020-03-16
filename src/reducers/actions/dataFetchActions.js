import * as actionTypes from './actionTypes';

export const fetchInit = () => {
  return {
    type: actionTypes.FETCH_INIT
  }
}
export const fetchSuccess = ( data, statusCode ) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    data,
    statusCode
  }
}
export const fetchFailed = statusCode => {
  return {
    type: actionTypes.FETCH_FAILURE,
    statusCode
  }
}
export const requestInit = ( reqType, url, reqBody, config ) => {
  return {
    type: actionTypes.REQUEST_INIT,
    requestType: reqType,
    url,
    reqBody,
    config
  }
}
