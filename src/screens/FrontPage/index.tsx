import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
// import { ModalSelect } from '../../components/ModalSelect';
import AppPhoto from '../../components/AppPhoto';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

function FrontPage() {
  return (
    <div className='container'>
      <AppPhoto
        url={require('../../assets/dali_dark.png')}
      >
      </AppPhoto>
      <div>
        <h1>DALI Crud Template</h1>
      </div>
      <Link to={ROUTES.SIGNIN}>
        <h1>Sign In</h1>
      </Link>
      <Link to={ROUTES.SIGNUP}>
        <h1>Sign Up</h1>
      </Link>
      <Link to={ROUTES.USERS}>
        <h1>Users (admin only)</h1>
      </Link>
      <Link to={ROUTES.RESOURCES}>
        <h1>Resources (user or admin)</h1>
      </Link>
    </div>
  );
}

export default FrontPage;
