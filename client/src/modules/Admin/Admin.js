import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';
import './Admin.css';

import Sidebar from './components/Sidebar';
import Empty from './components/Empty';
import Users from './containers/Users';

class Admin extends Component {
  render() {
    return (
      <div className="Admin">
        <Sidebar>
          <NavLink
            activeClassName="aside-nav-item-active"
            className="aside-nav-item"
            to={`${this.props.match.path}/users`}
          >
            Users
          </NavLink>
        </Sidebar>
        <main className="main">
          <Switch>
            <Route exact path={`${this.props.match.path}/users`} component={Users} />
            <Route path={this.props.match.path} component={Empty} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default allowedRoles(['admin'])(connect()(Admin));
