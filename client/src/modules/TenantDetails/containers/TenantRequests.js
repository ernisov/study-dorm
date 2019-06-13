import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';
import { loadRequests } from '../redux/actions/TenantRequests';

class TenantRequests extends Component {
  componentDidMount() {
    this.props.loadRequests(this.props.username);
  }

  render() {
    const { list, loading, hasNextPage, page, username } = this.props;
    const loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button
          onClick={() => this.props.loadRequests(username)}
        >
          load more
        </Button>
      </div>
    ) : null;

    return (
      <List
        dataSource={list}
        loading={loading}
        loadMore={loadMore}
        renderItem={(item) => (
          <p>{item.title}</p>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.tenantRequests.list,
  page: state.tenantRequests.page,
  hasNextPage: state.tenantRequests.hasNextPage,
  hasPrevPage: state.tenantRequests.hasPrevPage,
  totalDocs: state.tenantRequests.totalDocs,
  totalPages: state.tenantRequests.totalPages,
  loading: state.tenantRequests.loading
});

export default connect(mapStateToProps, {
  loadRequests
})(TenantRequests);
