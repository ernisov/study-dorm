import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { loginUser, loadUser, loadingFalse } from './redux/actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameInvalid: false,
      passwordInvalid: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      this.props.loadUser(accessToken, refreshToken);
    } else {
      this.props.loadingFalse();
    }
  }

  onSubmit() {
    if (!this.state.username) {
      return this.setState({ usernameInvalid: true });
    }
    if (this.state.password.length < 5) {
      return this.setState({ passwordInvalid: true });
    }
    this.props.loginUser(this.state.username, this.state.password);
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value, passwordInvalid: false });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value, usernameInvalid: false });
  }

  render() {
    let usernameError = 'Please, enter your username';
    let passwordError = 'Please, check your password';

    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className="Login">
        <Form className='login-form'>
          <Form.Item
            validateStatus={this.state.usernameInvalid ? 'error' : ''}
            help={this.state.usernameInvalid ? usernameError : ''}
          >
            <Input
              prefix={<Icon type='user' style={{color: 'rgba(0, 0, 0, .25)'}} />}
              onChange={this.onUsernameChange}
              allowClear
              placeholder='username'
              value={this.state.username}/>
          </Form.Item>
          <Form.Item
            validateStatus={this.state.passwordInvalid ? 'error' : ''}
            help={this.state.passwordInvalid ? passwordError : ''}
          >
            <Input.Password
              prefix={<Icon type='lock' style={{color: 'rgba(0, 0, 0, .25)'}} />}
              onChange={this.onPasswordChange}
              allowClear
              placeholder='password'
              value={this.state.password}/>
          </Form.Item>
          <Button
            onClick={this.onSubmit}
            type='primary'
            className='login-form-submit'
          >
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading
});

export default connect(mapStateToProps, {
  loginUser,
  loadUser,
  loadingFalse
})(Login);
