import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/actions';
import { List, Button } from 'antd';
import './Users.css';
import i18next from '../../../i18n/i18n';

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
            {i18next.t('lists.loadMore')}
          </Button>
        </div>
      ) : null;

    return (
      <div className="Users">
        <h3>{i18next.t('users.title')}</h3>
        <List
          className='users-list'
          loading={(loading && hasNextPage)}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={users}
          renderItem={item => {
            let edit = (
              <Link to={{
                pathname: `${this.props.match.path}/${item.username}/edit`,
                state: item
              }} >
                {i18next.t('users.edit')}
              </Link>
            );

            let deleteUser = (
              <span onClick={() => this.props.deleteUser(item.username)}>
                {i18next.t('users.delete')}
              </span>
            );

            return (
              <List.Item actions={[edit, deleteUser]}>
                <List.Item.Meta
                  title={`${item.firstName} ${item.lastName}`}
                  description={i18next.t('roles.' + item.role)}/>
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
