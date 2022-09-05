import React from 'react';

import useAppSelector from '../../hooks/useAppSelector';
import { ModalSelect } from '../../components/ModalSelect';
import { AppPhoto } from '../../components/AppPhoto';

function FrontPage() {
  const { selectedBreed } = useAppSelector((state) => state.dogs);
  
  return (
    <div className='container'>
      <AppPhoto />
      <div>
        <h3>Selected breed: {selectedBreed} </h3>
      </div>
      <ModalSelect />
    </div>
  );
}

export default FrontPage;
