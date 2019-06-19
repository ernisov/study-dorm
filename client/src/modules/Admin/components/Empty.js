import React from 'react';
import i18next from '../../../i18n/i18n';

export default (props) => (
  <div>
    <p>{i18next.t('users.empty')}</p>
  </div>
);
