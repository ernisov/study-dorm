import React from 'react';
import { Link } from 'react-router-dom';
import './Tenant.css';

export default (props) => (
  <Link to={`/tenants/${props.username}`}>
    <div className='RoomDetails-Tenant'>
      <p className='RoomDetails-Tenant-fullName'>{`${props.firstName} ${props.lastName}`}</p>
      <p className='RoomDetails-Tenant-role'>{props.role}</p>
    </div>
  </Link>
);
