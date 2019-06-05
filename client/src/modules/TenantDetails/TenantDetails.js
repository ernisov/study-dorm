import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, List } from 'antd';
import {
  loadTenantDetails,
  clearState
} from './redux/actions';
import './TenantDetails.css';

class TenantDetails extends Component {
  componentDidMount() {
    if (this.props.firstName === undefined) {
      this.props.loadTenantDetails(this.props.match.params.username);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='TenantDetails-spin'>
          <Spin size='large' />
        </div>
      );
    }

    let {
      firstName,
      lastName,
      role,
      settlementStatus,
      dormitory,
      floor,
      number
    } = this.props;

    return (
      <div className='TenantDetails'>
        <div className='TenantDetails-main-info'>
          <h3>{`${firstName} ${lastName}`}</h3>
          <p>{role}</p>
        </div>
        <div className='TenantDetails-room'>
          <h5>Room:</h5>
          {settlementStatus === 'not_settled' ? <p>not living</p> : (
            <div className='TenantDetails-room-info'>
              <p><b>dormitory </b>{dormitory} |</p>
              <p><b>floor </b>{floor} |</p>
              <p><b>number </b>{number}</p>
            </div>
          )}
        </div>
        <div className='TenantDetails-requests'>
          <h5>Requests:</h5>
          <List />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dormitory: state.tenantDetails.dormitory,
  floor: state.tenantDetails.floor,
  number: state.tenantDetails.number,
  firstName: state.tenantDetails.firstName,
  lastName: state.tenantDetails.lastName,
  role: state.tenantDetails.role,
  settlementStatus: state.tenantDetails.settlementStatus,
  requests: state.tenantDetails.requests,
  loading: state.tenantDetails.loading,
  requestsLoading: state.tenantDetails.requestsLoading
});

export default connect(mapStateToProps, {
  loadTenantDetails,
  clearState
})(TenantDetails);
