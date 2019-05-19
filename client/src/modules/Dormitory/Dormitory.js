import React, { Component } from 'react';
import D1F1 from './data/D1F1';
import './Dormitory.css';

class Dormitory extends Component {
  onClick(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <h3>Dormitory</h3>
        <D1F1 onClick={this.onClick}/>
      </div>
    );
  }
}

export default Dormitory;
