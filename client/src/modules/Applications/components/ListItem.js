import React from 'react';
import moment from 'moment';
import { Button } from 'antd';
import '../Applications.css';
import i18next from '../../../i18n/i18n';

export default ({ item, changeApplicationStatus, status }) => (
  <div className='application-item'>
    <div className='info'>
      <p className='fullname'>
        {`${item.firstName} ${item.lastName}`}
      </p>
      <section>
        <label>{`${i18next.t('applications.birthDate')}: `}</label>
        <p>{moment(item.birthDate).format('DD/MM/YYYY')}</p>
      </section>
      <section>
        <label>{`${i18next.t('applications.passportNumber')}: `}</label>
        <p>{item.passportNumber}</p>
      </section>
      <section>
        <label>{`${i18next.t('applications.issuedBy')}: `}</label>
        <p>{item.passportMKK}</p>
      </section>
    </div>
    <div className='application-buttons'>
      <Button
        type='primary'
        disabled={status !== 'unconsidered'}
        ghost
        className='button'
        onClick={() => changeApplicationStatus(item._id, 'approved')}
      >
        {i18next.t('applications.approve')}
      </Button>
      <Button
        disabled={status !== 'unconsidered'}
        type='danger'
        ghost
        className='button'
        onClick={() => changeApplicationStatus(item._id, 'rejected')}
      >
        {i18next.t('applications.reject')}
      </Button>
    </div>
  </div>
);
