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
          load more
        </Button>
      </div>
      ) : null;

    return (
      <div className='Requests'>
        <div className='Requests-header'>
          <h3>Requests</h3>
          <RadioGroup onChange={this.props.onStatusChange} value={this.props.status}>
            <RadioButton value='all'>All</RadioButton>
            <RadioButton value='awaiting'>Awaiting</RadioButton>
            <RadioButton value='in_progress'>In Progress</RadioButton>
            <RadioButton value='done'>Done</RadioButton>
          </RadioGroup>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/requests/create')}
          >
            Create
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

const roles = ['admin', 'commandant', 'student', 'employee'];
const actionCreators = {
  onStatusChange,
  loadRequests,
  commit,
  clearState
};

export default allowedRoles(roles)(connect(mapStateToProps, actionCreators)(withRouter(Requests)));
