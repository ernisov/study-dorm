import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';
import {
  loadSettlements
} from '../redux/actions/TenantSettlements';
import Settlement from '../../Settlements/components/Settlement';

class TenantSettlements extends Component {
  componentDidMount() {
    this.props.loadSettlements(this.props.username);
  }

  render() {
    let { loading, list, hasNextPage, username } = this.props;
    let loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button onClick={() => this.props.loadSettlements(username)}>
          load more
        </Button>
      </div>
    ) : null;

    return (
      <div className={this.props.className}>
        <List
          dataSource={list}
          loading={loading}
          loadMore={loadMore}
          renderItem={(item) => (
            <Settlement key={item._id} {...item} />
          )}
        />
      </div>
    );
  }
}

const actions = { loadSettlements };
const mapStateToProps = (state) => ({
  list: state.tenantSettlements.list,
  loading: state.tenantSettlements.loading,
  page: state.tenantSettlements.page,
  hasNextPage: state.tenantSettlements.hasNextPage,
  hasPrevPage: state.tenantSettlements.hasPrevPage,
  totalDocs: state.tenantSettlements.totalDocs,
  totalPages: state.tenantSettlements.totalPages
});

export default connect(mapStateToProps, actions)(TenantSettlements);
