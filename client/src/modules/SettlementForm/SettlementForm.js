import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Select, Button } from 'antd';
import { allowedRoles } from '../../hoc/allowedRoles';
import './SettlementForm.css';
import RoomsList from './containers/RoomsList';
import {
  changeDormitory,
  changeFloor,
  loadRooms,
  onRoomSelect,
  submit
} from './redux/actions';

const { Option } = Select;

class SettlementForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

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

  onSubmit() {
    let { action, user } = this.props.location.state;
    let { activeRoom } = this.props;
    this.props.submit(user, action, activeRoom, () => {
      this.props.history.goBack();
    });
  }

  render() {
    let { action } = this.props.location.state;
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
            </Select>
          </div>
        </div>
        <RoomsList
          rooms={this.props.rooms}
          dormitory={this.props.dormitory}
          floor={this.props.floor}
          loading={this.props.loading}
          active={this.props.activeRoom}
          onRoomSelect={this.props.onRoomSelect}
        />
        <Button
          className='SettlementForm-submit'
          onClick={this.onSubmit}
          type='primary'
        >
          {action}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rooms: state.settlementForm.rooms,
  dormitory: state.settlementForm.dormitory,
  floor: state.settlementForm.floor,
  loading: state.settlementForm.loading,
  activeRoom: state.settlementForm.activeRoom
});

export default allowedRoles([
  'admin',
  'commandant'
])(
  connect(mapStateToProps, {
    changeDormitory,
    changeFloor,
    loadRooms,
    onRoomSelect,
    submit
  })(withRouter(SettlementForm))
);
