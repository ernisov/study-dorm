import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { List, Radio, Button } from 'antd';
import RequestItem from './components/RequestItem';
import './Requests.css';
import {
  onStatusChange,
  loadRequests,
  commit,
  clearState
} from './redux/actions';
import { allowedRoles } from '../../hoc/allowedRoles';
import i18next from '../../i18n/i18n';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Requests extends Component  {
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.loadRequests(this.props.page, this.props.status);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.props.loadRequests(this.props.page, this.props.status);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { hasNextPage, loading, list } = this.props;
    const loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button
          onClick={() => this.props.loadRequests(this.props.page, this.props.status)}
        >
          {i18next.t('lists.loadMore')}
        </Button>
      </div>
      ) : null;

    return (
      <div className='Requests'>
        <div className='Requests-header'>
          <h3>{i18next.t('requests.title')}</h3>
          <RadioGroup onChange={this.props.onStatusChange} value={this.props.status}>
            <RadioButton value='all'>{i18next.t('requests.all')}</RadioButton>
            <RadioButton value='awaiting'>{i18next.t('requests.awaiting')}</RadioButton>
            <RadioButton value='in_progress'>{i18next.t('requests.inProgress')}</RadioButton>
            <RadioButton value='done'>{i18next.t('requests.done')}</RadioButton>
          </RadioGroup>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/requests/create')}
          >
            {i18next.t('requests.create')}
          </Button>
        </div>
        <List
          loading={(loading && hasNextPage)}
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <RequestItem
              {...item}
              key={item._id}
              onSubmit={this.props.commit}
            />
          )}
          className='Requests-List'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.requests.list,
  page: state.requests.page,
  hasNextPage: state.requests.hasNextPage,
  hasPrevPage: state.requests.hasPrevPage,
  totalDocs: state.requests.totalDocs,
  totalPages: state.requests.totalPages,
  loading: state.requests.loading,
  status: state.requests.status
});

const roles = ['admin', 'commandant', 'student', 'employee', 'service'];
const actionCreators = {
  onStatusChange,
  loadRequests,
  commit,
  clearState
};

export default allowedRoles(roles)(connect(mapStateToProps, actionCreators)(withRouter(Requests)));
