import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';

import Admin from '../Admin/Admin';
import Dormitory from '../Dormitory/Dormitory';
import Announcements from '../Announcements/Announcements';
import Requests from '../Requests/Requests';
import ApplyForm from '../Apply/ApplyForm';

import './Home.css';

class Home extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="App">
        <div className="AppNavBar">
          <AppHeader />
        </div>
        <div className="AppContent">
          <Route path='/dormitory' component={Dormitory} />
          <Route path='/admins' component={Admin} />
          <Route path='/announcements' component={Announcements} />
          <Route path='/requests' component={Requests} />
          <Route path='/apply' component={ApplyForm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(Home);
