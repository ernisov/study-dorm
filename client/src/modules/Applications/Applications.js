import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-redux';
import { List, Radio, Button } from 'antd';
import { allowedRoles } from '../../hoc/allowedRoles';
import {
  loadApplications,
  changeStatus,
  approve,
  reject
} from './redux/actions';
import moment from 'moment';
import ListItem from './components/ListItem';
import './Applications.css';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {
    if (this.props.page === 1 && this.props.list.length === 0) {
      this.props.loadApplications(this.props.page, this.props.status);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      console.log(this.props.status, prevProps.status)
      this.props.loadApplications(this.props.page, this.props.status);
    }
  }

  onStatusChange(e) {
    this.props.changeStatus(e.target.value);
  }

  render() {
    const { list, loading, hasNextPage } = this.props;
    const loadMore = hasNextPage ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          onClick={() => this.props.loadApplications(this.props.page)}
        >
          load more
        </Button>
      </div>
      ) : null;

    return (
      <div className='Applications'>
        <div className='Applications-header'>
          <h3>Applications: </h3>
          <RadioGroup
            onChange={this.onStatusChange}
            value={this.props.status}
            defaultValue={this.props.status}
          >
            <RadioButton value='unconsidered'>unconsidered</RadioButton>
            <RadioButton value='approved'>approved</RadioButton>
            <RadioButton value='rejected'>rejected</RadioButton>
          </RadioGroup>
        </div>
        <List
          loading={(loading && hasNextPage)}
          loadMore={loadMore}
          dataSource={list}
          split
          renderItem={item => (
            <ListItem
              item={item}
              status={this.props.status}
              approve={this.props.approve}
              reject={this.props.reject} />
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.applications.page,
  loading: state.applications.loading,
  list: state.applications.list,
  hasNextPage: state.applications.hasNextPage,
  hasPrevPage: state.applications.hasPrevPage,
  totalDocs: state.applications.totalDocs,
  totalPages: state.applications.totalPages,
  status: state.applications.status
});

export default allowedRoles(['admin', 'dean'])(
  connect(mapStateToProps, {
    loadApplications,
    changeStatus,
    approve,
    reject
  })(Applications)
);
