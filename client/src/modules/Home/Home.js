import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';

import Admin from '../Admin/Admin';
import Commandant from '../Announcements/Commandant';
import Dormitory from '../Dormitory/Dormitory';
import Requests from '../Requests/Requests';
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import Applications from '../Applications/Applications';
import Tenants from '../Tenants/Tenants';
import TenantDetails from '../TenantDetails/TenantDetails';
import SettlementForm from '../SettlementForm/SettlementForm';
import AddTenant from '../AddTenant/AddTenant';
import RequestForm from '../RequestForm/RequestForm';
import Profile from '../User/Profile';
import Settlements from '../Settlements/Settlements';

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
          <Route path='/dormitory' exact component={Dormitory} />
          <Route path='/dormitory/add-tenant/:room' exact component={AddTenant} />
          <Route path='/users' component={Admin} />
          <Route path='/announcements' component={Commandant} />
          <Route path='/requests' exact component={Requests} />
          <Route path='/requests/create' exact component={RequestForm} />
          <Route path='/apply' component={ApplicationForm} />
          <Route path='/applications' component={Applications} />
          <Route path='/tenants' exact component={Tenants} />
          <Route path='/tenants/:username' exact component={TenantDetails} />
          <Route path='/settlement-form' component={SettlementForm} />
          <Route path='/profile' component={Profile} />
          <Route path='/settlements' component={Settlements} />
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
