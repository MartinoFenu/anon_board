import { useEffect, useReducer, useCallback } from 'react';
import useAxios from './useAxios';
import dataFetchReducer from '../reducers/dataFetchReducer';
import * as actions from '../reducers/actions/index';

const initialState = {
  isLoading: false,
  isError: false,
  statusCode: null,
  data: [],
  reqBody: {},
  requestType: '',
  url: ''
};
//PER LA PRIMA VOLTA CI VUOLE UN IF URL |== '' PER EVITARE CHE ESEGUA LA CHIAMATA O CHE DIA ERRORI, MA POI SERVE?
const useDataFetch = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const axiosCalls = useAxios();

  const apiCall = useCallback(
    (type, url, body, config) => {
      dispatch(actions.requestInit(type, url, body, config))
    }, [] );

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch(actions.fetchInit());
      try {
        const result = await axiosCalls(state.requestType, state.url, state.reqBody, state.config);
        if (!didCancel) {
          dispatch(actions.fetchSuccess( result.data, result.status ));
        }
      } catch (error) {
        if (!didCancel && error.response) {
          dispatch(actions.fetchFailed(error.response.status || 500));
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [state.requestType, state.url, state.reqBody, state.config, axiosCalls]);

  return [state, apiCall];
};

export default useDataFetch;
