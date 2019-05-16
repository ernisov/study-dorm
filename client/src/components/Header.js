import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../modules/User/redux/actions';
import routes from '../routes/routes';

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderItems() {
    let menu = [];
    routes.forEach(route => {
      if (route.roles.includes(this.props.role)) {
        let item = (
          <NavItem key={route.href}>
            <NavLink to={route.href}>{route.title}</NavLink>
          </NavItem>
        );
        menu.push(item);
      }
    });
    let logout = (
      <NavItem key='logout' style={{ cursor: 'pointer' }}>
        <NavLink onClick={this.props.logoutUser}>Log out</NavLink>
      </NavItem>
    );
    menu.push(logout);
    return menu;
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Dorm</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.renderItems()}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.user.role
});

export default connect(mapStateToProps, { logoutUser })(AppNavBar);
