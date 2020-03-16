import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomLink from '../../UI/CustomLink/CustomLink';

const GeneralError = () => {
  const location = useLocation();
  return(
    <div className="error_page">
      <h2>An unexpected error has occurred</h2>
      <p>
        We are sorry, something whent wrong during landing procedures on <strong>{location.pathname}</strong>, if you want you can go back <CustomLink to='/'>Home</CustomLink> or try again later.
      </p>
    </div>
  )
}

export default GeneralError;
