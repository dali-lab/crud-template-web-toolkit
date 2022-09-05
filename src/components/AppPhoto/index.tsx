import React, { useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import './styles.scss';

export function AppPhoto() {
  const { selectedBreedPhotoUrl } = useAppSelector((state) => state.dogs);

  return (
    <div className="app-photo">
      <img className='img' src={selectedBreedPhotoUrl} alt='photo' />
    </div>
  );
}

export default AppPhoto;