import React, { Component } from 'react';
import './Dormitory.css';

class Dormitory extends Component {
  onClick(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <h3>Dormitory</h3>
      </div>
    );
  }
}

export default Dormitory;
