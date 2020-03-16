import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../hoc/PrivateRoute';
import Loader from '../UI/Loader/Loader';
const Home = lazy(() => import('../Home/Home'));
const Board = lazy(() => import('../Board/Board'));
const Thread = lazy(() => import('../Thread/Thread'));
const Privacy = lazy(() => import('../Privacy/Privacy'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));
const Login = lazy(() => import('../Login/Login'));


const Routes = () => {
  return(
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path='/privacy' exact component={Privacy} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} redirectPath='/login' />
        <Route path='/login' exact component={Login} />
        <Route path='/:board_id/:thread_id' component={Thread} />
        <Route path='/:board_id' component={Board} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Suspense>
  )
}

export default Routes;
