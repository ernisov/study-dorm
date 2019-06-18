import React, { Component } from 'react';
import './DormitoryDetails.css';

class DormitoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      available: 0,
      occupied: 0,
      loading: true
    };
  }

  render() {
    return (
      <div>
        <p>Somebody once told me</p>
      </div>
    );
  }
}

export default DormitoryDetails;
