import React, { Component } from 'react';
import { Button, Form, Input, Select, Icon, Tooltip, message } from 'antd';
import { request } from '../../../api/requests';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions';
import './UserCreate.css';

const { Option } = Select;

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'student',
      usernameInvalid: false,
      passwordInvalid: false,
      firstNameInvalid: false,
      lastNameInvalid: false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      let { username, password, firstName, lastName, role } = this.props.user;
      this.setState({ username, password, firstName, lastName, role });
    }
  }

  handleUsername(e) {
    this.setState({ username: e.target.value, usernameInvalid: false });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value, passwordInvalid: false });
  }

  handleFirstName(e) {
    this.setState({ firstName: e.target.value, firstNameInvalid: false });
  }

  handleLastName(e) {
    this.setState({ lastName: e.target.value, lastNameInvalid: false });
  }

  handleRole(role) {
    console.log(role);
    this.setState({ role });
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.state.username) {
      return this.setState({ usernameInvalid: true });
    }

    if (!this.state.firstName) {
      return this.setState({ firstNameInvalid: true });
    }

    if (!this.state.lastName) {
      return this.setState({ lastNameInvalid: true });
    }

    if(!this.props.edit && this.state.password.length < 5) {
      return this.setState({ passwordInvalid: true });
    }

    let user = {
      username: this.state.username.toLowerCase(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role
    };

    let config;

    if (this.props.edit) {
      config = {
        method: 'patch',
        url: `/users/${this.props.user.username}`,
        data: user
      };
    } else {
      config = {
        method: 'post',
        url: '/users/',
        data: user
      };
      user.password = this.state.password;
    }

    request(config).then((response) => {
      if (response.data.username && response.data.role) {
        if (this.props.edit) {
          this.props.updateUser(this.props.user, response.data);
        }
        message.success(`success.`);
        this.setState({ username: '', password: '', firstName: '', lastName: '', role: 'student' });
      }
    }).catch((err) => {
      console.log(err);
      message.error(`Couldn't perform operation`)
    })
  }

  render() {
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };

    console.log('role', this.state.role);

    const usernameError = 'Please, enter unique username';
    const passwordError = 'Password should be 5 characters long';
    const namesError = 'User must have a name [Valar Morghulis]';

    const passwordComponent = (
      <Form.Item
        required
        validateStatus={this.state.passwordInvalid ? 'error' : ''}
        help={this.state.passwordInvalid ? passwordError : ''}
        label='Password'
      >
        <Input.Password
          allowClear
          onChange={this.handlePassword}
          value={this.state.password}
          prefix={
            <Tooltip title='Minimum length: 5 characters'>
              <Icon type='question-circle-o' />
            </Tooltip>
          }
        />
      </Form.Item>
    );

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
              <Input value={this.state.username} allowClear onChange={this.handleUsername} />
            </Form.Item>
            {!this.props.edit ? passwordComponent : null}
            <Form.Item
              required
              validateStatus={this.state.firstNameInvalid ? 'error' : ''}
              help={this.state.firstNameInvalid ? namesError : ''}
              label='First Name'
            >
              <Input value={this.state.firstName} allowClear onChange={this.handleFirstName} />
            </Form.Item>

            <Form.Item
              required
              validateStatus={this.state.lastNameInvalid ? 'error' : ''}
              help={this.state.lastNameInvalid ? namesError : ''}
              label='Last Name'
            >
              <Input value={this.state.lastName} allowClear onChange={this.handleLastName} />
            </Form.Item>

            <Form.Item label='Role'>
              <Select onChange={this.handleRole} value={this.state.role} defaultValue='student'>
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
          {this.props.edit ? 'Update' : 'Register'}
        </Button>
      </div>
    );
  }
}

export default connect(null, { updateUser })(UserForm);
