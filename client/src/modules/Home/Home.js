import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Header from '../../components/Header';

import Admin from '../Admin/Admin';
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
        <Route path='/admins' component={Admin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(Home);
