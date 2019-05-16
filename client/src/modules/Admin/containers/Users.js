import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './Users.css';

class Users extends Component {
  render() {
    return (
      <div className="Users">
        <div className="Users-header">
          <h2>Users</h2>
          <Link
            to={`${this.props.match.path}/create`}
            className="Users-create">Add user</Link>
        </div>
        <div>
          <h3>List</h3>
        </div>
      </div>
    );
  }
}

export default Users;
