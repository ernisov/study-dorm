import React, { Component } from 'react';
import { List, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { allowedRoles } from '../../hoc/allowedRoles';
import './AddTenant.css';

import {
  loadTenants,
  select,
  submit
} from './redux/actions';

class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if (this.props.page === 1 && this.props.list.length === 0) {
      this.props.loadTenants(this.props.page);
    }
  }

  submit() {
    this.props.submit(
      this.props.active,
      this.props.match.params.room,
      () => this.props.history.goBack()
    );
  }

  render() {
    const { list, loading, hasNextPage, page } = this.props;
    const loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button onClick={() => this.props.loadTenants(page)}>
          load more
        </Button>
      </div>
      ) : null;

    return (
      <div className='AddTenant'>
        <h3>Choose a tenant:</h3>
        <List
          className='AddTenant-List'
          loading={(loading && hasNextPage)}
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => {
            let classes = ['AddTenant-Tenant'];
            if (item.username === this.props.active) {
              classes.push('AddTenant-Tenant-Active');
            }
            return (
              <div
                className={classes.join(' ')}
                onClick={() => this.props.select(item.username)}
              >
                <p>{item.username}</p>
              </div>
            );
          }}
        />
        <Button type='primary' onClick={this.submit}>Submit</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.addTenant.page,
  list: state.addTenant.list,
  hasNextPage: state.addTenant.hasNextPage,
  hasPrevPage: state.addTenant.hasPrevPage,
  totalDocs: state.addTenant.totalDocs,
  totalPages: state.addTenant.totalPages,
  loading: state.addTenant.loading,
  active: state.addTenant.active
});

export default allowedRoles(['admin', 'commandant'])(connect(mapStateToProps, {
  loadTenants,
  select,
  submit
})(withRouter(AddTenant)));
