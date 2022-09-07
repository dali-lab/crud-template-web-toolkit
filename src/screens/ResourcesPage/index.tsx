import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import PageHeader from '../../components/PageHeader';
import { UserScopes } from '../../redux/slices/userSlice';
import ForbiddenPage from '../ForbiddenPage';

function ResourcePage() {
  return (
    <div className='container'>
      <PageHeader
        title='Resource Page'
      >
      </PageHeader>
    </div>
  );
}

export default ResourcePage;
