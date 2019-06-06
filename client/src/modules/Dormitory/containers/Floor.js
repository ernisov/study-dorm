import React, { Component } from 'react';
import Room from '../components/Room';
import Dorm from '../components/Dorm';

class Floor extends Component {
  constructor(props) {
    super(props);
    this.renderRooms = this.renderRooms.bind(this);
  }

  renderRooms() {
    return this.props.rooms.map(room => {

      if (!room.data) {
        console.log(room);
      }

      return (
        <Room
          onClick={this.props.onRoomClick}
          {...room}
          key={room.id}
          fill='#e8e8e8'
          stroke='#000' />
      );
    });
  }

  render() {
    return (
      <Dorm dorm={this.props.dorm}>
        {this.renderRooms()}
      </Dorm>
    );
  }
}

export default Floor;
