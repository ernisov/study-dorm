import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Input,
  Label,
  Form,
  FormGroup,
  FormFeedback
} from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser, loadUser, loadingFalse } from './redux/actions';
import Button from './components/Button';
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
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className="Login">
        <div className='login-form'>
          <Form>
            <FormGroup>
              <Label>Username</Label>
              <Input
                invalid={this.state.usernameInvalid}
                type='text'
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
              <FormFeedback>Enter username</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                invalid={this.state.passwordInvalid}
                type='password'
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              <FormFeedback>Password should be 5 characters long</FormFeedback>
            </FormGroup>
            <Button onClick={this.onSubmit} loading={this.props.loading}>Submit</Button>
          </Form>
        </div>
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
