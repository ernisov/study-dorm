import React from 'react';
import moment from 'moment';
import './Settlement.css';
import i18next from '../../../i18n/i18n';

const Settlement = (props) => {
  let text = null;
  if (props.action === 'settle') {
    text = (
      <p>
        <span>{props.username}</span>
        {`${i18next.t('settlements.settlement.settle')} ${i18next.t('settlements.settlement.to')}`}
        <span>{props.to}</span>
      </p>
    );
  } else if (props.action === 'unsettle') {
    text = (
      <p>
        <span>{props.username}</span>
        {`${i18next.t('settlements.settlement.unsettle')} ${i18next.t('settlements.settlement.from')}`}
        <span>{props.from}</span>
      </p>
    );
  } else {
    text = (
      <p>
        <span>{props.username}</span>
        {`${i18next.t('settlements.settlement.move')} ${i18next.t('settlements.settlement.from')}`}
        <span>{props.from}</span> {i18next.t('settlements.settlement.to')} <span>{props.to}</span>
      </p>
    );
  }

  return (
    <div className='Settlement'>
      <div className='Settlement-info'>
        <p>{`${i18next.t('settlements.settlement.by')}: `}<span>{props.by}</span></p>
        <p>{moment(props.date).format('DD/MM/YYYY HH:mm')}</p>
      </div>
      <div className='Settlement-details'>{text}</div>
    </div>
  );
}

export default Settlement;
