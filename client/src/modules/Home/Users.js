import React from 'react';
import { allowedRoles } from '../../hoc/allowedRoles';
import { connect } from 'react-redux';

const Users = (props) => (
  <h3>{props.username}</h3>
);

const mapStateToProps = (state) => ({
  username: state.user.username
});

export default allowedRoles(['student', 'employee', 'admin'])(connect(mapStateToProps)(Users));
