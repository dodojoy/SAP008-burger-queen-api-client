import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Salon } from './pages/salon/salon';
import { Kitchen } from './pages/kitchen/kitchen';
import { Fragment } from 'react';
import {
  BrowserRouter,
  Routes, Route,
} from 'react-router-dom';

export const RoutesBQ = () => {
 return (
  <BrowserRouter>
    <Fragment>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/salon' element={<Salon />} />
        <Route path='/kitchen' element={<Kitchen />} />
      </Routes>
    </Fragment>
  </BrowserRouter>
 );
}
