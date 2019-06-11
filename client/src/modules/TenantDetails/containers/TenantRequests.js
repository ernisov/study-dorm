import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../redux/actions/TenantRequests';

class TenantRequests extends Component {
  render() {
    return (
      <div>
        <p>Requests</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(TenantRequests);
