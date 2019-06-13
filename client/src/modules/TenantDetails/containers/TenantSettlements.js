import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';

class TenantSettlements extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <p>Tenant Settlements</p>
      </div>
    );
  }
}

export default TenantSettlements;
