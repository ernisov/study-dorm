import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../modules/User/redux/actions';
import routes from '../routes/routes';
import './Header.css';

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    let menu = [];
    routes.forEach(route => {
      if (route.roles.includes(this.props.role)) {
        let item = (
          <NavLink
            className="nav-item"
            key={route.href}
            to={route.href}
            activeClassName="nav-item-active"
          >
            {route.title}
          </NavLink>
        );
        menu.push(item);
      }
    });
    let logout = (
      <button
        key="logout"
        className="nav-item"
        onClick={this.props.logoutUser}
      >
        Log out
      </button>
    );
    menu.push(logout);
    return menu;
  }

  render() {
    return (
      <header className="Header">
        <NavLink to="/" className="logo">
          Dormitory Service
        </NavLink>
        <nav className="navigation">
          {this.renderItems()}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.user.role
});

export default connect(mapStateToProps, { logoutUser })(AppNavBar);
