import React from 'react';
import moment from 'moment';
import { Button } from 'antd';
import '../Applications.css';

export default ({ item, approve, reject, status }) => (
  <div className='application-item'>
    <div className='info'>
      <p className='fullname'>
        {`${item.firstName} ${item.lastName}`}
      </p>
      <section>
        <label>Birth Date: </label>
        <p>{moment(item.birthDate).format('DD/MM/YYYY')}</p>
      </section>
      <section>
        <label>Passport Number: </label>
        <p>{item.passportNumber}</p>
      </section>
      <section>
        <label>Issued By: </label>
        <p>{item.passportMKK}</p>
      </section>
    </div>
    <div className='application-buttons'>
      <Button
        type='primary'
        disabled={status !== 'unconsidered'}
        ghost
        className='button'
        onClick={() => approve(item._id)}
      >
        Approve
      </Button>
      <Button
        disabled={status !== 'unconsidered'}
        type='danger'
        ghost
        className='button'
        onClick={() => reject(item._id)}
      >
        Reject
      </Button>
    </div>
  </div>
);
