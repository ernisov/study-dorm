import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { setup } from './redux/actions';
import './AppLoading.css';

class AppLoading extends Component {
  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }
    this.props.setup();
  }

  render() {
    if (this.props.appReady) {
      return this.props.children;
    };

    return (
      <div className='AppLoading'>
        <Spin size='large' />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appReady: state.app.appReady
});

export default withRouter(connect(mapStateToProps, { setup })(AppLoading));
