import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, NavLink,
} from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { checkConnection } from '../redux/slices/connectionSlice';
import { ROUTES } from '../utils/constants';
import { UserScopes } from '../redux/slices/userSlice';
import FrontPage from './FrontPage';
import ErrorPage from './ErrorPage';
import ForbiddenPage from './ForbiddenPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import UsersPage from './UsersPage';
import ResourcesPage from './ResourcesPage';

interface ProtectedRouteProps {
  allowableScopes: UserScopes[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowableScopes, children }: ProtectedRouteProps) => {
  const { authenticated, role } = useAppSelector((state) => state.user);

  if (!allowableScopes.includes(role) || !authenticated) {
    return <ForbiddenPage />
  }
  
  return (
    <>
      {children}
    </>
  );
}

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
        <Route 
          path={ROUTES.USERS} 
          element={
            <ProtectedRoute
              allowableScopes={[UserScopes.Admin]}
            >
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path={ROUTES.RESOURCES} 
          element={
            <ProtectedRoute
              allowableScopes={[UserScopes.User, UserScopes.Admin]}
            >
              <ResourcesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
