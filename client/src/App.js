import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { message } from 'antd';
import { connect } from 'react-redux';
import Home from './modules/Home/Home';
import Login from './modules/User/Login';
import Docs from './modules/Docs/Docs';
import AppLoading from './modules/AppLoading/AppLoading';
import './App.css';

class App extends Component {
  componentDidMount() {
    message.config({
      top: 50,
      duration: 1
    })
  }

  render() {
    return (
      <AppLoading>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/docs' component={Docs} />
          <Route path='/' component={Home} />
        </Switch>
      </AppLoading>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(App);
