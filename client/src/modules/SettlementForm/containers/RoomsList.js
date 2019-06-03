import React, { Component } from 'react';
import { List, Button } from 'antd';
import Room from '../components/Room';
import './RoomsList.css';

class RoomsList extends Component {
  render() {
    return (
      <div className='RoomsList'>
        <List
          dataSource={this.props.rooms}
          renderItem={(item) => {
            let active = false;
            if (item.id === this.props.active) {
              active = true;
            }
            return (
              <Room
                {...item}
                key={item._id}
                active={active}
                onClick={this.props.onRoomSelect}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default RoomsList;
