import React from 'react';
import CustomLink from '../../UI/CustomLink/CustomLink';

const PageNotFound = () => {

  return(
    <div className="404_page">
      <h2>404 Error - Page Not found</h2>
      <p>
        We are sorry, but the page that you are looking for is not on this Planet.
        If you want you can go back to the <CustomLink to='/'>HomePage</CustomLink>
      </p>
    </div>
  )
}

export default PageNotFound;
