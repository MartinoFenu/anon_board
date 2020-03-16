import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../schemas/formsSchemas';
import useDataFetch from './useDataFetch';
import useForms from './useForms';
import useAuth from './useAuth';

const useUser = () => {
  //routing
  const history = useHistory();
  //data fetching
  const [loginState, loginCall] = useDataFetch();
  //form
  const { setServerErrorMessage: setLoginError, ...loginForm } = useForms(login);
  //auth
  const { handleLogin } = useAuth();
  useEffect(() => {
    if(loginState.statusCode === 200) {
      handleLogin(loginState.data.expiresIn, loginState.data.token)
      history.push('/dashboard');
    } else if( loginState.statusCode >= 400 )
      setLoginError(loginState.data.error)
  }, [loginState, history, handleLogin,  setLoginError])

  const handleSubmitLogin = ( username, password) => {
    setLoginError(null);
    loginCall('POST', `/api/user`, { username, password });
  };

  const loginFormController = {
    ...loginForm,
    handleSubmit: e => loginForm.handleSubmit(e, [loginForm.state.username.value, loginForm.state.password.value], handleSubmitLogin)
  };

  return {
    loginFormController
  }
};

export default useUser;
