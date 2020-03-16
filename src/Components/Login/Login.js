import React from 'react';
import Form from '../Form/Form';
import useUser from '../../hooks/useUser';

const Login = () => {
  const { loginFormController } = useUser();
  return(
    <Form
      obj={loginFormController.state}
      handleSubmit={loginFormController.handleSubmit}
      handleChange={loginFormController.handleChange}
      isValid={loginFormController.isFormValid}
      serverErrorMessage={loginFormController.serverErrorMessage}
      action='Login'
      formClass="LoginForm" />
  )
}

export default Login;
