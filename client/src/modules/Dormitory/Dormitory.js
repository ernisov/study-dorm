import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Room from './components/Room';
import rooms from './rooms.json';
import './Dormitory.css';

class Dormitory extends Component {
  renderRooms() {
    return rooms.map((room, index) => {
      let offset = index * 2 + index * room.width;
      console.log('offset left', offset);
      return (
        <Room
          key={offset}
          x={offset}
          width={room.width}
          height={room.height}
          fill="#2ad2ac"
        />
      );
    });
  }

  render() {
    return (
      <Container>
        <p>Dormitory</p>
        <div className="row">
          <div style={{ flex: 1, backgroundColor: 'blue' }}>
            <p>sdfsdfsd</p>
          </div>
          <div id="map" style={{ flex: 3, backgroundColor: 'red' }}>
            <svg width="100%">
              {this.renderRooms()}
            </svg>
          </div>
        </div>
      </Container>
    );
  }
}

export default Dormitory;
