import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import CustomLink from '../UI/CustomLink/CustomLink';

const Header  = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const location = useLocation();
  const adminLinks = (
    <li>
      <div className='admin_links'>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <span
          className='Link'
          onClick={handleLogout} >Logout</span>
      </div>
    </li>
  )
  return (
    <header>
      <ul className="Nav-container">
        <li><CustomLink to="/">Home</CustomLink></li>
        <li className="Location">{location.pathname}</li>
        {isAuthenticated ? adminLinks : null }
      </ul>
    </header>
  )
};

export default Header;
