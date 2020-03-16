import React from "react";
import PageNotFound from '../Components/ErrorPages/PageNotFound/PageNotFound';
import GeneralError from '../Components/ErrorPages/GeneralError/GeneralError';

const withServerErrorHandling = ( Component, errorCode ) => {
  return function EnhancedComponent(){
    if (!errorCode) return ( <Component /> );
    else if (errorCode === 404) return <PageNotFound />
    else return <GeneralError />
  }
}

export default withServerErrorHandling;
