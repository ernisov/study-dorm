import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Tooltip, Button } from 'antd';
import './Tenant.css';
import i18next from '../../../i18n/i18n';

export default (props) => (
  <div className='RoomDetails-Tenant'>
    <div className='RoomDetails-Tenant-info'>
      <p className='RoomDetails-Tenant-fullName'>{`${props.firstName} ${props.lastName}`}</p>
      <div className='RoomDetails-Tenant-row'>
        <p className='RoomDetails-Tenant-role'>{i18next.t('roles.' + props.role)}</p>
        <div className='RoomDetails-Tenant-actions'>
          <Tooltip title={i18next.t('dormitory.actions.move')}>
            <Link
              className='RoomDetails-Icon'
              to={{
                pathname: '/settlement-form',
                state: {
                  action: 'move',
                  user: { username: props.username, room: props.room }
                }
              }}
            >
              <Icon type='swap' />
            </Link>
          </Tooltip>
          <Tooltip title={i18next.t('dormitory.actions.unsettle')}>
            <a href='javascript:void(0)' className='RoomDetails-Icon' onClick={props.unsettle}>
              <Icon type='close-circle' />
            </a>
          </Tooltip>
          <Tooltip title={i18next.t('dormitory.actions.tenantDetails')}>
            <Link className='RoomDetails-Icon' to={`/tenants/${props.username}`}>
              <Icon type='info-circle' />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
);
