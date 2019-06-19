import React from 'react';
import './EmptyScreen.css';
import i18next from '../../../i18n/i18n';

export default () => (
  <div className='HomeEmptyScreen'>
    <h2>{i18next.t('welcome.header')}</h2>
    <p>{i18next.t('welcome.text')}</p>
  </div>
);
