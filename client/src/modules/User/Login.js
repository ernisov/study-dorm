import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';
import {
  onUsernameChange,
  onPasswordChange,
  onSubmit
} from './redux/loginFormActions';
import './Login.css';

class Login extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className="Login">
        <Form className='login-form'>
          <Form.Item
            validateStatus={this.props.usernameInvalid ? 'error' : ''}
            help={this.props.usernameInvalid ? this.props.usernameError : ''}
          >
            <Input
              prefix={<Icon type='user' style={{color: 'rgba(0, 0, 0, .25)'}} />}
              onChange={this.props.onUsernameChange}
              allowClear
              placeholder='username'
              value={this.props.username}/>
          </Form.Item>
          <Form.Item
            validateStatus={this.props.passwordInvalid ? 'error' : ''}
            help={this.props.passwordInvalid ? this.props.passwordError : ''}
          >
            <Input.Password
              prefix={<Icon type='lock' style={{color: 'rgba(0, 0, 0, .25)'}} />}
              onChange={this.props.onPasswordChange}
              allowClear
              placeholder='password'
              value={this.props.password}/>
          </Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            className='login-form-submit'
            onClick={this.props.onSubmit}
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
  username: state.loginForm.username,
  password: state.loginForm.password,
  usernameInvalid: state.loginForm.usernameInvalid,
  passwordInvalid: state.loginForm.passwordInvalid,
  passwordError: state.loginForm.passwordError,
  usernameError: state.loginForm.usernameError
});

export default connect(mapStateToProps, {
  onUsernameChange,
  onPasswordChange,
  onSubmit
})(Login);
