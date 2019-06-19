import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, List, Tabs } from 'antd';
import {
  loadTenantDetails,
  clearState
} from './redux/actions/TenantDetails';
import './TenantDetails.css';
import { allowedRoles } from '../../hoc/allowedRoles';
import TenantRequests from './containers/TenantRequests';
import TenantSettlements from './containers/TenantSettlements';
import i18next from '../../i18n/i18n';

class TenantDetails extends Component {
  componentDidMount() {
    if (this.props.firstName === undefined) {
      this.props.loadTenantDetails(this.props.match.params.username);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='TenantDetails-spin'>
          <Spin size='large' />
        </div>
      );
    }

    let {
      firstName,
      lastName,
      role,
      settlementStatus,
      dormitory,
      floor,
      number
    } = this.props;
    let { username } = this.props.match.params;

    return (
      <div className='TenantDetails'>
        <div className='TenantDetails-main-info'>
          <h3>{`${firstName} ${lastName}`}</h3>
          <p>{i18next.t('roles.' + role)}</p>
        </div>
        {settlementStatus === 'not_settled' ? <p>not living</p> : (
          <div className='TenantDetails-room-info'>
            <p><b>{i18next.t('tenantDetails.dormitory')} </b>{dormitory} |</p>
            <p><b>{i18next.t('tenantDetails.floor')} </b>{floor} |</p>
            <p><b>{i18next.t('tenantDetails.number')} </b>{number}</p>
          </div>
        )}
        <div>
          <Tabs defaultActiveKey='1'>
            <Tabs.TabPane key='1' tab={i18next.t('tenantDetails.requests')}>
              <TenantRequests username={username} className="TenantDetails-List" />
            </Tabs.TabPane>
            <Tabs.TabPane key='2' tab={i18next.t('tenantDetails.settlements')}>
              <TenantSettlements username={username} className="TenantDetails-List" />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dormitory: state.tenantDetails.dormitory,
  floor: state.tenantDetails.floor,
  number: state.tenantDetails.number,
  firstName: state.tenantDetails.firstName,
  lastName: state.tenantDetails.lastName,
  role: state.tenantDetails.role,
  settlementStatus: state.tenantDetails.settlementStatus,
  loading: state.tenantDetails.loading
});

export default allowedRoles(['admin', 'commandant'])(connect(mapStateToProps, {
  loadTenantDetails,
  clearState
})(TenantDetails));
