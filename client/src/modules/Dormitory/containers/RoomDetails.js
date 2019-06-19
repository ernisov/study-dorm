import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import './RoomDetails.css';
import Tenant from '../components/Tenant';
import i18next from '../../../i18n/i18n';

class RoomDetails extends Component {
  constructor(props) {
    super(props);
    this.getRoomNumber = this.getRoomNumber.bind(this);
    this.getRoomType = this.getRoomType.bind(this);
  }

  getRoomNumber() {
    let { dormitory, floor, number } = this.props.room;
    let digits = number < 10 ? `0${number}` : number;
    return `${dormitory}/${floor}${digits}`;
  }

  getRoomType() {
    switch (this.props.room.type) {
      case 'R':
        return i18next.t('dormitory.roomTypes.room');

      case 'C':
        return i18next.t('dormitory.roomTypes.corridor');

      case 'WC':
        return i18next.t('dormitory.roomTypes.wc');

      case 'B':
        return i18next.t('dormitory.roomTypes.bathroom');

      case 'K':
        return i18next.t('dormitory.roomTypes.kitchen');
    }
  }

  render() {
    if (!this.props.room) return <p>{i18next.t('dormitory.selectRoom')}</p>;
    return (
      <div className='RoomDetails'>
        <header className='room-header'>
          <h3 className='room-number'>{this.getRoomNumber()}</h3>
          <p className='room-type'>{this.getRoomType()}</p>
        </header>
        <div className='room-tenants-container'>
          <h6>{i18next.t('dormitory.tenants')}</h6>
          {this.props.room.tenants.map(tenant => (
            <Tenant
              room={this.props.room.id}
              {...tenant}
              key={tenant.username}
              unsettle={() => this.props.unsettleTenant({
                username: tenant.username,
                room: this.props.room.id
              })}
            />
          ))}
        </div>
        <Button
          type='primary'
          onClick={() => this.props.history.push(`/dormitory/add-tenant/${this.props.room.id}`)}
          disabled={!this.props.room.available}
        >
          {i18next.t('dormitory.addTenant')}
        </Button>
      </div>
    );
  }
}

export default withRouter(RoomDetails);
