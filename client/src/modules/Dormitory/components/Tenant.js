import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Tooltip } from 'antd';
import './Tenant.css';

export default (props) => (
  <div className='RoomDetails-Tenant'>
    <div className='RoomDetails-Tenant-info'>
      <p className='RoomDetails-Tenant-fullName'>{`${props.firstName} ${props.lastName}`}</p>
      <div className='RoomDetails-Tenant-row'>
        <p className='RoomDetails-Tenant-role'>{props.role}</p>
        <div className='RoomDetails-Tenant-actions'>
          <Tooltip title='move'>
            <Link className='RoomDetails-Icon' to={`/tenants/${props.username}`}>
              <Icon type='swap' />
            </Link>
          </Tooltip>
          <Tooltip title='unsettle'>
            <Link className='RoomDetails-Icon' to={`/tenants/${props.username}`}>
              <Icon type='close-circle' />
            </Link>
          </Tooltip>
          <Tooltip title={`see ${props.firstName}'s details`}>
            <Link className='RoomDetails-Icon' to={`/tenants/${props.username}`}>
              <Icon type='info-circle' />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
);
