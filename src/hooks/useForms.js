import { useReducer, useState, useEffect, useCallback } from 'react';
import formReducer from '../reducers/formReducer';
import { checkValidity } from '../shared/utility';
import * as actions from '../reducers/actions/index';

const UseForms = (formSchema) => {
  const [state, dispatch] = useReducer(formReducer, formSchema);
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    let formIsValid = true;
    Object.keys(state).forEach(el => {
      formIsValid = state[el].validation.valid && formIsValid;
    });
    setIsFormValid(formIsValid)
  }, [state]);

  const handleChange = e => {
    e.persist();
    const validation = checkValidity(e.target.value, state[e.target.name].validation);
    dispatch(actions.onChange(e.target.name, e.target.value, validation));
  };

  const handleSubmit = ( e, args, cb ) => {
    //get event, args and callback from form
    e.preventDefault();

    if(isFormValid && args && cb) {
      //dispatch(actions.onSubmit());
      cb(...args);
    }  else {
      dispatch(actions.onInvalidSubmit());
    }
  }

  const onServerSuccessRes = useCallback(() => {
    dispatch(actions.onServerSuccess());
  }, [])

  return {
    state,
    handleChange,
    handleSubmit,
    isFormValid,
    serverErrorMessage,
    setServerErrorMessage,
    onServerSuccessRes
  }
}

export default UseForms;
