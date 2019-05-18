import React, { Component } from 'react';
import { Button, Form, Input, Select, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions';
import './UserCreate.css';

const { Option } = Select;

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: 'student',
      usernameInvalid: false,
      passwordInvalid: false
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleUsername(e) {
    this.setState({ username: e.target.value, usernameInvalid: false });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value, passwordInvalid: false });
  }

  handleRole(role) {
    this.setState({ role });
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.state.username) {
      return this.setState({ usernameInvalid: true });
    }

    if(this.state.password.length < 5) {
      return this.setState({ passwordInvalid: true });
    }

    let user = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    };

    this.props.createUser(user);
  }

  render() {
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };

    const usernameError = 'Please, enter unique username';
    const passwordError = 'Password should be 5 characters long';

    return (
      <div className="UserCreate">
        <Form {...formItemLayout} onSubmit={this.submitForm} >
          <section>
            <h3 className='section-header'>Main</h3>
            <Form.Item
              required
              validateStatus={this.state.usernameInvalid ? 'error' : ''}
              help={this.state.usernameInvalid ? usernameError : ''}
              label='Username'
            >
              <Input allowClear onChange={this.handleUsername} />
            </Form.Item>
            <Form.Item
              required
              validateStatus={this.state.passwordInvalid ? 'error' : ''}
              help={this.state.passwordInvalid ? passwordError : ''}
              label='Password'
            >
              <Input.Password
                allowClear
                onChange={this.handlePassword}
                prefix={
                  <Tooltip title='Minimum length: 5 characters'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item label='Role'>
              <Select onChange={this.handleRole} defaultValue='student'>
                <Option default value='student'>Student</Option>
                <Option value='employee'>Employee</Option>
                <Option value='service'>Service Worker</Option>
                <Option value='dean'>Dean</Option>
                <Option value='commandant'>Commandant</Option>
                <Option value='admin'>Admin</Option>
              </Select>
            </Form.Item>
          </section>
        </Form>
        <Button
          onClick={this.submitForm}
          className='user-create-submit'
          htmlType='submit'
          type='primary'
        >
          Register
        </Button>
      </div>
    );
  }
}

export default connect(null, { createUser })(UserCreate);
