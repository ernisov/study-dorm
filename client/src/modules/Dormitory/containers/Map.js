import React, { Component } from 'react';
import { Spin, Select } from 'antd';
import { connect } from 'react-redux';
import Floor from './Floor';
import RoomDetails from './RoomDetails';
import './Map.css';

import { loadRooms } from '../redux/actions';

const Option = Select.Option;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: 1,
      room: null
    };

    this.onFloorSelect = this.onFloorSelect.bind(this);
    this.onRoomClick = this.onRoomClick.bind(this);
  }

  componentDidMount() {
    if (this.props.rooms.length === 0) {
      this.props.loadRooms(this.props.dormitory, this.state.floor);
    }
  }

  onRoomClick(id) {
    let room = this.props.rooms.find(r => r.id === id);
    this.setState({ room: room.data });
  }

  onFloorSelect(floor) {
    this.setState({ floor }, () => {
      this.props.loadRooms(this.props.dormitory, this.state.floor);
    });
  }

  render() {
    return (
      <div className='Map'>
        <div className='room-details-container'>
          <RoomDetails room={this.state.room} />
        </div>
        <div className='map-container'>
          {this.props.loading ? <Spin size='large' /> : (
            <Floor
              onRoomClick={this.onRoomClick}
              dorm={this.props.dorm}
              rooms={this.props.rooms}
              data={this.props.data} />
          )}
          <div className='floor-select'>
            <label>Floor: </label>
            <Select
              onChange={this.onFloorSelect}
              value={this.state.floor}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rooms: state.dormitory.rooms,
  dorm: state.dormitory.dorm,
  loading: state.dormitory.loading
});

export default connect(mapStateToProps, {
  loadRooms
})(Map);
