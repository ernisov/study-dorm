import React, { Component } from 'react';

class TenantDetails extends Component {
  render() {
    return (
      <div>
        <h3>Tenant Details</h3>
        <p>{this.props.match.params.username}</p>
      </div>
    );
  }
}

export default TenantDetails;
