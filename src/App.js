import React, { useEffect } from 'react';
import Layout from './Components/Layout/Layout';
import './App.css';
import useAuth from './hooks/useAuth';


const App = () => {
  const { checkAuth } = useAuth();

  useEffect( () => {
    checkAuth();
  }, [checkAuth]);

  return (
      <div className="App">
        <Layout />
      </div>
  );
}

export default App;
