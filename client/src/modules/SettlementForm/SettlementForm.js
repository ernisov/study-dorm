import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { allowedRoles } from '../../hoc/allowedRoles';
import './SettlementForm.css';
import RoomsList from './containers/RoomsList';
import {
  changeDormitory,
  changeFloor,
  loadRooms
} from './redux/actions';

const { Option } = Select;

class SettlementForm extends Component {
  componentDidMount() {
    if (this.props.rooms.length < 1) {
      this.props.loadRooms(this.props.dormitory, this.props.floor);
    }
  }

  componentDidUpdate(prevProps) {
    let { dormitory, floor } = this.props;

    if (prevProps.dormitory !== dormitory || prevProps.floor !== floor) {
      this.props.loadRooms(dormitory, floor);
    }
  }

  render() {
    let { username, action } = this.props.location.state;
    return (
      <div className='SettlementForm'>
        <h3>Choose the room:</h3>
        <div className='row'>
          <div className='row-item'>
            <label>Dormitory:</label>
            <Select
              className='settlement-select'
              onChange={this.props.changeDormitory}
              defaultValue={1}
              value={this.props.dormitory}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
          </div>
          <div className='row-item'>
            <label>Floor:</label>
            <Select
              className='settlement-select'
              defaultValue={1}
              onChange={this.props.changeFloor}
              value={this.props.floor}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
          </div>
        </div>
        <RoomsList
          rooms={this.props.rooms}
          dormitory={this.props.dormitory}
          floor={this.props.floor}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rooms: state.settlementForm.rooms,
  dormitory: state.settlementForm.dormitory,
  floor: state.settlementForm.floor,
  loading: state.settlementForm.loading
});

export default allowedRoles([
  'admin',
  'commandant'
])(
  connect(mapStateToProps, {
    changeDormitory,
    changeFloor,
    loadRooms
  })(SettlementForm)
);
