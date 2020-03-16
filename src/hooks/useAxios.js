import axios from 'axios';
import { useContext, useCallback } from 'react';
import { ErrorContext } from '../Context/Context';

const useAxios = () => {
  const setErrorCode = useContext(ErrorContext);

  axios.interceptors.response.use((response) => {
    // do something with the response data
    return response;
  }, error => {
    // handle the response error
    if(error.response.status > 422 || error.response.status === 404) {
      setErrorCode(error.response.status)}
    else return error.response;

  });

  const axiosCalls = useCallback(
    ( type, url, reqBody, token ) => {
      let config = null;
      if(token) config = { headers: {'Authorization': `bearer ${token}`} };
      switch (type) {
        case 'GET':
          return axios.get(url);
        case 'POST':
          return axios.post(url, reqBody, config);
        case 'DELETE':
          return axios.delete(url, {
            data: reqBody,
            ...config
          } );
        case 'PATCH':
          return axios.patch(url, reqBody);
        default:
          throw new Error('can\'t make API call, invalid method');
      }
    }, [])

  return axiosCalls;

}

export default useAxios;
