import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';

class Admin extends Component {
  render() {
    return (
      <div>
        <h3>Admin</h3>
      </div>
    );
  }
}

export default allowedRoles(['admin'])(connect()(Admin));
