import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Skeleton, Button } from 'antd';
import './Users.css';

class Users extends Component {
  render() {
    const { users, loading, initialLoading } = this.props;
    const loadMore =
      !initialLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <div className="Users">
        <h3>Users</h3>
        <List
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={users}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>delete</a>]}>
              <Skeleton title={false} loading={loading} active>
                <List.Item.Meta title={item.username} />
              </Skeleton>
            </List.Item>
          )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    users,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading,
    initialLoading
  } = state.adminUsers;

  return {
    users,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading,
    initialLoading
  };
};

export default connect(mapStateToProps)(Users);
