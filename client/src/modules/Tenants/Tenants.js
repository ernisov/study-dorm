import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Radio, Button, Icon } from 'antd';
import './Tenants.css';

import {
  changeStatus,
  loadTenants
} from './redux/actions';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    if (this.props.page === 1 && this.props.list.length === 0) {
      this.props.loadTenants(this.props.page, this.props.settlementStatus);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.settlementStatus !== prevProps.settlementStatus) {
      this.props.loadTenants(this.props.page, this.props.settlementStatus);
    }
  }

  onStatusChange(e) {
    this.props.changeStatus(e.target.value);
  }

  renderItem(item) {
    let actions = [];

    const settle = (
      <Link to={{
        pathname: '/settlement-form',
        state: {
          action: 'settle',
          username: item.username
        }
      }}>settle</Link>
    );

    const move = (
      <button onClick={() => console.log('move')}>move</button>
    );

    const unsettle = (
      <button onClick={() => console.log('unsettle')}>unsettle</button>
    );

    const info = (
      <Link to={`/tenants/${item.username}`}>
        <Icon type='info-circle' />
      </Link>
    );

    if (item.settlementStatus === 'settled') {
      actions.concat([move, unsettle]);
    } else {
      actions.push(settle);
    }

    return (
      <List.Item actions={[...actions, info]}>
        <List.Item.Meta
          title={item.username}
          description={item.settlementStatus}
        />
      </List.Item>
    );
  }

  render() {
    const { list, loading, hasNextPage, page, settlementStatus } = this.props;
    const loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button
          onClick={() => this.props.loadTenants(page, settlementStatus)}
        >
          load more
        </Button>
      </div>
    ) : null;

    return (
      <div className='Tenants'>
        <div className='Tenants-header'>
          <h3>Tenants: </h3>
          <RadioGroup
            onChange={this.onStatusChange}
            value={this.props.settlementStatus}
            defaultValue={this.props.settlementStatus}
          >
            <RadioButton value='all'>All</RadioButton>
            <RadioButton value='not_settled'>Not Settled</RadioButton>
            <RadioButton value='settled'>Settled</RadioButton>
          </RadioGroup>
        </div>
        <List
          loading={(loading && hasNextPage)}
          loadMore={loadMore}
          dataSource={list}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.tenants.page,
  list: state.tenants.list,
  hasNextPage: state.tenants.hasNextPage,
  hasPrevPage: state.tenants.hasPrevPage,
  totalDocs: state.tenants.totalDocs,
  totalPages: state.tenants.totalPages,
  loading: state.tenants.loading,
  settlementStatus: state.tenants.settlementStatus
});

export default connect(mapStateToProps, {
  changeStatus,
  loadTenants
})(Tenants);
