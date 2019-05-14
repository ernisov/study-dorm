import React from 'react';
import { MetroSpinner } from 'react-spinners-kit';

export default (props) => {
  return (
    <div className='login-submit' onClick={props.onClick}>
      {props.loading ? (
        <MetroSpinner
          color='#ffffff'
          size={18}
        />
      ) : props.children}
    </div>
  );
};
