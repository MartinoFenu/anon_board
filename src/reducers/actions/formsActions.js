import * as actionTypes from './actionTypes';

export const onChange = ( name, value, validation ) => {
  return {
    type: actionTypes.VALUE_CHANGE,
    name,
    value,
    validation
  }
}

export const onServerSuccess = () => {
  return {
    type: actionTypes.FORM_SERVER_SUCCESS
  }
}

export const onInvalidSubmit = () => {
  return {
    type: actionTypes.FORM_INVALID_SUBMIT
  }
}
