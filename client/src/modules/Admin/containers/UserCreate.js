import React, { Component } from 'react';
import { Button, Form, Input, Select, Icon, Tooltip } from 'antd';
import './UserCreate.css';

const { Option } = Select;

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      usernameValid: true,
      passwordValid: true,
      roleValid: true
    };
  }

  handleUsername() {

  }

  handlePassword() {

  }

  handleRole() {

  }

  submitForm() {
    console.log('submitForm');
  }

  render() {
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };

    return (
      <div className="UserCreate">
        <Form {...formItemLayout} onSubmit={this.submitForm} >
          <section>
            <h3 className='section-header'>Main</h3>
            <Form.Item
              required
              label='Username'
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              required
              label='Password'
            >
              <Input.Password
                allowClear
                prefix={
                  <Tooltip title='Minimum length: 5 characters'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item required label='Role'>
              <Select>
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

export default UserCreate;
