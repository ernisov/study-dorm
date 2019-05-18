import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/actions';
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
          renderItem={item => {
            let edit = (
              <Link to={`${this.props.match.path}/${item.username}/edit`}>
                edit
              </Link>
            );

            let deleteUser = (
              <span onClick={() => this.props.deleteUser(item.username)}>
                delete
              </span>
            );

            return (
              <List.Item actions={[edit, deleteUser]}>
                <List.Item.Meta
                  title={`${item.firstName} ${item.lastName}`}
                  description={item.role}/>
              </List.Item>
            );
          }} />
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

export default connect(mapStateToProps, { loadUsers, deleteUser })(Users);
