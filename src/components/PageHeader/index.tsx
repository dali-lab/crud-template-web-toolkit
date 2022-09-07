import React, { useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import './styles.scss';

interface AppPhotoProps {
  title: string,
  children: React.ReactNode;
}

const PageHeader = ({ title, children }: AppPhotoProps) => {
  const navigate = useNavigate();
  return (
    <div className='page-header'>
      <BsBoxArrowLeft
        className='button'
        onClick={() => navigate(-1)}
        style={{fontSize: '40'}}
      />
      <h1>{title}</h1>
      {<>{children}</>}
    </div>
  );
}

export default PageHeader;