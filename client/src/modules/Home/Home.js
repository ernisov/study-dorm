import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Route } from 'react-router-dom';
import Header from '../../components/Header';

import Admins from './Admins';
import Users from './Users';
import Dormitory from '../Dormitory/Dormitory';

class Home extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        <Header />
        <Route path='/dormitory' component={Dormitory} />
        <Route path='/users' component={Users} />
        <Route path='/admins' component={Admins} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(Home);
