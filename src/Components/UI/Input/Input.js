import React, { useState, useEffect } from 'react';

const Input = props => {
  const validInputClass = 'InputElement';
  const invalidInputClass = 'InputElement Invalid';
  let inputElement = null;
  const [inputClasses, setInputClasses] = useState(validInputClass);

  //useEffect to validate after the first blur and if the user cancel the already validate value
  useEffect(() => {
    if(props.body.validation.valid) setInputClasses(validInputClass);
    else if(props.showError && !props.body.validation.valid && props.body.touched){
      setInputClasses(invalidInputClass)
    }
  }, [props.body, props.showError])

  //start showing validation errors only after blur
  const handleBlur = () => {
    if(!props.body.validation.valid && props.body.validation.validate && props.body.touched) {
      setInputClasses(invalidInputClass)
      props.setShowError(true);
    } else setInputClasses(validInputClass)
  }

  switch (props.body.type) {
    case 'textarea':
      inputElement = <textarea
      className={inputClasses}
      {...props.body.config}
      value={props.body.value}
      onChange={props.handleChange}
      onBlur={handleBlur} />
      break;
    default:
      inputElement = <input
        className={inputClasses}
        {...props.body.config}
        value={props.body.value}
        onChange={props.handleChange}
        onBlur={handleBlur} />
  }
  return (
    <div className='Input'>
      {props.body.label ? <label className='Label'>{props.body.label}</label> : null}
      {inputElement}
      {!props.body.validation.valid && props.body.touched && props.showError ?
        <span
          className='FormErrors'>
          {props.body.validation.errorMessage}
        </span> : null}
    </div>
  )
}

export default Input;
