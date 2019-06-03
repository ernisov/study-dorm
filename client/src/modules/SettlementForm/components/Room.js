import React from 'react';
import './Room.css';

export default ({ number, dormitory, floor, tenants, active, id, onClick, maxTenants }) => {
  let roomNumber = `${dormitory}/${floor}` + (number > 9 ? number : `0${number}`);
  let classes = ['SettlementForm-Room'];

  if (active) classes.push('Room-Selected');

  const renderTenants = () => {
    return tenants.map(t => {
      return (
        <li>
          <div>
            <p>{`${t.firstName} ${t.lastName}`}</p>
            <p>{`${t.username} - ${t.role}`}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div onClick={() => onClick(id)} className={classes.join(' ')}>
      <h5>{roomNumber}</h5>
      <p>{`Available: ${(maxTenants || 4) - tenants.length}`}</p>
      {tenants.length > 0 ? (
        <ul>
          {renderTenants()}
        </ul>
      ) : <p>No residents</p>}
    </div>
  );
}
