import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Route } from 'react-router-dom';
import { logoutUser } from '../User/redux/actions';

import Admins from './Admins';
import Users from './Users';

class Home extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        <button onClick={this.props.logoutUser}>Log out</button>

        <nav>
          <ul>
            <li><Link to='/admins'>Admins Only</Link></li>
            <li><Link to='/users'>Users</Link></li>
          </ul>
        </nav>

        <Route path='/admins' component={Admins} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps, {
  logoutUser
})(Home);
