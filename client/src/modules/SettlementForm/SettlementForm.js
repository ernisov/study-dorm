import React, { Component } from 'react';
import { allowedRoles } from '../../hoc/allowedRoles';

class SettlementForm extends Component {
  render() {
    let { username, action } = this.props.location.state;
    return (
      <div>
        <h3>Settlement Form</h3>
        <p>{`${username} - ${action}`}</p>
      </div>
    );
  }
}

export default allowedRoles([
  'admin',
  'commandant'
])(SettlementForm);
