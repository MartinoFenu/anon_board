import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ErrorContext } from '../../../Context/Context';

const CustomLink = props => {
  const setError = useContext(ErrorContext);
  return (
    <Link
      to={props.to}
      onClick={() => setError(null)} >{props.children}</Link>
  )
}

export default CustomLink;
