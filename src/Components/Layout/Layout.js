import React, { useState } from 'react';
import Routes from '../Routes/Routes';
import { ErrorContext } from '../../Context/Context';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import withServerErrorHandling from '../../hoc/withServerErrorHandling';

const Layout = () => {
  const [errorCode, setErrorCode] = useState(null);

  const RoutesWithServerErrorHandling = withServerErrorHandling(Routes, errorCode);

  return(
    <ErrorContext.Provider value={setErrorCode}>
      <Header />
      <div className="Content">
        <RoutesWithServerErrorHandling />
      </div>
      <Footer />
    </ErrorContext.Provider>
  )
}

export default Layout;
