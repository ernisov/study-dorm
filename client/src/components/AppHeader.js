import React, { Component } from 'react';
import { Menu, Icon, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../modules/User/redux/actions';
import routes from '../routes/routes';
import './AppHeader.css';

const SubMenu = Menu.SubMenu;

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
    };
    this.renderItems = this.renderItems.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderItems() {
    let menu = [];
    routes.forEach(route => {
      if (route.roles.includes(this.props.role)) {
        let item = (
          <Menu.Item key={route.href}>
            <Link to={route.href}>
              <span className="nav-item">
                <Icon type={route.icon} />
                {route.title}
              </span>
            </Link>
          </Menu.Item>
        );
        menu.push(item);
      }
    });
    return menu;
  }

  handleClick(e) {
    this.setState({ current: e.key });
  }

  render() {
    let docs = (
      <Menu.Item>
        <Link to='/docs'>Documentation</Link>
      </Menu.Item>
    );

    let dropdown = (
      <SubMenu title={
        <span className='nav-item'>
          <Icon type='user' />
          {this.props.username}
        </span>
      }>
        <Menu.Item>
          <Link to='/profile'>Profile</Link>
        </Menu.Item>
        {this.props.role === 'admin' && docs}
        <Menu.Item onClick={this.props.logoutUser}>
          Log out
        </Menu.Item>
      </SubMenu>
    );

    return (
      <Row type='flex' className='Header'>
        <Col span={2}>
          <div className='logo'>
            <Link to='/' className='logo-link'>Logo</Link>
          </div>
        </Col>
        <Col span={19} offset={3}>
          <Menu
            style={{ borderBottom: 'none' }}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode='horizontal'
          >
            {this.renderItems()}
            {dropdown}
          </Menu>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.user.role,
  username: state.user.username
});

export default connect(mapStateToProps, { logoutUser })(AppNavBar);
