import React, { Component } from 'react';
import { Spin, Select, Modal, Icon, Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import Floor from './Floor';
import RoomDetails from './RoomDetails';
import DormitoryDetails from './DormitoryDetails';
import './Map.css';

import {
  loadRooms,
  clearState,
  unsettleTenant
} from '../redux/actions';

const Option = Select.Option;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: 1,
      room: null,
      modalVisible: false
    };

    this.onFloorSelect = this.onFloorSelect.bind(this);
    this.onRoomClick = this.onRoomClick.bind(this);
  }

  componentDidMount() {
    if (this.props.rooms.length === 0) {
      this.props.loadRooms(this.props.dormitory, this.state.floor);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.room !== null) {
      let room = this.props.rooms.find(room => room.data.id === this.state.room.id);
      if (room && this.state.room.tenants.length !== room.data.tenants.length) {
        this.setState({ room: room.data });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  onRoomClick(id) {
    let room = this.props.rooms.find(r => r.id === id);
    this.setState({ room: room.data });
  }

  onFloorSelect(floor) {
    this.setState({ floor, room: null }, () => {
      this.props.loadRooms(this.props.dormitory, this.state.floor);
    });
  }

  render() {
    return (
      <div className='Map'>
        <div className='room-details-container'>
          <RoomDetails room={this.state.room} unsettleTenant={this.props.unsettleTenant}/>
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
            <Tooltip title='Dormitory details'>
              <Icon
                type='info-circle'
                onClick={() => this.setState({ modalVisible: true })}
              />
            </Tooltip>
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
        <Modal
          title='Dormitory details'
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          footer={null}
        >
          <DormitoryDetails />
        </Modal>
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
  loadRooms,
  clearState,
  unsettleTenant
})(Map);
