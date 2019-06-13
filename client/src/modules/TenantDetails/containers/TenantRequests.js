import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadRequests } from '../redux/actions/TenantRequests';

class TenantRequests extends Component {
  componentDidMount() {
    this.props.loadRequests(this.props.username);
  }

  render() {
    return (
      <div>
        <p>Requests</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.tenantRequests.list,
  page: state.tenantRequests.page,
  hasNextPage: state.tenantRequests.hasNextPage,
  hasPrevPage: state.tenantRequests.hasPrevPage,
  totalDocs: state.tenantRequests.totalDocs,
  totalPages: state.tenantRequests.totalPages,
  loading: state.tenantRequests.loading
});

export default connect(mapStateToProps, {
  loadRequests
})(TenantRequests);
