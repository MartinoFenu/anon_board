import React, {useState} from 'react';
import Input from '../UI/Input/Input';

const Form = ({ obj, handleSubmit, handleChange, isValid, serverErrorMessage, action, formClass }) => {
  const formKeys = Object.keys(obj);
  const [showError, setShowError] = useState(false);

  const handleSubmitLocally = e => {
    if(!isValid) {
      setShowError(true);
    }
    handleSubmit(e)
  }

  const formInputs = formKeys.map(el => (
    <Input
      key={el}
      body={obj[el]}
      handleChange={handleChange}
      showError={showError}
      setShowError={setShowError} />
  ));

  const serverErrorMessages = serverErrorMessage ? Array.isArray(serverErrorMessage) ?
    <div>{serverErrorMessage.map((el, index) => <span key={index}>{el.message}</span>)}</div> :
    <span>{serverErrorMessage}</span> : null

  return(
    <form
      onSubmit={e => handleSubmitLocally(e)}
      className={formClass} >
      {formInputs}
      {serverErrorMessages}
      <button
        type='submit'>{action}</button>
    </form>
  )
}

export default Form;
