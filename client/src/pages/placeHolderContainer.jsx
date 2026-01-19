import React from 'react';
import PlaceHolder from './PlaceHolder';

const PlaceHolderContainer = () => {
  const placeholders = [...Array(12).keys()];
  
  return (
    <section className='py-5' id='shop'>;
      <h4 style={{ textAlign: 'center', color:"GrayText" }}>Loading</h4>
      <div className='container px-4 px-lg-4 mt-5'>
        <div className='row justify-content-center'>
          {placeholders.map(num => <PlaceHolder key={num} />)}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;
