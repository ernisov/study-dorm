import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';
import './Admin.css';
import i18next from '../../i18n/i18n';

import Sidebar from './components/Sidebar';
import Empty from './components/Empty';
import Users from './containers/Users';
import UserCreate from './containers/UserCreate';
import UserEdit from './containers/UserEdit';

const SubMenu = Menu.SubMenu;

class Admin extends Component {
  render() {
    return (
      <div className="Admin">
        <Sidebar>
          <Menu mode='inline' defaultOpenKeys={['users']}>
            <SubMenu
              key='users'
              title={
                <span className='side-menu-item'>
                  <Icon type='user' />
                  {i18next.t('users.title')}
                </span>
              }
            >
              <Menu.Item>
                <Link to={`${this.props.match.path}/users`}>{i18next.t('users.list')}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${this.props.match.path}/users/create`}>{i18next.t('users.create')}</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sidebar>
        <main className="main">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/users`}
              component={Users} />
            <Route
              exact
              path={`${this.props.match.path}/users/create`}
              component={UserCreate} />
            <Route
              path={`${this.props.match.path}/users/:username/edit`}
              component={UserEdit} />
            <Route path={this.props.match.path} component={Empty} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default allowedRoles(['admin'])(connect()(Admin));
