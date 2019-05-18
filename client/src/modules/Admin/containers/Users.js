import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../redux/actions';
import { List, Button } from 'antd';
import './Users.css';

class Users extends Component {
  componentDidMount() {
    if (this.props.page === 1 && this.props.users.length === 0) {
      this.props.loadUsers(this.props.page);
    }
  }

  render() {
    const { users, loading, hasNextPage } = this.props;
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
            onClick={() => this.props.loadUsers(this.props.page)}
          >
            load more
          </Button>
        </div>
      ) : null;

    return (
      <div className="Users">
        <h3>Users</h3>
        <List
          className='users-list'
          loading={(loading && hasNextPage)}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={users}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>delete</a>]}>
              <List.Item.Meta
                title={`${item.firstName} ${item.lastName}`}
                description={item.role}/>
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
    loading
  } = state.adminUsers;

  return {
    users,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading
  };
};

export default connect(mapStateToProps, { loadUsers })(Users);
