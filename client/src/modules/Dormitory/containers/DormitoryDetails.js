import React, { Component } from 'react';
import { Spin } from 'antd';
import './DormitoryDetails.css';
import * as dormitory from '../../../api/dormitory';

class DormitoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };
  }

  componentDidMount() {
    dormitory.details()
      .then((response) => this.setState({ data: response.data, loading: false }))
      .catch((error) => console.log(error.response));
  }

  render() {
    if (this.state.loading) {
      return (
        <Spin />
      );
    }

    return (
      <div className='DormitoryDetails'>
        {this.state.data.map(floor => (
          <div className='DormitoryDetails-Card'>
            <p>
              dormitory: <span>{floor._id.dormitory}</span>
              floor: <span>{floor._id.floor}</span>
            </p>
            <p>
              total: <span>{floor.totalPlaces}</span>
              occupied: <span>{floor.occupiedPlaces}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default DormitoryDetails;
