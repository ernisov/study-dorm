import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';
import './Commandant.css';

import Sidebar from './components/Sidebar';
import Empty from './components/Empty';
import Announcements from './containers/Announcements';
import AnnouncementCreate from './containers/AnnouncementCreate';
import AnnouncementEdit from './containers/AnnouncementEdit';


const SubMenu = Menu.SubMenu;

class Commandant extends Component {
  render() {
    return (
      <div className="Commandant">
        <Sidebar>
          <Menu mode='inline' defaultOpenKeys={['announcements']}>
            <SubMenu
              key='announcements'
              title={
                <span className='side-menu-item'>
                  <Icon type='announcement' />
                  Announcements
                </span>
              }
            >
              <Menu.Item>
                <Link to={`${this.props.match.path}/announcements`}>List</Link>
              </Menu.Item>
              {['admin', 'commandant'].includes(this.props.user.role) && (
                <Menu.Item>
                  <Link to={`${this.props.match.path}/announcements/create`}>Create</Link>
                </Menu.Item>
              )}
            </SubMenu>
          </Menu>
        </Sidebar>
        <main className="main">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/announcements`}
              component={Announcements} />
            <Route
              exact
              path={`${this.props.match.path}/announcements/create`}
              component={AnnouncementCreate} />
            <Route
              path={`${this.props.match.path}/announcements/:id/edit`}
              component={AnnouncementEdit} />
            <Route path={this.props.match.path} component={Empty} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const roles = ['commandant', 'admin', 'student', 'employee'];

export default allowedRoles(roles)(connect(mapStateToProps)(Commandant));
