import React from 'react';
import moment from 'moment';
import './Settlement.css';

const Settlement = (props) => {
  let text = null;
  if (props.action === 'settle') {
    text = (
      <p>
        <span>{props.username}</span>
        was settled to
        <span>{props.to}</span>
      </p>
    );
  } else if (props.action === 'unsettle') {
    text = (
      <p>
        <span>{props.username}</span>
        was unsettled from
        <span>{props.from}</span>
      </p>
    );
  } else {
    text = (
      <p>
        <span>{props.username}</span>
        was moved
        <span>{props.from}</span> to <span>{props.to}</span>
      </p>
    );
  }

  return (
    <div className='Settlement'>
      <div className='Settlement-info'>
        <p>by: <span>{props.by}</span></p>
        <p>{moment(props.date).format('DD/MM/YYYY HH:mm')}</p>
      </div>
      <div className='Settlement-details'>{text}</div>
    </div>
  );
}

export default Settlement;
