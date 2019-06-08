import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { setup } from './redux/actions';
import './AppLoading.css';

class AppLoading extends Component {
  componentDidMount() {
    this.props.setup();
  }

  render() {
    if (this.props.appReady) return this.props.children;

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

export default connect(mapStateToProps, { setup })(AppLoading);
