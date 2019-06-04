import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadTenantDetails
} from './redux/actions';
import './TenantDetails.css';

class TenantDetails extends Component {
  componentDidMount() {
    if (this.props.firstName === undefined) {
      this.props.loadTenantDetails(this.props.match.params.username);
    }
  }

  render() {
    return (
      <div className='TenantDetails'>
        <h3>Tenant Details</h3>
        <p>{this.props.match.params.username}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dormitory: state.tenantDetails.dormitory,
  floor: state.tenantDetails.floor,
  room: state.tenantDetails.room,
  firstName: state.tenantDetails.firstName,
  lastName: state.tenantDetails.lastName,
  role: state.tenantDetails.role,
  requests: state.tenantDetails.requests,
  loading: state.tenantDetails.loading,
  requestsLoading: state.tenantDetails.requestsLoading
});

export default connect(mapStateToProps, {
  loadTenantDetails
})(TenantDetails);
