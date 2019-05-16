import React, { Component } from 'react';
import { Button } from 'antd';
import './UserCreate.css';

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
    return (
      <div className="UserCreate">
        <section>
          <h3>Main Information:</h3>
          <form className="main-form">
            <div className="input-row">
              <label>username:</label>
              <input
                id='username'
                type='text'
                placeholder='username' />
            </div>
            <div className="input-row">
              <label>password:</label>
              <input
                id='password'
                type='password'
                placeholder='password' />
            </div>
            <div className="input-row">
              <label>role:</label>
              <select id='role'>
                <option value='admin'>Admin</option>
                <option value='student'>Student</option>
                <option value='employee'>Employee</option>
                <option value='service'>Service Worker</option>
                <option value='dean'>Dean</option>
                <option value='commandant'>Commandant</option>
              </select>
            </div>
          </form>
        </section>
        <Button type='primary'>Create</Button>
      </div>
    );
  }
}

export default UserCreate;
