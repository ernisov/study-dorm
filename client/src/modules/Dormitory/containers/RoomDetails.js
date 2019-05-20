import React, { Component } from 'react';
import { Button } from 'antd';
import './RoomDetails.css';

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
        return 'Room';

      case 'C':
        return 'Corridor';

      case 'WC':
        return 'Water Closet';

      case 'B':
        return 'Bathroom';

      case 'K':
        return 'Kitchen';
    }
  }

  render() {
    if (!this.props.room) return <p>Please, select room</p>;

    return (
      <div className='RoomDetails'>
        <header className='room-header'>
          <h3 className='room-number'>{this.getRoomNumber()}</h3>
          <p className='room-type'>{this.getRoomType()}</p>
        </header>
        <div className='room-tenants-container'>
          <p>{this.props.room.tenants.length} residents.</p>
        </div>
        <Button
          type='primary'
        >
          Add Tenant
        </Button>
      </div>
    );
  }
}

export default RoomDetails;
