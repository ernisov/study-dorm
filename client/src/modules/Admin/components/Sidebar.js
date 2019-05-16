import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../Admin.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;
