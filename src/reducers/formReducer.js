import * as actionTypes from './actions/actionTypes';

const onChange = (state, action) => {
  return {
    ...state,
    [action.name]: {
      ...state[action.name],
      validation: {
        ...state[action.name].validation,
        ...action.validation
      },
      value: action.value,
      touched: true
    }
  };
}

const onServerSuccess = ( state, action ) => {
  //shallow copy
  let newState = {...state};
  //clean form values
  const formKeys = Object.keys(state);
  formKeys.forEach(el => {
    newState = {
      ...newState,
      [el]: {
        ...newState[el],
        value: '',
        touched: false
      }
    }
  });
  return newState;
}
const onInvalidSubmit = ( state, action ) => {
  let newState = {...state};

  const formKeys = Object.keys(state);
  formKeys.forEach(el => {
    if(!newState[el].validation.valid) {
      newState = {
        ...newState,
        [el]: {
          ...newState[el],
          touched: true
        }
      }
    }
  });
  return newState;
}

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.VALUE_CHANGE:
      return onChange( state, action );
    case actionTypes.FORM_INVALID_SUBMIT:
      return onInvalidSubmit( state, action )
    case actionTypes.FORM_SERVER_SUCCESS:
      return onServerSuccess( state, action );
    default:
      throw new Error();
  }
};

export default formReducer;
