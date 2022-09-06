import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, NavLink,
} from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { checkConnection } from '../redux/slices/connectionSlice';
import { ROUTES } from '../utils/constants';
import FrontPage from './FrontPage';
import ErrorPage from './ErrorPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

function App() {
  const { isConnected } = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkConnection());
  }, [])

  if (!isConnected) return <ErrorPage />

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<FrontPage />}/>
        <Route path={ROUTES.SIGNIN} element={<SignInPage />}/>
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
