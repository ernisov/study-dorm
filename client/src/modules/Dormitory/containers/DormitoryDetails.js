import React, { Component } from 'react';
import { Spin } from 'antd';
import './DormitoryDetails.css';
import _ from 'lodash';
import i18next from '../../../i18n/i18n';
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
        <table>
          <thead>
            <tr>
              <th>{i18next.t('dormitoryDetails.dormitory')}</th>
              <th>{i18next.t('dormitoryDetails.floor')}</th>
              <th>{i18next.t('dormitoryDetails.total')}</th>
              <th>{i18next.t('dormitoryDetails.occupied')}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data
                .sort((a, b) => `${a._id.dormitory}${a._id.floor}` - `${b._id.dormitory}${b._id.floor}`) // done to order by dorm and floor
                .map(floor => (
                  <tr>
                    <td>{floor._id.dormitory}</td>
                    <td>{floor._id.floor}</td>
                    <td>{floor.totalPlaces}</td>
                    <td>{floor.occupiedPlaces}</td>
                  </tr>
                ))
            }
            <tr className='Summary'>
              <td colspan={2}>{i18next.t('dormitoryDetails.summary')}</td>
              <td>{this.state.data.reduce((acc, current) => acc + current.totalPlaces, 0)}</td>
              <td>{this.state.data.reduce((acc, current) => acc + current.occupiedPlaces, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DormitoryDetails;
