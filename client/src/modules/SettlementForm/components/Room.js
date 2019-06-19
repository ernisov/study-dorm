import React from 'react';
import './Room.css';
import i18next from '../../../i18n/i18n';

export default ({ number, dormitory, floor, tenants, active, id, onClick, maxTenants }) => {
  let roomNumber = `${dormitory}/${floor}` + (number > 9 ? number : `0${number}`);
  let classes = ['SettlementForm-Room'];

  if (active) classes.push('Room-Selected');

  const renderTenants = () => {
    return tenants.map(t => {
      return (
        <li key={t._id}>
          <div>
            <p>{`${t.firstName} ${t.lastName}`}</p>
            <p>{`${t.username} - ${i18next.t('roles.' + t.role)}`}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div onClick={() => onClick(id)} className={classes.join(' ')}>
      <h5>{roomNumber}</h5>
      <p>{`${i18next.t('settlementForm.available')}: ${(maxTenants || 4) - tenants.length}`}</p>
      {tenants.length > 0 ? (
        <ul>
          {renderTenants()}
        </ul>
      ) : <p>{i18next.t('settlementForm.noResidents')}</p>}
    </div>
  );
}
