import React, { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { checkConnection } from '../redux/slices/connectionSlice';
import FrontPage from './FrontPage';
import ErrorPage from './ErrorPage';

function App() {
  const { isConnected } = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkConnection());
  }, [])

  if (!isConnected) return <ErrorPage />

  return <FrontPage />
}

export default App;
