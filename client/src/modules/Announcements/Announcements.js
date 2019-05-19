import React, { Component } from 'react';
import { connect } from 'react-redux';

class Announcements extends Component {
  render() {
    return (
      <h3>Announcements</h3>
    );
  }
}

export default connect()(Announcements);
